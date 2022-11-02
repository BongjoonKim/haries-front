import {ModeComponent} from "../../../types/mode";
import {createContext, useContext} from "react";

interface ModeStatus {
    id : string;
    options : {};
}

interface ModeProviderProps<T = Record<PropertyKey, ModeStatus>, N = string> {
    children : React.ReactNode;
    value : ModeComponent.ModeContextValue<N>;
}

const ModeContext = createContext<
    ModeProviderProps["value"] | Record<PropertyKey, any>
>({});

function useModeContext() {
    const context = useContext(ModeContext);
    return context;
}

function ModeProvider<T, N>({children, value} : ModeProviderProps<T, N>) {
    return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export { ModeProvider, ModeContext, useModeContext }