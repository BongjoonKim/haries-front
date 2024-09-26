import styled from "styled-components";
import {theme} from "../../../../constants/types/main-content.const";
import Column from "../../../elements/Layout/Column";
import ContentHeaderHandlers from "./ContentHeaderHandlers";
import {Content} from "../index";

interface ContentHeaderProps extends Content.HandlerProps {
    id?: string;
    title?: string;
    contentHeaderTheme?: string;
    header ?: any;
    titleOnClick ?: (props ?: any) => void;
}

export default function ContentHeader(props: ContentHeaderProps) {
    return (
        <StyledContentHeader className="content-header" contentHeaderTheme={props.contentHeaderTheme} titleOnClick={props.titleOnClick}>
            <Column flexdirection="row" alignitems="center" justifycontent="space-between" flex={1}>
                <h3 className="content-header-title" onClick={props.titleOnClick}>{props.title}</h3>
                <div className="content-header-buttons">{props.header}</div>
            </Column>
            <ContentHeaderHandlers
                onReset={props.onReset}
                onSearch={props.onSearch}
                onClose={props.onClose}
                onSubmit={props.onSubmit}
                onUpdate={props.onUpdate}
                link={props.link}
            />
        </StyledContentHeader>
    )
}

const StyledContentHeader = styled.header<{contentHeaderTheme?: string, titleOnClick ?: (props?:any) => void}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  .content-header {

      //justify-content: space-between;
      &-title {
        cursor: ${props => props.titleOnClick && "pointer"};
        position: relative;
        padding-left: 24px;
        margin: 0;
        color: #363a3e;
        font-size: 15px;
        line-height: 26px;
        font-weight: 600;
        text-transform: capitalize;
        padding-bottom: 0 !important;

        &:not(:empty):after {
          content: "";
          display: block;
          position: absolute;
          top: 50%;
          left: 0;
          margin-top: -8px;
          width: 18px;
          height: 18px;
          line-height: 18px;
        }
      }

      &-buttons {

      }
  }
`;