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

export default {
    classNames,
    changeDynamicObjectValue,
    objectRemoveKey
}