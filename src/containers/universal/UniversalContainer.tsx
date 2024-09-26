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
import ModeContainer from "../mode/ModeContainer";
import useUserLogin from "../../utilities/useUserLogin";
import {Alert, AlertTitle, Snackbar, SnackbarCloseReason} from "@mui/material";
import {useRecoilState} from "recoil";
import recoilCommonState from "../../stores/recoil/recoilCommonState";

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
    const {getLoginedUser} = useUserLogin();
    const [errInfo, setErrInfo] = useRecoilState(recoilCommonState.errInfo);
    
    useEffect(() => {
        getLoginedUser()
    }, []);

    // 사용자 정보 hook
    const {isLogin, isLoginExcludePath} = useUser();
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty(`--vh`, `${vh}px`);

    // 로그인 여부 effect
    // useEffect(() => {
    //     if (!isLoginExcludePath && !isLogin) {
    //         messengerUtil.showMessageBox({
    //             text: "인증되지 않은 접근입니다.",
    //             visible: true
    //         });
    //
    //         setTimeout(() => {
    //             // 로그인 사용자 페이지 보여주기;
    //             alert("로그인 페이지 개발 예정")
    //         }, 250)
    //     }
    // }, [isLogin, isLoginExcludePath]);

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
    
    const handleClose = (
      event?: React.SyntheticEvent | Event,
      reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        
        setErrInfo((prev : any) => {
            return {
                ...prev,
                isOpen: false
            }
        });
    };

    return (
        <Universal>
            {/*{errInfo?.isOpen && (*/}
            {/*  <Alert*/}
            {/*    severity={errInfo.severity}*/}
            {/*    sx={{*/}
            {/*        position: "absolute",*/}
            {/*        opacity: 1,*/}
            {/*        width: "50%"*/}
            {/*    }}*/}
            {/*    variant="filled"*/}
            {/*  >*/}
            {/*      <AlertTitle>{errInfo.severity}</AlertTitle>*/}
            {/*      {errInfo?.statusText}*/}
            {/*  </Alert>*/}
            {/*)}*/}

            <ModeProvider value={{...getGlobalModeProps()}}>

                <UniversalBranch children={props.children} />

            </ModeProvider>
            {/*  오류 발견  */}
            {/*<ModeContainer />*/}
            <Snackbar open={errInfo.isOpen} autoHideDuration={6000} onClose={handleClose} >
                <Alert
                  severity={errInfo.severity}
                  variant={"filled"}
                  sx={{width : "100%"}}
                >
                    {errInfo.statusText}
                </Alert>
            </Snackbar>
        </Universal>
    )

}

export default UniversalContainer;

const Universal = styled.div<{independent?: boolean}>`
  //height: 100%;
  //width: 100%;
    height: calc(var(--vh, 1vh) * 100);
`;

