import {ReactNode, useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import useUser from "../../hooks/users/useUser";
import classNames from "classnames";

function UniversalContainer(props : {childern : ReactNode}) {
    const navigate = useNavigate();
    const location = useLocation();

    // 사용자 정보 hook
    const {isLogin, isLoginExcludePath} = useUser();

    // universal-container class 설정
    const userversalClass = classNames({
        "sidbar-enable" : true,
    });

    // 로그인 여부 effect
    useEffect(() => {
        if (!isLoginExcludePath && !isLogin) {

        }
    })
}

export default UniversalContainer

