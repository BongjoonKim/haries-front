import {useEffect, useState} from "react";
import {useLayout} from "../../../hooks/layout/useLayout";
import useUser from "../../../hooks/users/useUser";
import {useUserMainMenu} from "../../../hooks/users/useUserMainMenu";
import {Link} from "react-router-dom";
import Navigator from "../../../components/widgets/Navigator";
import {useMenuData} from "./useMenuData";
import "../../../styles/scss/components/topbar.scss"
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {StyledTreeList} from "../../../components/modules/TreeView/list/TreeList";

function GlobalHeader() {
    // 메인 메뉴 로딩 상태
    const [mainMenuLoading, setMainMenuLoading] = useState<boolean>(false);

    // 사이드바 보임 여부
    const { isAsideCollapsed } = useLayout();

    // 로그인 사용자 여부
    const { isLogin, userAuth } = useUser();

    // 사용자 메인 메뉴 hook
    const { userMainMenuList, initialUserMainMenuList} = useUserMainMenu();

    const menuData = useMenuData;

    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin) {
            setMainMenuLoading(true);
            initialUserMainMenuList().finally(() => setMainMenuLoading(false));
        }
    }, [isLogin, userAuth.frontUsersVO?.userId]);

    return (
        <StyledGlobalHeader>
            <StyledHeaderLeft>
                <StyledLogoContainer isCollapsed={isAsideCollapsed}>
                    <StyledLogo
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        Home
                    </StyledLogo>
                </StyledLogoContainer>
                <Navigator items={menuData} loading={mainMenuLoading} />
            </StyledHeaderLeft>
        </StyledGlobalHeader>
    )

}

export default GlobalHeader;

const StyledGlobalHeader = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #cfd2d4;
  border-left: 1px solid #e8eaeb;
  background-color: #fff;
  box-shadow: 0 0 10px #0000000d;
  transition: all 0.2s ease-out;
  z-index: 5;
`;

const StyledHeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const StyledHeaderRight = styled.div`
  padding-right: 10px;
`;

const StyledSideBarToggleButton = styled.button`
  width: 50px;
  height: 49px;
  background-color: unset;
  cursor: pointer;
  border: none;
  &:hover {
    background: #f4f6f8;
  }
`;

const StyledLogoContainer = styled.div<{isCollapsed: boolean}>`
  width: ${props => (props.isCollapsed ? "0px" : "250px")}
  min-width: ${props => (props.isCollapsed ? "0px" : "250px")};
  transition: all 0.2s ease-out;
  padding-left: 20px;
  overflow: hidden;
`;

const StyledLogo = styled.div`
  display: block;
  width: 63px;
  height: 20px;
  margin: auto 0;
  cursor: pointer;
`;