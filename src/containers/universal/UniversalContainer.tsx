import {ReactNode, useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import useUser from "../../hooks/users/useUser";
import classNames from "classnames";
import styled from "styled-components";
import {ModeProvider, ModeTypes} from "../../components/modules/Mode";
import useGlobalMode from "../mode/useGlobalMode";
import GlobalModeNames from "../../constants/modes/global-mode.const";

function UniversalContainer(props : {children : ReactNode}) {
    const navigate = useNavigate();
    const location = useLocation();

    // 사용자 정보 hook
    const {isLogin, isLoginExcludePath} = useUser();

    // universal-container class 설정
    const userversalClass = classNames({
        "sidbar-enable" : true,
    });

    // 로그인 여부 effect
    // useEffect(() => {
    //     if (!isLoginExcludePath && !isLogin) {
    //
    //     }
    // })

    const { getGlobalModeProps } = useGlobalMode<GlobalModeNames>()

    return (
        <>
            <Universal
                id="universal-container"
            >
                <ModeProvider value={{...getGlobalModeProps()}}>
                </ModeProvider>
            </Universal>
        </>
    )

}

export default UniversalContainer;

const Universal = styled.div`
  height: 100%;
  width: 100%;
`;

