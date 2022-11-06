import {useEffect, useState} from "react";
import {useLayout} from "../../../hooks/layout/useLayout";
import useUser from "../../../hooks/users/useUser";
import {useUserMainMenu} from "../../../hooks/users/useUserMainMenu";
import {Link} from "react-router-dom";

function GlobalHeader() {
    // 메인 메뉴 로딩 상태
    const [mainMenuLoading, setMainMenuLoading] = useState<boolean>(false);

    // 사이드바 보임 여부
    const { toggleSidebarEnable } = useLayout();

    // 로그인 사용자 여부
    const { isLogin, userAuth } = useUser();

    // 사용자 메인 메뉴 hook
    const { userMainMenuList, initialUserMainMenuList} = useUserMainMenu();

    useEffect(() => {
        if (isLogin) {
            setMainMenuLoading(true);
            initialUserMainMenuList().finally(() => setMainMenuLoading(false));
        }
    }, [isLogin, userAuth.frontUsersVO?.userId]);

    return (
        <div className="topbar" id="global-header">
            <div className="topbar__left">
                <Link className="tobpar__logo" to="/" />
            </div>
        </div>
    )

}

export default GlobalHeader;