import api from "./api";

// Get all education supports
export const getAllSupports = async () => {
    const response = await api.get("/support");
    return response.data;
};

// Get one education support by ID
export const getSupportById = async (id) => {
    const response = await api.get(`/support/${id}`);
    return response.data;
};