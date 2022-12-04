import {createContext, ReactNode, useContext} from "react";

// interface ModeStatus {
//     id: string;
//     options: {};
// }

interface ModeProviderProps {
    children : ReactNode;
    value : any;
}

const ModeContext = createContext<Record<PropertyKey, any>>({});

function useModeContext() {
    return useContext(ModeContext);
}

function ModeProvider({children, value} : ModeProviderProps) {
    return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export { ModeProvider, ModeContext, useModeContext }