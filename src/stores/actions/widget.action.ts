export const widget = {
    INITIALIZE : "widget/INITIALIZE",
    SHOW_MESSAGE_BOX : "widget/SHWO_MESSAGE_BOX",
    SET_LOADER : "portal/loader/SET_LOADER" as const
}

// action creators
export const widgetActions = {
    initialize() {
        return { type : widget.INITIALIZE };
    },
    showMessageBox(params : messageItem) {
        return {  type : widget.SHOW_MESSAGE_BOX, payload : params };
    },
    setLoader(params : Loader.status) {
        return { type: widget.SET_LOADER, payload : params }
    }
}

export type ActionTypes =
    | ReturnType<typeof widgetActions.initialize>
    | ReturnType<typeof widgetActions.showMessageBox>;