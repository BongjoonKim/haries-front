import {ModeComponent} from "../../../types/mode";
import {createContext, useContext} from "react";

interface ModeProviderProps<N = string> {
    children : React.ReactNode;
    value : ModeComponent.ModeContextValue<N>;
}

const ModeContext = createContext<
    ModeProviderProps["value"] | Record<PropertyKey, any>
>({});

function useModeContext() {
    return useContext(ModeContext);
}

function ModeProvider<N>({children, value} : ModeProviderProps<N>) {
    return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export { ModeProvider, ModeContext, useModeContext }