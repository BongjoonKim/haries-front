export const CHANGE_THEME_TO_DARK = 'ChangeThemeToDark';
export const CHANGE_THEME_TO_LIGHT = 'ChangeThemeToLight';

export function changeThereToDark() {
    return {
        type : CHANGE_THEME_TO_DARK,
    };
}

export function changeThemeToLight() {
    return {
        type : CHANGE_THEME_TO_LIGHT
    }
}