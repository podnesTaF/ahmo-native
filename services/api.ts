import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from '@react-native-async-storage/async-storage';


const BASE_URL = "https://ahmo-api.up.railway.app";

const retrieveToken = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        return token;
    } catch (error) {
        console.log('Error retrieving token:', error);
    }
};

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers) => {
        const token = await retrieveToken()
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        headers.set("Content-Type", "application/json");
        return headers;
    },
});

export const api = createApi({
    baseQuery,
    tagTypes: ["Auth", 'Message', 'Chat', 'Game', 'Round', 'Move'],
    endpoints: () => ({}),
})