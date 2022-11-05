import {ReactNode} from "react";

function GlobalContainer(props: {children: ReactNode}) {
    return (
        <div id="global-container">
            {/*<GlobalHeader />*/}
            <span>상단 메뉴</span>
        <div className="global-body">
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
        </div>
    </div>
    )
}

export default GlobalContainer;