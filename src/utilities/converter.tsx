function classNames (items : (string | undefined | boolean)[]) : string {
    return items.filter(x => x).join(" ");
}

function changeDynamicObjectValue<T>(
    object: T,
    name: string,
    value: any,
    options?: {
        related?: boolean;
        restInitial?: T;
    }
) {
    const nextObject = options?.restInitial || object;
    if (name?.includes(".")) {
        const splitName: string[] | undefined = name?.split(".");
        if (!options?.related) {
            return splitName?.reduce?.((acc: any, cur: string | number, inx) => {
                if (splitName.length === inx + 1) {
                    if (acc?.next) acc.next[cur] = value;
                    return {...acc.complete}
                }
                return {
                    complete: {...(acc?.complete ?? acc)},
                    next: acc.next?.[cur] ?? acc[cur]
                };
            }, nextObject);
        }

        const result = splitName?.slice(0, -1)?.reduce((acc: any, cur: string | number) => (
            acc === undefined ? undefined : acc[cur]
        ), nextObject);

        if (result !== undefined) {
            const [tail] = splitName?.slice(-1);
            result[tail] = value;
        }
        return result;
    }
    return object;
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

function changeObjectValue<T>(state: T, name: string, value: any) {
    const splitName: string[] | undefined = name?.split(".");
    if (name?.includes(".") && splitName) {
        return {
            ...state,
            [splitName[0] as keyof T] : {
                ...(state as Record<PropertyKey, any>)?.[splitName[0]],
                [splitName[1]]:
                    splitName.length > 2
                    ? {
                        ...(state as Record<PropertyKey, any>)?.[splitName[0]]?.[splitName[1]],
                        [splitName[2]]: value
                    }
                    : value,
            }
        }
    }
    return state;
}

function removeObjectKey<T extends {[x: string]: any}>(prevState: T, name: string) {
    const tempPrevState: T = prevState;
    if (name?.includes(".")) {
        const splitName: string[] | undefined = name?.split(".");
        splitName.reduce((acc: any, cur: string, currentIndex: number) => {
            if (currentIndex + 1 === splitName.length) delete tempPrevState[acc[cur]];
            return tempPrevState[acc[cur]];
        }, {});
        return tempPrevState;
    }
    if (tempPrevState?.[name]) delete tempPrevState[name];
    return tempPrevState;
}

function stringObjectKeysToValue<T = {[x: string]:any}, K = string> (
    object: T,
    path: keyof T | K,
) {
    if (String(path)?.includes(".")) {
        return String(path)
            .split(".")
            .reduce((prev:any, key: string | number) => prev?.[key], object)
    }
    return undefined;
}

export default {
    classNames,
    changeDynamicObjectValue,
    objectRemoveKey,
    changeObjectValue,
    removeObjectKey,
    stringObjectKeysToValue
}