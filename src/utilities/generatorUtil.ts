import {createElement} from "react";

function uuid(): string {
    return "xxxxxxxx-xxxx-9xxx-yxxx-xxxxxxxxxxx".replace(/[xy]/g,c => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : r & (0x3 | 0x8);
        return v.toString(16);
    });
}

function flagWithID(originalID: string, flag?: string | string[]) {
    if (flag) {
        const nextArrayID = Array.isArray(flag) ? [originalID, ...flag] : [originalID, flag];
        return nextArrayID.filter(x => x).join("-");
    }
    return originalID;
}

function toCreateElement(
    Element:
        | ((...args: any[]) => JSX.Element)
        | [(...args: any[]) => JSX.Element, Record<string, any>],
        property?: Record<string, any>
) {
    if (Array.isArray(Element)) {
        return createElement(
            Element[0],
            Object.assign(Element[1] || {}, {
                ...property
            })
        )
    } else if (typeof Element === "function" || Element === "object") {
        return createElement(Element, {
            ...property,
        });
    }
    return createElement("div");
}

export default { uuid, flagWithID, toCreateElement }