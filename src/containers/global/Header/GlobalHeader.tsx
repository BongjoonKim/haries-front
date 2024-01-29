import {useEffect, useState} from "react";
import {useLayout} from "../../../hooks/layout/useLayout";
import useUser from "../../../hooks/users/useUser";
import {useUserMainMenu} from "../../../hooks/users/useUserMainMenu";
import {Link} from "react-router-dom";
import Navigator from "./Navigator";
import "../../../styles/scss/components/topbar.scss"
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {StyledTreeList} from "../../../components/modules/TreeView/list/TreeList";
import useGlobalHeader from "./useGlobalHeader";
import RightNavigator from "./RightNavigator";
import {IconButton} from "@material-ui/core";
import {DehazeRounded} from "@material-ui/icons";

function GlobalHeader() {
    // 메인 메뉴 로딩 상태
    const [mainMenuLoading, setMainMenuLoading] = useState<boolean>(false);

    // 사이드바 보임 여부
    const { isAsideCollapsed, setIsAsideCollapsed } = useLayout();

    // 로그인 사용자 여부
    const { isLogin, userAuth } = useUser();

    // 사용자 메인 메뉴 hook
    const { userMainMenuList, initialUserMainMenuList} = useUserMainMenu();

    const {menuList} = useGlobalHeader();
    
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin) {
            setMainMenuLoading(true);
            initialUserMainMenuList().finally(() => setMainMenuLoading(false));
        }
    }, [isLogin, userAuth.frontUsersVO?.userId]);

    return (
        <StyledGlobalHeader>
            <StyledHeaderLeft className="header-left">
                <StyledLogoContainer isCollapsed={isAsideCollapsed}>
                    <StyledLogo
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/haries_logo.png`}
                        width="150em"
                        height="100%"
                        
                      />
                    </StyledLogo>
                    <StyledDehaze>
                      <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => {
                          if (isAsideCollapsed) {
                            setIsAsideCollapsed(false);
                          } else {
                            setIsAsideCollapsed(true);
                          }
                        }}
                      >
                        <DehazeRounded/>
                      </IconButton>
                    </StyledDehaze>
                    {/*<p*/}
                    {/*  style={{*/}
                    {/*    margin: "0.2rem 0 0 0",*/}
                    {/*    padding: "auto",*/}
                    {/*    fontSize: "2rem",*/}
                    {/*    fontWeight : 100*/}
                    {/*  }}*/}
                    {/*>|*/}
                    {/*</p>*/}
                    {/*<p className="divide-header-bar">|</p>*/}
                </StyledLogoContainer>
                <Navigator className="header-navigator" items={menuList} loading={mainMenuLoading} />
            </StyledHeaderLeft>
            <StyledHeaderRight>
                <RightNavigator />
            </StyledHeaderRight>
        </StyledGlobalHeader>
    )

}

export default GlobalHeader;

const StyledGlobalHeader = styled.div`
  height: 3.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #cfd2d4;
  border-left: 1px solid #e8eaeb;
  background-color: #fff;
  box-shadow: 0 0 10px #0000000d;
  transition: all 0.2s ease-out;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0);
  
`;

// 왼쪽 상단바
const StyledHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  width: 15rem;
  
`

const StyledHeaderRight = styled.div`
  padding-left: 1rem;
  display: flex;
  background-color: black;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0);
`;

const StyledLogoContainer = styled.div<{isCollapsed: boolean}>`
  // width: ${props => (props.isCollapsed ? "100px" : "200px")};
  min-width: ${props => (props.isCollapsed ? "0" : "10rem")};
  transition: all 0.2s ease-out;
  padding-left: 2rem;
  //overflow: hidden;
  display: flex;
  text-align: center;
`;

const StyledLogo = styled.div`
  display: flex;
  width: 8rem;
  margin: auto 0;
  cursor: pointer;
  
`;

const StyledDehaze = styled.div`
  margin: auto;
  padding-left: 2.5rem;
  display: flex;
`;