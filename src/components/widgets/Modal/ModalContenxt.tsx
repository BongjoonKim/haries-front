import {createContext, ReactNode, useContext} from "react";

interface ModalStatus {
    id: string;
    options: {};
}

interface ModalProviderProps {
    children: ReactNode;
    value: any;
}

const ModalContext = createContext<ModalProviderProps["value"]>({});

function useModalContext() {
    return useContext(ModalContext);
}

function ModalProvider({children, value}: ModalProviderProps) {
    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export {ModalProvider, ModalContext, useModalContext};