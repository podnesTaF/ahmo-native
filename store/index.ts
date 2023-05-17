import { configureStore } from "@reduxjs/toolkit";
import {api} from "../services/api";
import userReducer from "./slices/userSlice";
import {chatReducer} from "./slices/chatSlice";
import {menuReducer} from "./slices/menuSlice";
import {roundReducer} from "./slices/roundSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            user: userReducer,
            chat: chatReducer,
            menu: menuReducer,
            round: roundReducer,
            [api.reducerPath]: api.reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    })
}

export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = typeof store.dispatch;