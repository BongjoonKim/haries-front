import {message} from "../../../types/form";
import styled from "styled-components";
import converter from "../../../utilities/converter";

interface FieldMessageProps<T> {
    message?: message<T>;
    status?: T;
}

function FieldMessage<T> (props: FieldMessageProps<T>) {
    return (
        <StyledFieldMessage>
            {props.message && (
                <span className={converter.classNames(["message", String(props.status)])}>
                    {typeof props.message === "string" ? props.message : props.message.text}
                </span>
            )}
        </StyledFieldMessage>
    )
}

export default FieldMessage;

const StyledFieldMessage = styled.div`
  .message {
    color: red;
  }
`;