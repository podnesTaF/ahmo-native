import {IUser} from "../../models/user";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface UserState {
    data?: IUser | null;
    isAuth: boolean | null;
}
const initialState: UserState = {
    data: null,
    isAuth: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.data = action.payload;
            state.isAuth = true;
        },
        removeUser: (state) => {
            state.data = null;
            state.isAuth = false;
        },
        updateUserData: (
            state,
            action: PayloadAction<{
                fullName?: string;
                image_url?: string;
                bio?: string;
            }>
        ) => {
            const { fullName, image_url, bio } = action.payload;
            if (state.data) {
                if (fullName) {
                    state.data.fullName = fullName;
                } else if (image_url) {
                    state.data.image_url = image_url;
                } else if (bio) {
                    state.data.bio = bio;
                }
            }
        },
    }
})

export const {setUser, removeUser, updateUserData} = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user.data;

export default userSlice.reducer;
