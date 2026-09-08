import api from "./api";

export const donate = async (data) => {

    const response = await api.post("/donations", data);

    return response.data;

};

export const getMyDonations = async (email) => {

    const response = await api.get(
        `/donations/donor/${email}`
    );

    return response.data;

};

export const deleteDonation = async (id) => {

    const response = await api.delete(
        `/donations/${id}`
    );

    return response.data;

};

export const updateDonation = async(id, data)=>{

    const response = await api.put(
        `/donations/${id}`,
        data
    );

    return response.data;

};