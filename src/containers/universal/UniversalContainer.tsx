import {ReactNode, useCallback, useEffect, useLayoutEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import useUser from "../../hooks/users/useUser";
import classNames from "classnames";
import styled from "styled-components";
import {ModeProvider, ModeTypes} from "../../components/modules/Mode";
import useGlobalMode from "../mode/useGlobalMode";
import GlobalModeNames from "../../constants/modes/global-mode.const";
import extractorUtil from "../../utilities/extractorUtil";
import ExtractorUtil from "../../utilities/extractorUtil";
import GlobalContainer from "../global/Global/GlobalContainer";
import messengerUtil from "../../utilities/messengerUtil";

function UniversalBranch(props: {children: ReactNode}) {
    return (() => {
        switch (ExtractorUtil.getQueryParameterValue("type")) {
            case "independent":
                return <></>
            default:
                return <GlobalContainer>{props.children}</GlobalContainer>
        }
    })();
}

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
    useEffect(() => {
        if (!isLoginExcludePath && !isLogin) {
            messengerUtil.showMessageBox({
                text: "인증되지 않은 접근입니다.",
                visible: true
            });

            setTimeout(() => {
                // 로그인 사용자 페이지 보여주기;
                alert("로그인 페이지 개발 예정")
            }, 250)
        }
    }, [isLogin, isLoginExcludePath]);

    const { getGlobalModeProps } = useGlobalMode<GlobalModeNames>();
    const handleGetConnectExplorerID = useCallback(() => {
        if (location.search) {
            const searchParams = new URLSearchParams(location.search);
            if (searchParams.get("types")) {
                document.body.style.minWidth = "initial";
            }
        }
    }, [location.search]);

    useLayoutEffect(() => handleGetConnectExplorerID(), [handleGetConnectExplorerID, location]);



    return (
        <Universal>
            <UniversalBranch children={props.children} />
        </Universal>
    )

}

export default UniversalContainer;

const Universal = styled.div<{independent?: boolean}>`
  height: 100%;
  width: 100%;
`;

