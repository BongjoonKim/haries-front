import {Content} from "../index";
import {useMainContentContext} from "../MainContentContext";
import {ContentFooterHandler} from "../../../../constants/types/main-content.const";
import ContentHandler, {sortContentFooterHandler} from "../handler/ContentHandler";
import styled from "styled-components";
import Column from "../../../elements/Layout/Column";
import ContentCustomHandler from "../handler/ContentCustomHandler";

function ContentFooterHandlers(props: Content.HandlerProps) {
    const context = useMainContentContext();

    const ContentHandlerList = (): JSX.Element[] | undefined => {
        if (context) {
            const footerHandler = context?.footerHandler?.filter(
                key => typeof key === "string"
            ) as unknown as ContentFooterHandler[];

            return footerHandler
                ?.sort(sortContentFooterHandler)
                ?.map((key: ContentFooterHandler): JSX.Element & any => {
                    switch (key) {
                        case ContentFooterHandler.reset:
                            return <ContentHandler.Reset key={key} onReset={props.onReset} />;
                        case ContentFooterHandler.submit:
                            return <ContentHandler.Submit key={key} onSubmit={props.onSubmit} />;
                        case ContentFooterHandler.close:
                            return <ContentHandler.Close key={key} onClose={props.onClose} />;
                        case ContentFooterHandler.update:
                            return <ContentHandler.Update key={key} onUpdate={props.onUpdate} />;
                        default:
                            return undefined;
                    }
                }). filter(x => x);
        }
        return undefined;
    }

    return (
        <StyledContentFooterHandler className="content-footer-handler">
            {context?.footerHandler && (
                <ContentCustomHandler customHandlers={
                    [
                        ...context.footerHandler.filter(x => typeof x === "object")
                    ] as Content.CustomHandlerProps[]
                    }
                    type="footer"
                />
            )}
            {ContentHandlerList()}
        </StyledContentFooterHandler>
    )
}

export default ContentFooterHandlers;

const StyledContentFooterHandler = styled(Column)`
  display: flex;
  flex-direction: row;
`;