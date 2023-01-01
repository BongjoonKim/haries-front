declare namespace NSLayout {
    type get = {code?: string};
    type position = {
        left: number | "center";
        top: number | "center";
        leftShift?: number;
        topShift?: number;
    }
    type size = {
        width: number;
        height: number;
    }
    type positionSize = position & size;
}