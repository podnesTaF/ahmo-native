import { configureStore } from "@reduxjs/toolkit";
import {api} from "../services/api";
import userReducer from "./slices/userSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            user: userReducer,
            [api.reducerPath]: api.reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    })
}

export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = typeof store.dispatch;