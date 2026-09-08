import api from "./api";

export const getDashboard = async () => {
    const response = await api.get("/admin/dashboard");
    return response.data;
};


export const getTotalDonations = async () => {
    const response = await api.get("/admin/total-donations");
    return response.data;
};


export const getUsers = async () => {
    const response = await api.get("/admin/users");
    return response.data;
};

export const getAdminDonationsOverview = async () => {
    const response = await api.get("/admin/donations/overview");
    return response.data;
};

export const exportUsersCsv = async () => {
    const response = await api.get('/admin/users/export', { responseType: 'blob' });
    return response.data;
};

export const exportDonationsCsv = async () => {
    const response = await api.get('/admin/donations/export', { responseType: 'blob' });
    return response.data;
};