import {Attributes, ComponentClass, FunctionComponent, ReactNode} from "react";

type CreateElementTypes = [
    FunctionComponent<any> | ComponentClass<any, any> | string,
    any | Attributes | object,
    ReactNode | ReactNode[] | undefined
];