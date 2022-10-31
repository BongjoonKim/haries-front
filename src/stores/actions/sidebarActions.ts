export const CHANGE_SIDEBAR_VISIBILITY = 'ChangeSidebarVisibility';
export const CHANGE_MOBILE_SIDEBAR_VISIBILITY = 'ChangeMobileSidebarVisibility';

export function changeSidebarVisibility() {
    return {
        type : CHANGE_SIDEBAR_VISIBILITY
    }
}

export function changeMobileSidebarVisibility() {
    return {
        type : CHANGE_MOBILE_SIDEBAR_VISIBILITY
    }
}