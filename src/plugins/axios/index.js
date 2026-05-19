import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const instance = axios.create({
  baseURL: apiUrl,
});

export default instance;

// import a from "axios";
// const apiUrl = process.env.NEXT_PUBLIC_API_URL;
// const axios = a.create({
//   baseURL: apiUrl,
// });

// export default axios;
