import axiosInstance from "../axios";
export const PostMembershipAppStep1 = async (payload) => {
  const response = await axiosInstance.post(
    "/external/membership-application",
    payload,
  );
  return response.data;
};

export const PutMembershipAppStep1 = async (id, payload) => {
  const response = await axiosInstance.put(
    `/external/membership-application/${id}/step1`,
    payload,
  );
  return response.data;
};
