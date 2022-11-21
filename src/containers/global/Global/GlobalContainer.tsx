import {ReactNode} from "react";
import GlobalHeader from "../Header/GlobalHeader";
import styled from "styled-components";

function GlobalContainer(props: {children: ReactNode}) {
    return (
        <StyledGlobalContainer>
            <GlobalHeader />
            <StyledGlobalBody>
                <div className="global-aside">
                    {/*<MyMenu />*/}
                    {/*<QuickSingleSearch />*/}
                    <div className="side-maintenance">
                        <p>
                            <span>system-time</span>
                        </p>
                    </div>
                </div>
                <main id="global-main">
                    <div id="content-container">
                        <div className="content-container-body">{props.children}</div>
                    </div>
                </main>
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
  overflow-y: auth;
`;