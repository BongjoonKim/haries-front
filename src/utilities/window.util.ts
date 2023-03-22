import {TWindowPositionSizeName, WindowPositionSizeNameArr, IOpenWindowOptions} from "../types/window.d";


export function isWindowPositionSizeName(input: string): input is TWindowPositionSizeName {
    return WindowPositionSizeNameArr.includes(input as TWindowPositionSizeName);
}

export const WindowPositionSizeDictionary: Map<TWindowPositionSizeName, NSLayout.positionSize> = new Map();

function getPositionSizeOfName(name: TWindowPositionSizeName) {
    if (isWindowPositionSizeName(name)) {
        const positionSize = WindowPositionSizeDictionary.get(name);
        if (!positionSize) {
            throw new Error(`[window.util] positionSize of name(${name}) is not setup`);
        } else {
            return positionSize;
        }
    } else {
        throw new Error("[window.util] Invalid WindowName");
    }
}

function getFeatureStringFromPositionSize(positionSize: NSLayout.positionSize) {
    let {width, height, left, leftShift = 0, top, topShift = 0} = positionSize;

    if (left === "center") {
        left = window.screen.width / 2 - width / 2;
    }
    if (top === "center") {
        top = window.screen.height / 2 - height / 2;
    }
    const finalLeft = left + leftShift;
    const finalTop = top + topShift;


    return Object.entries({width, height, left: finalLeft, top: finalTop})
        .map(keyValue => {
            const [key, value] = keyValue;
            return `${key}=${value}`;
        })
        .join(",");
}

function setupWindowPositionSize(positionSizeDictionary: Map<TWindowPositionSizeName, NSLayout.positionSize>) {
    positionSizeDictionary.set("testA", {
        height: 400,
        width: 600,
        left: 0,
        top: 0
    });

    positionSizeDictionary.set("testB", {
        height: 800,
        width: 800,
        left: 0,
        top: 0
    })
}

setupWindowPositionSize(WindowPositionSizeDictionary);

function openWindow(
    url: string | URL,
    options?: IOpenWindowOptions
): WindowProxy | null {
    const _url = typeof url === "string" ? new URL(url, window.location.origin) : url;
    {
        _url.searchParams.set("type", "independent");
    }
    const _target = options?.target ?? "_blank";

    const featuresString = options?.features;
    if (featuresString !== undefined) {
        return window.open(_url, _target, featuresString);
    }
    const positionSize = options?.positionSize;
    const positionSizeName = options?.positionSizeName;
    const positionSizeOfName = positionSizeName ? getPositionSizeOfName(positionSizeName) : undefined;

    const _positionSize = positionSize ?? positionSizeOfName;

    if (_positionSize !== undefined) {
        if (options?.isCenter) {
            _positionSize.left = "center";
            _positionSize.top = "center";
        }
        if (options?.leftShift !== undefined) {
            _positionSize.leftShift = options?.leftShift;
        }
        if (options?.topShift !== undefined) {
            _positionSize.topShift = options?.topShift;
        }

        const featureString = getFeatureStringFromPositionSize(_positionSize);
        return window.open(_url, _target, featureString);
    }

    const width = options?.width ?? 1200;
    const height = options?.height ?? 600;
    const left = options?.left ?? 0;
    const top = options?.top ?? 0;
    const leftShift = options?.leftShift ?? 0;
    const topShift = options?.topShift ?? 0;

    const finalFeatureString = getFeatureStringFromPositionSize({height, width, left, top, leftShift, topShift});

    const handle = window.open(_url, _target, finalFeatureString);

    const suppressWindowOpenFailPopup = options?.supressWindowOpenFailPopup ?? false;
    if (!handle && !suppressWindowOpenFailPopup) {
        const message = options?.windowOpenFailPopupMessage ?? "Popup open failed";
        window.alert(message);
    }
    return handle;

}

export default openWindow;