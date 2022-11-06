// 사용자 마이 메뉴 상태 그룹 코드
import {atom} from "recoil";

export const USER_MENU_GROUP = 'User_Menu_State';

// 사용자 마이 메뉴 상태
export const UserMenuState = {
    // 사용자 즐겨찾기 목록 상태
    userMyMenuList: atom<MenuItemVO[]>({
        key: `${USER_MENU_GROUP}/userMyMenuList`,
        default: []
    }),

    //사용자 즐겨찾기 목록 갱신 상태
    userMyMenuRefresh : atom<boolean>({
        key: `${USER_MENU_GROUP}/userMyMenuRefresh`,
        default: false
    }),

    // 사용자 메인 메뉴 목록 상태
    userMainMenuList: atom<MenuItemVO[]>({
        key: `${USER_MENU_GROUP}/userMainMenuList`,
        default: []
    }),

    // 활성화된 메뉴 아이템 정보 상태
    activeMenuItemVO: atom<MenuItemVO | undefined>({
        key: `${USER_MENU_GROUP}/activeMenuItemVO`,
        default: undefined
    })
}

export default UserMenuState;