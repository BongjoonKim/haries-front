export const CHANGE_DIRECTION_TO_LTR = "ChangeDirectionToLTR";
export const CHANGE_DIRECTION_TO_RTL = "ChangeDirectionToRTL";

export function changeDirectionToLTR() {
    return {
        type : CHANGE_DIRECTION_TO_LTR
    }
}

export function changeDirectionToRTL() {
    return {
        type : CHANGE_DIRECTION_TO_RTL
    }
}