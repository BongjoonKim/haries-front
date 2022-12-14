import styled, {css} from "styled-components";
import {CircularProgress, CircularProgressProps, Select} from "@material-ui/core";
import {ReactNode, useEffect, useMemo, useState} from "react";
import {useSection} from "./useSection";
import {heIL} from "@material-ui/core/locale";
import {theme} from "../../../constants/types/main-content.const";
import Button from "../../elements/Button/Button";

interface ContentSectionProps {
    title?: string;
    children: ReactNode | ReactNode[];
    footer?: ReactNode | ReactNode[];
    header?: ReactNode | ReactNode[];
    handler?: ReactNode | ReactNode[];
    onMinimize?: () => void;
    minimize?: boolean;
    margin?: string;
    id?: string;
    loading?: boolean;
    loadingProps?: CircularProgressProps;
    onInit?: () => Promise<void>;
    mainContentTheme?: string;
    height?: string;
    grow?: boolean;
}

function ContentSectionHeader(props: {
    title?: ContentSectionProps["title"];
    handler: ContentSectionProps["handler"];
}) {
    return (
        <header className="content-section-header">
            {props.title && <div className="content-section-title">{props.title}</div>}
            {props.handler && <div className="content-section-handler">{props.handler}</div>}
        </header>
    );
}

export default function ContentSection(props: ContentSectionProps) {

    // 메인 컨텐츠 섹션 아이디 존재하면 hook 연결
    const sectionHook = useSection(props.id);

    // 메인 컨텐츠 섹션 초기화 로딩 state
    const [initLoading, setInitLoading] = useState(false);

    // 메인 섹션 초기화
    useEffect(() => {
        if (props.onInit) {
            setInitLoading(true);
            props.onInit().finally(() => setInitLoading(false));
        }
    }, []);

    // 메인 컨텐츠 섹션 로딩 여부
    const isLoading = useMemo(() => {
        return (
            (props.loading === undefined ? false : props.loading)
            || initLoading
            || (sectionHook === undefined ? false : sectionHook?.setSectionLoading)
        )
    },[props.loading, initLoading, sectionHook]);

    return (
        <StyledContentSection
            className="content-section"
            margin={props.margin}
            visible={!!(props.title || props.handler)}
            height={props.height}
            minimize={props.minimize}
            grow={props.grow}
            mainContentTheme={props.mainContentTheme}
        >
            {!!(props?.title || props.handler) && (
                <ContentSectionHeader handler={props.handler} title={props.title} />
            )}
            <div className="content-section-body">{props.children}</div>
            {props.footer && <footer className="content-section-footer">{props.footer}</footer>}
            {props.onMinimize && (
                <StyledSectionToggleButton type="button" onClick={props.onMinimize}>
                {/*  접고 펼치는 로직 추가 */}
                    <Button name={props?.minimize === true ? "arrowExpand" : "arrowCollapsed"} />
                </StyledSectionToggleButton>
            )}
            {/* isBackdrop 로직 추가 */}
            {/*<CircularProgress/>*/}
        </StyledContentSection>
    )
}

const StyledContentSection = styled.section<{
    visible?: boolean;
    margin?: string;
    height?: string;
    minimize?: boolean | undefined;
    grow?: boolean;
    mainContentTheme?: string;
}>`
  position: relative;
  padding: 10px;
  border: 1px solid #b3b7ba;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  flex: 0 0 auto;
  overflow-y: visible;
  display: flex;
  flex-direction: column;
  height: ${props => props.height ?? "initial"};
  ${props => props.grow ? css`
    flex-grow: 1;
    flex-shrink: 1;
    min-height: 200px;
  ` : ""};
  
  .content-section {
    &-header {
      display: flex;
      align-items: center;
      margin: ${props => (props.visible === false ? 0 : "0 0 4px")};
    }
    &-title {
      position: relative;
      margin: 0;
      padding-left: 0;
      padding-bottom: 4px;
      font-size: 15px;
      font-weight: 600;
    }
    &-body {
      display: flex;
      flex-direction: column;
      height: 100%;
      row-gap: 8px;
    }
  }
`;

const StyledSectionToggleButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 26px;
  height: 26px;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  svg {
    position: relative;
    z-index: 1;
  };
  &:after {
    content: "";
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 0;
    height: 0;
    border-bottom: 30px solid #6d6d6d;
    border-left: 29px solid transparent;
  }
`;