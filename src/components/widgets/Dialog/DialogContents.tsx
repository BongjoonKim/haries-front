import {JSXElementConstructor, ReactElement} from "react";
import styled from "styled-components";

export default function DialogContents(props : {
    children?: ReactElement<any, string | JSXElementConstructor<any>>;
    size?: Modal.boxSize;
    padding?: string | number | 0
}) {
    return (
        <Wrapper
            style={{
                ...props.size,
                padding: props.padding ?? "5px",
                maxHeight: props.size?.maxHeight ?? "1000px"
            }}
        >
            {props.children}
        </Wrapper>
    )
}

const Wrapper = styled.div`
  box-sizing: border-box;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;