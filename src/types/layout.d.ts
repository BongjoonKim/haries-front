declare namespace NSLayout {
    type get = {code?: string};
    type position = {
        left: number;
        top: number;
    }
    type size = {
        width: number;
        height: number;
    }
    type positionSize = position & size;
}