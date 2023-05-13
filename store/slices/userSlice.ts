import {IUser} from "../../models/user";
import {createSlice} from "@reduxjs/toolkit";

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
        }
    }
})

export const {setUser, removeUser} = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user.data;

export default userSlice.reducer;
