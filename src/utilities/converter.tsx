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

const queryStringValueToArray = (query: string): string[] => {
    const list = query?.split("&");
    const finalList: string[] = [];

    const arrayQuery = list
        ?.map(item => {
            const [_, value] = item.split("=");
            return value;
        })
        .reduce((acc: any, cur) => {
            finalList.push(cur);
            return finalList;
        }, []);
    return arrayQuery;
}

const queryStringToObject = (query: string) => {
    const list = query?.split("&");

    const objQuery = list
        ?.map(item => {
            const [key, value] = item.split("=");
            return {property: key, value: value};
        })
        .reduce((acc: any, cur) => {
            acc[cur.property] = cur.value;
            return acc;
        }, {});
    return objQuery;
}

function dynamicStringToInitialObject<T>({
    state,
    initialState,
    name
}: {
    state: T;
    initialState: T;
    name: string;
}) {
    const tempState = state;
    if (name && String(name).match("&")) {
        queryStringValueToArray(String(name)).forEach((key: string) => {
            if (key?.includes(".")) {
                if (key.includes(",")) {
                    const nextStateKeys = key.split(",");
                    nextStateKeys.forEach((nextKey: string): void => {
                        const finalValue = nextKey?.includes(".")
                            ? stringObjectKeysToValue?.(initialState, String(nextKey as keyof T))
                            : initialState[nextKey as keyof T];
                        if (nextKey?.includes(".")) {
                            Object.assign(
                                tempState as object & T,
                                changeObjectValue?.<T>(state, String(nextKey as keyof T), finalValue)
                            );
                        } else {
                            Object.assign(tempState as object & T, {
                                [nextKey]: finalValue
                            });
                        }
                    })
                } else {
                    const finalValue = key?.includes(".")
                        ? stringObjectKeysToValue?.(initialState, String(key as keyof T))
                        : initialState[key as keyof T];
                    Object.assign(
                        tempState as object & T,
                        changeObjectValue?.<T>(state, String(key as keyof T), finalValue)
                    )
                }
            } else {
                const names : {[x: string]: string} = queryStringToObject(String(name));
                Object.assign(tempState as object & T, {
                    [names[key] as keyof T]: initialState[key as keyof T]
                })
            }
        })
    }
    return {...state, ...tempState};
}

function dynamicStringToObject<T>({state, name, value}: {state: T; name: string; value: any;}) {
    const tempState: T = state;
    const names: {[x: string]: string} = queryStringToObject(String(name));
    Object.keys(names).forEach((key: string) => {
        if (names[key]?.includes(".")) {
            const finalValue = key?.includes(".")
                ? stringObjectKeysToValue?.(value, String(key as keyof T))
                : value[key];
            if (names[key]?.includes(",")) {
                const nextStateKeys = names[key].split(",");
                nextStateKeys.forEach((nextKey: string): void => {
                    if (nextKey?.includes(".")) {
                        Object.assign(
                            tempState as object & T,
                            changeObjectValue?.<T>(state, String(nextKey as keyof T), finalValue),
                        )
                    } else {
                        Object.assign(tempState as object & T, {
                            [nextKey]: finalValue
                        })
                    }
                })
            } else {
                Object.assign(
                    tempState as object & T,
                    changeObjectValue?.<T>(state, String(names[key] as keyof T), finalValue)
                );
            }
        } else {
            Object.assign(tempState as object & T, {
                [names[key] as keyof T]: value[key]
            })
        }
    });
    return {...state, ...tempState};
}

function objectArrayAddItem<T>(
    object: T,
    name: string,
    value: any,
    options?: {
        related?: boolean;
        restInitial?: T;
    }
) {
    let nextObject: T = options?.restInitial || object;
    if (name?.includes(".")) {
        const splitName: string[] | undefined = name?.split(".");
        if (!options?.related && splitName?.reduce) {
            const result = splitName.reduce?.((acc: any, cur: string | number, inx) => {
                if (splitName?.length === inx + 1) {
                    if (acc?.next !== undefined) {
                        acc.next[cur] = [...new Array([...acc.next[cur], value])];
                    }
                    return acc.complete;
                }
                return {
                    complete: {...(acc.complete ?? acc)},
                    next: acc?.next?.[cur] ?? acc[cur]
                };
            }, nextObject);
            return result;
        }
    }
    return {
        ...nextObject,
        [name as keyof T]: [...(nextObject as Record<string, any>)[name], value]
    }
}

function objectRemoveItem<T>(object: T, name: string) {
    const splitName: string[] | undefined = name?.split(".");
    const result = splitName?.reduce((acc: any, cur: string | number, inx) => {
        if (splitName?.length === inx + 1) {
            if (acc?.next) {
                acc.next.splice(cur, 1);
            }
            return acc.complete;
        }
        return {
            complete: acc.complete ?? acc,
            next: acc?.next?.[cur] ?? acc[cur]
        }
    }, object);
    return result;
}

export default {
    classNames,
    changeDynamicObjectValue,
    dynamicStringToInitialObject,
    objectRemoveKey,
    changeObjectValue,
    removeObjectKey,
    stringObjectKeysToValue,
    dynamicStringToObject,
    objectArrayAddItem,
    objectRemoveItem
}