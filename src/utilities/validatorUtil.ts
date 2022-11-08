function isKeyExists<T>(obj: T, key:string): boolean {
    if (obj && key && typeof obj === "object") return key in obj;
    return false;
}

function isCreateElementProps(value: [never, never, never]): boolean {
    return (
        Array.isArray(value) &&
        value.length > 1 &&
        value.length < 4 &&
        typeof value[0] === "function" &&
        (typeof value[1] === "object" || typeof value[1] === "undefined")
    );
}

function validateRequired(targetKeyArray: string[], valueObj: any) {
    const makeValidateMsg = {};
    targetKeyArray.forEach(targetKey => {
        if (!valueObj[targetKey]) {
            const errMsgStr = '{"'
                .concat(targetKey)
                .concat('": "')
                .concat(targetKey)
                .concat(' is required" }');
            Object.assign(makeValidateMsg, JSON.parse(errMsgStr));
        }
    });
    return makeValidateMsg;
}

export default {
    isKeyExists,
    validateRequired,
    isCreateElementProps
}