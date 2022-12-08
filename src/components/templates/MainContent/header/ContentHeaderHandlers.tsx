import {Content} from "../index";
import {useMainContentContext} from "../MainContentContext";
import {ContentHeaderHandler} from "../../../../constants/types/main-content.const";
import ContentHandler, {sortContentHeaderHandler} from "../handler/ContentHandler";
import styled from "styled-components";
import Column from "../../../elements/Layout/Column";
import ContentCustomHandler from "../handler/ContentCustomHandler";

function ContentHeaderHandlers(props: Content.HandlerProps) {
    const context = useMainContentContext();

    const ContentHandlerList = (): JSX.Element[] | undefined => {
        if (context) {
            const headerHandler = context?.headerHandler?.filter(
                key => typeof key === "string"
            ) as unknown as ContentHeaderHandler[];

            return headerHandler
                ?.sort(sortContentHeaderHandler)
                ?.map((key: ContentHeaderHandler): JSX.Element & any => {
                    switch (key) {
                        case ContentHeaderHandler.reset:
                            return <ContentHandler.Reset key={key} onReset={props.onReset} />;
                        case ContentHeaderHandler.search:
                            return <ContentHandler.Search key={key} onSearch={props.onSearch} />;
                        case ContentHeaderHandler.submit:
                            return <ContentHandler.Submit key={key} onSubmit={props.onSubmit} />;
                        case ContentHeaderHandler.close:
                            return <ContentHandler.Close key={key} onClose={props.onClose} />;
                        case ContentHeaderHandler.update:
                            return <ContentHandler.Update key={key} onUpdate={props.onUpdate} />;
                        case ContentHeaderHandler.link:
                            return <ContentHandler.Link key={key} link={props.link} />;
                        default:
                            return undefined;
                    }
                }).filter(x => x);
        }
        return undefined;
    }

    return (
        <StyledContentHeaderHandler className="content-footer-handler">
            {context?.headerHandler && (
                <ContentCustomHandler
                    customHandlers={
                        [
                            ...context.headerHandler.filter(x => typeof x === "object")
                        ] as Content.CustomHandlerProps[]
                    }
                    type="header"
                />
            )}
            {ContentHandlerList()}
        </StyledContentHeaderHandler>
    )
}

export default ContentHeaderHandlers;

const StyledContentHeaderHandler = styled(Column)`
  display: flex;
  flex-direction: row;
`;