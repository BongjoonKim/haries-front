function classNames (items : (string | undefined | boolean)[]) : string {
    return items.filter(x => x).join(" ");
}

const objectRemoveKey = (object: Record<PropertyKey, any>, removeKey: Array<string> | PropertyKey) => {
    if (typeof removeKey === "string" && removeKey?.includes(".")) {
        const splitName: string[] | undefined = removeKey.split(".");
        return splitName?.reduce((acc: any, cur: string | number, inx) => {
            if (splitName?.length === inx + 1) {
                if (acc?.next) delete acc.next[cur];
                return {...acc.complete};
            }

            let next;
            if (acc?.next) {
                next = acc?.next?.[cur] ? acc.next[cur] : {...acc.next, [cur]: null};
            } else {
                next = acc[cur];
            }

            return {
                complete: {...(acc.complete || acc)},
                next
            }

        }, object);
    }
    return Object.fromEntries(Object.entries(object).filter(el => el[0] !== removeKey));
}

export default {
    classNames,
    objectRemoveKey
}