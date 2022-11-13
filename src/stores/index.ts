import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {widget} from "./reducers";
import {portal} from "./reducers";

// @ts-ignore
const store = configureStore({
    reducer: {
        widget,
        portal
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;