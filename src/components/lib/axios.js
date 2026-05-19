import axios from "axios";
import { getAccessToken, clearTokens } from "./tokenActions";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/* Public endpoints that do not require authentication tokens */
const PUBLIC_ENDPOINTS = ["/membership/external/auth/"];

/* Check if an endpoint is public (doesn't require token) */
const isPublicEndpoint = (url) => {
  // Remove base URL if present to get just the endpoint path
  const endpoint = url.replace(API_BASE_URL, "");
  return PUBLIC_ENDPOINTS.some((publicEndpoint) =>
    endpoint.startsWith(publicEndpoint),
  );
};

/**
 * Create axios instance with default configuration
 */
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 seconds timeout
});

/**
 * Request interceptor - Add auth token to requests (except public endpoints)
 */
axiosInstance.interceptors.request.use(
  async (config) => {
    // Skip adding token for public endpoints
    if (isPublicEndpoint(config.url)) {
      return config;
    }

    // Add auth token if available
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * Response interceptor - Handle errors globally
 */
axiosInstance.interceptors.response.use(
  (response) => {
    // Return response data directly
    return response;
  },
  async (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      if (status === 401) {
        // Unauthorized - clear token and optionally redirect to login
        await clearTokens();
        // Optionally redirect to login page
        if (
          window.location.pathname !== "/auth/login" &&
          window.location.pathname !== "/auth/signup"
        ) {
          // window.location.href = '/auth/login';
        }
      }

      // Extract error message from response
      const errorMessage =
        data?.message || data?.error || `HTTP error! status: ${status}`;
      error.message = errorMessage;
    } else if (error.request) {
      // Request was made but no response received
      error.message = "Network error. Please check your connection.";
    } else {
      // Something else happened
      error.message = error.message || "An unexpected error occurred";
    }

    console.error("API Error:", error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
