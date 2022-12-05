import {Content} from "../index";
import styled from "styled-components";
import Column from "../../../elements/Layout/Column";
import ContentFooterHandlers from "./ContentFooterHandlers";

interface ContentFooterProps extends Content.HandlerProps {
    id?: string;
}

export default function ContentFooter(props: ContentFooterProps) {
    return (
        <StyledContentFooter className="content-footer">
            <Column className="content-footer-start">{}</Column>
            <ContentFooterHandlers
                onReset={props.onReset}
                onSearch={props.onSearch}
                onClose={props.onClose}
                onSubmit={props.onSubmit}
                onUpdate={props.onUpdate}
                link={props.link}
            />
        </StyledContentFooter>
    )
}

const StyledContentFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  &:not(:empty) {
    padding: 12px 0;
    background-color: #f8f9fa;
  }
`;