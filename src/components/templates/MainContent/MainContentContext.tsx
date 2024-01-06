import {createContext, ReactNode, useContext} from "react";
import {ContentFooterHandler, ContentHeaderHandler} from "../../../constants/types/main-content.const";
import {Content} from "./index";

export interface MainContentContextState {
    align?: string;
    headerHandler?: (ContentHeaderHandler | Content.CustomHandlerProps)[];
    footerHandler?: (ContentFooterHandler | Content.CustomHandlerProps)[];
}

export interface MainContentProviderProps {
    children: ReactNode;
    value?: MainContentContextState;
    style ?: any;
}

const MainContentContext = createContext<MainContentContextState | undefined>(undefined);

function useMainContentContext() {
    return useContext(MainContentContext);
}

function MainContentProvider({children, value, style}: MainContentProviderProps) {
    return <MainContentContext.Provider value={value}>{children}</MainContentContext.Provider>
}

export {MainContentProvider, MainContentContext, useMainContentContext}