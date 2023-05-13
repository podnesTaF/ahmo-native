import AsyncStorage from "@react-native-async-storage/async-storage";
import {api} from "./api";
import {IUser, ResponseUser} from "../models/user";


interface RegisterUserRequest {
    username: string;
    fullName: string;
    email: string;
    password: string;
}

interface LoginUserRequest {
    email: string;
    password: string;
}

const storeToken = async (token: string) => {
    try {
        await AsyncStorage.setItem('userToken', token);
    } catch (error) {
        console.log('Error storing token:', error);
    }
};

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation<IUser, RegisterUserRequest>({
            query: (body) => ({
                url: "/auth/register",
                method: "POST",
                body,
            }),
            transformResponse: async (response: IUser) => {
                await storeToken(response.token);
                return response;
            },
            invalidatesTags: ["Auth"],
        }),
        loginUser: builder.mutation<IUser, LoginUserRequest>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body,
            }),
            transformResponse: async (response: IUser) => {
                await storeToken(response.token);
                return response;
            },
            invalidatesTags: ["Auth"],
        }),
        getUser: builder.query<ResponseUser, void>({
            query: () => ({
                url: "/users/me",
            }),
            providesTags: (result) => ["Auth"],
        }),
        searchUsers: builder.query<any[], { query: string; type: string }>({
            query: ({ query, type }) => ({
                url:
                    type === "direct"
                        ? `/users?query=${query}`
                        : `/chats?query=${query}&type=${type}`,
            }),
        }),
        getProfile: builder.query<IUser, number>({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: "GET",
            }),
        }),
    })
})

export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useGetUserQuery,
    useSearchUsersQuery,
    useGetProfileQuery
} = authApi;
