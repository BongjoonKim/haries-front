import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux";
import * as rootReducers from "./reducers";

const store = configureStore({
    reducer : {
        ...rootReducers
    },
    devTools : process.env.NODE_ENV !== "production",
    middleware : [thunk]
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
