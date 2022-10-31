import {useRecoilState, useRecoilValue} from "recoil";
import {useLocation} from "react-router-dom";
import UserState from "./state/UserState";
import {useMemo} from "react";

const useUser = () => {
    // 로케이션 hook
    const location = useLocation();

    // 저장된 사용자 아이디 state
    const [rememberUserId, setRememberUserId] = useRecoilState(UserState.rememberUserId);

    // 사용자 인증정보 state
    const [userAuth, setUserAuth] = useRecoilState(UserState.userAuth);

    // 사용자 로그인 여부 state
    const isLogin = useRecoilValue(UserState.isLogin);

    //로그인 처리 제외 경로 여부 state
    const isLoginExcludePath = useMemo(() => {
        const loginExcludePathList = ["./loginPage"];
        return loginExcludePathList.includes(location.pathname);
    }, [location.pathname]);

    return {
        rememberUserId, setRememberUserId,
        userAuth, setUserAuth,
        isLogin, isLoginExcludePath
    }
}

export default useUser;