import api from "./api";

export const getMyDonations = async () => {

    const email = sessionStorage.getItem("email") || localStorage.getItem("email");

    if (!email) {
        return [];
    }

    const response = await api.get(`/donations/donor/${email}`);

    return response.data;
};