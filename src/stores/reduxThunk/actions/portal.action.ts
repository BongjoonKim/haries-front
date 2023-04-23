export const portal = {
    INITIALIZE: "portal/dialog/INITIALIZE" as const,
    SET_DIALOG: "portal/dialog/SET_DIALOG" as const,
    ADD_POPUP : "portal/popup/ADD_POPUP" as const,
    REMOVE_POPUP : "portal/popup/REMOVE_POPUP" as const,
}

// action creators
export const portalActions = {
    initialize: () => {
        return { type : portal.INITIALIZE };
    },
    setDialogStatus: (params: Modal.status) => {
        return { type : portal.SET_DIALOG, payload : params }
    },
    addPopupStatus: (params : Popup.statusParams) => {
        return { type : portal.ADD_POPUP, payload : params }
    },
    removePopupStatus: (params : Popup.statusParams) => {
        return {type: portal.REMOVE_POPUP, payload: params}
    }
};

export type ActionTypes =
    | ReturnType<typeof portalActions.initialize>
    | ReturnType<typeof portalActions.setDialogStatus>
    | ReturnType<typeof portalActions.addPopupStatus>
    | ReturnType<typeof portalActions.removePopupStatus>;
