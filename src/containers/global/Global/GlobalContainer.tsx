import {ReactNode} from "react";
import GlobalHeader from "../Header/GlobalHeader";
import styled from "styled-components";
import {useLayout} from "../../../hooks/layout/useLayout";

function GlobalContainer(props: {children: ReactNode}) {
    const {isAsideCollapsed} = useLayout();

    return (
        <StyledGlobalContainer>
            <GlobalHeader />
            <StyledGlobalBody>
                <StyledGlobalLeftAside isCollapsed={false}>
                    <p>
                        <span>system-time</span>
                    </p>
                </StyledGlobalLeftAside>
                <StyledGlobalMain isAsideCollapsed={false}>
                    {props.children}
                </StyledGlobalMain>
            </StyledGlobalBody>
        </StyledGlobalContainer>
    )
}

export default GlobalContainer;

const StyledGlobalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledGlobalBody = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  height: calc(100% - 50px);
  overflow-y: auto;
`;

const StyledGlobalLeftAside = styled.div<{isCollapsed: boolean}>`
  width: ${props => (props.isCollapsed ? "0px" : "250px")};
  min-width: ${props => (props.isCollapsed ? "0px" : "250px")};
  transition: all 0.2s ease-out;
  border-right: 1px solid #cfd2d4;
  border-left: 1px solid #e8eaeb;
  background: #fff;
  box-shadow: 0 0 10px #00000026;
  flex-direction: column;
  display: inline;
  overflow-x: hidden;
  overflow-y: auto;
`;

const StyledGlobalMain = styled.main<{isAsideCollapsed: boolean}>`
  flex-grow: 1;
  height: 100%;
  width: ${props => (props.isAsideCollapsed ? "1920px" : "1670px")};
  padding: 12px;
  overflow: auto;
`;