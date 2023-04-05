import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {widget, portal, documents} from "./reducers";

// @ts-ignore
const store = configureStore({
    reducer: {
        widget,
        portal,
        documents
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;