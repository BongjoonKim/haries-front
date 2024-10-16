export const WindowPositionSizeNameArr = ["testA", "testB"] as const;

// declare namespace NSWindow {
    export type TWindowPositionSizeName = typeof WindowPositionSizeNameArr[number];
    export interface IOpenWindowFeatures {
        features?: string;
        positionSize?: NXLayout.PoseSize;
        positionSizeName?: TWindowPositionSizeName;

        width?: number;
        height?: number;
        left?: number;
        leftShift?: number;
        top?: number;
        topShift?: number;
        isCenter?: boolean;
    }
    export interface IOpenWindowOptions extends IOpenWindowFeatures {
        target?: string;
        supressWindowOpenFailPopup?: boolean;
        windowOpenFailPopupMessage?: string;
    }
// }