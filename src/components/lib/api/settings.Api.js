import axiosInstance from "@/lib/axios";

// Get Countries
export const getCountries = async () => {
  const response = await axiosInstance.get(
    "/membership/external/settings/countries",
  );
  return response.data.data.map((c) => ({ value: c.id, label: c.name }));
};

// Get Divisions
export const getDivisions = async (countryId) => {
  const response = await axiosInstance.get(
    `/membership/external/settings/divisions/by-countryId/${countryId}`,
  );
  return response.data.data.map((d) => ({ value: d.id, label: d.name }));
};

// Get Districts
export const getDistricts = async (divisionId) => {
  const response = await axiosInstance.get(
    `/membership/external/settings/districts/by-divisionId/${divisionId}`,
  );
  return response.data.data.map((d) => ({ value: d.id, label: d.name }));
};

// Get Upazilas
export const getUpazilas = async (districtId) => {
  const response = await axiosInstance.get(
    `/membership/external/settings/upazilas/by-districtId/${districtId}`,
  );
  return response.data.data.map((u) => ({ value: u.id, label: u.name }));
};

// Get Post Offices
export const getPostOffices = async (upazilaId) => {
  const response = await axiosInstance.get(
    `/membership/external/settings/postoffices/by-upazilaId/${upazilaId}`,
  );
  return response.data.data.map((p) => ({ value: p.id, label: p.name }));
};

// Get Designations
export const getDesignations = async () => {
  const response = await axiosInstance.get(
    "/membership/external/settings/designations",
  );
  return response.data.data.map((d) => ({
    value: d.id,
    label: d.designationName,
  }));
};

// Get Products
export const getProducts = async () => {
  const response = await axiosInstance.get(
    "/membership/external/settings/products",
  );
  return response.data.data.map((p) => ({
    value: p.id,
    label: p.productName + " || " + p.hsCode,
  }));
};

// Business Sectors
export const getBusinessSectors = async () => {
  const response = await axiosInstance.get(
    "/membership/external/settings/business-sectors",
  );
  return response.data.data.map((p) => ({ value: p.id, label: p.sectorName }));
};

// Membership Type
export const getMembershipType = async () => {
  const response = await axiosInstance.get(
    "/membership/external/settings/companyTypes",
  );
  return response.data.data.map((p) => ({ value: p.id, label: p.name }));
};

// Bank Name
export const getBankName = async () => {
  const response = await axiosInstance.get(
    "/membership/external/settings/banks",
  );
  return response.data.data.map((p) => ({ value: p.id, label: p.bankName }));
};

// Bank Branch
export const getBankBranchByID = async (bankId) => {
  const response = await axiosInstance.get(
    `/membership/external/settings/banks/${bankId}/branches`,
  );
  return response.data.data.map((p) => ({ value: p.id, label: p.branchName }));
};

// DCCI Bank
export const getDCCIBanks = async () => {
  const response = await axiosInstance.get(
    `/membership/external/settings/orgbanks/dropdown`,
  );
  return response.data.data.map((p) => ({ value: p.id, label: p.name }));
};
