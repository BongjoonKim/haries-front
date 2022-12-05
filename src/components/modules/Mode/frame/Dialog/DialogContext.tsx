import {createContext, ReactNode, useContext} from "react";

interface DialogStatus {
    id: string;
    options: {};
}

interface DialogProviderProps {
    children: ReactNode;
    value: any;
}

const DialogContext = createContext<DialogProviderProps["value"]>({});

function useDialogContext() {
    return useContext(DialogContext);
}

function DialogProvider({children, value}: DialogProviderProps) {
    return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
}

export {DialogContext, DialogProvider, useDialogContext}