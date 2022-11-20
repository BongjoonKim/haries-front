import {CSSProperties, ReactNode} from "react";
import styled from "styled-components";
import ModalMask from "./ModalMask";
import ModalBox from "./ModalBox";

function Modal(props: {
    id: string | number;
    status: Modal.status;
    onChangeStatus?: Modal.onChangeStatus;
    size?: Modal.boxSize;
    children: ReactNode;
    closeStyle ?: CSSProperties;
    onCloseCallback?: () => void;
}) {
    return (
        <Wrapper id="modal">
            <ModalMask id={props.id} statusId={props.status.id} onchangeStatus={props.onChangeStatus} />
            <ModalBox id={props.id} statusId={props.status.id}
                      onCloseModal={() => props.onChangeStatus?.({id: ""})}
                      onCLoseCallback={props.onCloseCallback}
                      size={props.size}
                      closeStyle={props.closeStyle}
          >
                {props.children}
            </ModalBox>
        </Wrapper>

    )
}

const Wrapper = styled.div`
    transition-duration: 0.5s;
  text-align: initial;
  z-index: 9998;
  position: fixed;
  .modal {
    &,
    &-mask {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
    }
    &-mask {
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 9998;
    }
    &-area {
      min-width: 394px;
      background: #fff;
      border-radius: 8px;
      z-index: 9998;
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0px 5px 16px rgba(0, 0, 0, 0.25);
      background-color: #f4f6f9;
      padding: 3px;
    }
    &-close-button {
      position: absolute;
      top: -28px;
      right: 0;
    }
    &-close-button:hover {
      fill: #a8a7a7
    }
    &-header {
      font-size: 20px;
      font-weight: normal;
    }
    &-body {
      max-height: 500px;
      overflow-y: auto;
      ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
        position: absolute;
      }
      ::-webkit-scrollbar-button:start:decrement,
      ::-webkit-scrollbar-button:end:increment {
        display: block;
        width: 0;
        height: 0;
        background: url() rbga(0, 0, 0, 0.05);
      }
      ::-webkit-scrollbar-track {
        background: rbga(0,0,0,0.07);
        border-radius: 15px;
      }
      ::-webkit-scrollbar-thumb {
        background: rgba(0,0,0,0.1);
        border-radius: 15px;
      }
      
    }
  }
`;

export default Modal;