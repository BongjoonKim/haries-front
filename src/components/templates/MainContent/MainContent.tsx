import {Content} from "./index";
import {MainContentContextState, MainContentProvider} from "./MainContentContext";
import {CircularProgressProps} from "@material-ui/core";
import useMainContent from "./useMainContent";
import {useEffect, useMemo, useState} from "react";
import MainContentSection from "./MainContent.Section";
import styled from "styled-components";
import ContentHeader from "./header/ContentHeader";
import ContentFooter from "./footer/ContentFooter";

interface MainProps extends Content.CommonProps, Content.BodyProps, Content.HeaderProps, Content.FooterProps, Content.HandlerProps {
    value?: MainContentContextState;
    id?: string;
    loading?: boolean;
    loadingProps?: CircularProgressProps;
    onInit?: () => Promise<void>;
    mainContentTheme?: string;
    noGrow?: boolean
    header?: any;
    style ?: any;
    titleOnClick ?: (props ?: any) => void;
}

function MainContent(props: MainProps) {
    // 콘텐츠 아이디 존재하면 hook 연결
    const mainContentHook = useMainContent(props.id);
    const [initLoading, setInitLoading] = useState(false);

    // 메인 컨텐츠 초기화
    useEffect(() => {
        if (props.onInit) {
            setInitLoading(true);
            props.onInit().finally(() => setInitLoading(false));
        }
    }, []);

    // 메인 컨텐츠 로딩 여부
    const isLoading = useMemo(() => {
        return (
            (props.loading === undefined ? false : props.loading)
            || initLoading
            || (mainContentHook === undefined ? false : mainContentHook?.mainContentLoading)
        );
    }, [props.loading, initLoading, mainContentHook]);

    return (
        <MainContentProvider value={props.value} style={props.style}>
            <StyledContent mainContentTheme={props.mainContentTheme}>
                <ContentHeader
                    contentHeaderTheme={props.mainContentTheme}
                    title={props.title}
                    header={props.header}
                    onReset={props.onReset}
                    onSearch={props?.onSearch}
                    onSubmit={props?.onSubmit}
                    onClose={props?.onClose}
                    onUpdate={props?.onUpdate}
                    link={props?.link}
                    titleOnClick={props?.titleOnClick}
                />
                <StyledContentBody mainContentTheme={props.mainContentTheme} noGrow={props.noGrow}>
                    {props.children}
                </StyledContentBody>
                <StyledFooterBody>{props.footer}</StyledFooterBody>
                {props.value?.footerHandler && props.value.footerHandler.length > 0 && (
                    <ContentFooter
                        onReset={props.onReset}
                        onSearch={props?.onSearch}
                        onSubmit={props?.onSubmit}
                        onClose={props?.onClose}
                        onUpdate={props?.onUpdate}
                        link={props?.link}
                    />
                )}
            </StyledContent>
        </MainContentProvider>
    )
}

MainContent.Section = MainContentSection;

const StyledContent = styled.div<{mainContentTheme?: string}>`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
`;

const StyledContentBody = styled.div<{mainContentTheme?: string; noGrow?: boolean}>`
  flex-grow: ${props => (props.noGrow ? "initial" : 1)};
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  //height: 300px;
  flex-shrink: 1;
`;

const StyledFooterBody = styled.div<any>`
`;

export default MainContent;
