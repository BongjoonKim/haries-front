import {useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import UserMenuState from "./state/UserMenuState";
import {useCallback} from "react";
import {retrieveMenus} from "../../endpoints/common-endpoints";
import messengerUtil from "../../utilities/messengerUtil";
import {UI_CALLING_TYPE} from "../../constants/modes/global-no.const";

export const useUserMainMenu = () => {
    const navigate = useNavigate();

    // 사용자 메뉴 목록 상태
    const [userMainMenuList, setUserMainMenuList] = useRecoilState(UserMenuState.userMainMenuList);

    // 활성화된 메뉴 아이템 정보
    const [activeMenuItemVO, setActiveMenuItemVO] = useRecoilState(UserMenuState.activeMenuItemVO);

    // 사용자 메인 메뉴 초기화(불러오기)
    const initialUserMainMenuList = useCallback(async () => {
        try {
            const response =  await retrieveMenus();
            setUserMainMenuList(response.data);
        } catch (error) {
            messengerUtil.serverMessage("Server Error");
        }
    }, []);

    const linkMenu = useCallback((menuItemVO: MenuItemVO) => {
    if (menuItemVO.menuHref === undefined || menuItemVO.menuHref === "") return;

    switch(menuItemVO.callingType) {
        case UI_CALLING_TYPE.CONTENTS_REPLACE:
            setActiveMenuItemVO(menuItemVO);
            navigate(menuItemVO.menuHref!!);
            break;
        case UI_CALLING_TYPE.NEW_BROWSER_WINDOW_OPEN:
            setActiveMenuItemVO(menuItemVO);
            const andStr = menuItemVO.menuHref.indexOf("?") > -1 ? "&" : "?";
            window.open(
                `${menuItemVO.menuHref}${andStr}type=independent`,
                "_blank",
                "height=600, width=1024",
            );
            break;
        default:
            console.log("여기", menuItemVO.menuHref)
            setActiveMenuItemVO(menuItemVO);
            navigate(menuItemVO.menuHref!!);
            break;
    }
    }, []);

    return {
        userMainMenuList,
        initialUserMainMenuList,
        activeMenuItemVO,
        setActiveMenuItemVO,
        linkMenu
    }
}