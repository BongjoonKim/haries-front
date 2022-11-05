
function getFunctionName(func: any) {
    const result = /^function\s+([\w\$]+)\s*\(/.exec(func.toString());

    return result ? result[1] : "";
}

function getQueryParameterValue(key: string) {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(key);
}

function getQueryParameters(url:string) {
    const newUrl = JSON.parse?.(
        `("${decodeURI(url.split("?")[1])
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"')}"}`
    );

    return JSON.stringify?.(newUrl);

}

export default {
    getFunctionName,
    getQueryParameters,
    getQueryParameterValue
}