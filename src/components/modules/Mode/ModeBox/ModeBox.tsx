import {ModeComponent} from "../../../../types/mode";
import useModeBox from "./useModeBox";
import {animated} from "react-spring";
import styled, { css } from "styled-components";
import converter from "../../../../utilities/converter";
import {ModeTypes} from "../router/generate";
import Button from "../../../elements/Button/Button";
import {VscChromeClose} from "react-icons/vsc";
import ModeBoxHeader from "./ModeBoxHeader";
import ModeResizer from "./ModeResizer";

function ModalBox<T, N>({
    type,
    status,
    name,
    title,
    size,
    onCloseMode,
    onAddTaskItem,
    taskItems,
    showTimeCount,
    children,
    dependent,
} : ModeComponent.ModeBoxProps<T, N>) {
    const {
        boxRef,
        dragControlRef,
        minimize,
        setMinimize,
        boxSize,
        setBoxSize,
        boxPosition,
        transitions,
        setResized,
        resized,
        maximize,
        onMaximize,
    } = useModeBox({
        status,
        showTimeCount,
        name,
        size
    });

    return transitions(
        ({ opacity }, item) =>
            item && (
                <animated.div
                    style={{
                        ...size,
                        opacity: opacity.to({ range: [0.0, 1.0], output: [0, 1]})
                    }}
                    tabIndex={0}
                >
                    <StyledModeBox
                        ref={boxRef}
                        maximize={maximize}
                        minimize={taskItems && String(name) in taskItems}
                        size={{width: boxSize.width, height: boxSize.height}}
                        position={{x: boxPosition.x, y: boxPosition.y}}
                        type={String(type)}
                        resized={resized}
                        className={converter.classNames([
                            "mode-box",
                            String(type)?.includes(ModeTypes.MODELESS) ? "modeless" : "modal",
                        ])}
                    >
                        {String(type)?.includes(ModeTypes.MODAL) && !dependent && (
                            <Button
                                className="all clear modal-close-button"
                                onClick={onCloseMode}
                                styles={{padding: "0px"}}
                                children={<VscChromeClose color="#fff" size={25} />}
                            />
                        )}
                        {String(type)?.includes(ModeTypes.MODELESS) && (
                            <ModeBoxHeader<N>
                                dragControlRef={dragControlRef}
                                setMinimize={setMinimize}
                                onCloseMode={onCloseMode}
                                onAddTaskItem={onAddTaskItem}
                                maximize={maximize}
                                onMaximize={onMaximize}
                                title={title}
                                name={name}
                            />
                        )}
                        <StyledModeBoxBody
                            className="mode-box-body"
                            minimize={minimize}
                            maximize={maximize}
                            resized={{
                                height: String(type)?.includes(ModeTypes.MODELESS)
                                    ? boxSize.height - boxSize.diff.height
                                    : undefined
                            }}
                        >
                            {children}
                            {String(type)?.includes(ModeTypes.MODELESS) && (
                                <ModeResizer size={boxSize} setSize={setBoxSize} resized={resized} setResized={setResized} />
                            )}

                        </StyledModeBoxBody>
                    </StyledModeBox>
                </animated.div>
            )
    )
}

export default ModalBox;

const StyledModeBox = styled.div<{
    minimize?: boolean;
    size?: {width ?: number; height?: number};
    position ?: { x: number, y: number; };
    maximize?: boolean;
    resized?: boolean;
    type?: string;
}>`
    overflow: ${props => (!props.type?.includes(ModeTypes.MODAL) ? "hidden" : "initial")};
    display: ${props => (props.minimize ? "none" : "block")};
    position: relative;
    .modal {
        &-close-button {
          position: absolute;
          top: -35px;
          right: 0;
        }
    }
    &.modal {
        top : 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    &-modeless {
        top: ${props => (props.position ? `${props.position.y}px` : "50%")};
        left: ${props => (props.position ? `${props.position.x}px` : "50%")};
    }
    ${props => {
        if (props.maximize) {
            return css`
              width: 100%;
              height: 100% !important;
              top: 0 !important;
              left: 0 !important;
            `;
        }
        return css`
          max-width: ${props.maximize || props?.resized ? "100%" : "1200px"};
          width: ${props.size?.width ? `${props.size?.width}px` : "max-content"};
        `;
    }}
  ${props => {
    if (props.minimize) {
        return css`
          height: 20px;
        `;
    }
    return css`
      max-height: ${props.minimize || props?.resized ? "100%" : "700px"};
      height: ${props.size?.height ? `${props.size?.height}px` : "auto"};
    `;
  }}
  background: #fff;
  border-radius: 8px;
  z-index: 9998;
  position: fixed;
  box-shadow: 0px 5px 16px rgba(0, 00, 0, 0.25);
  background-color: #f4f6f9;
  padding: 3px;
`;

const StyledModeBoxBody = styled.div<{
   minimize?: boolean;
   maximize?: boolean;
   resized?: { width?: number; height?: number }
}>`
  padding: 5px;
  display: ${props => (props.minimize ? "none" : "block")};
  overflow-y: auto;
  flex: 1;
  width: auto;
  margin-bottom: 5px;
  ${props => {
    if (props.maximize) {
        return css`
        height: 100%
      `;
    }
    if (props.resized?.height) {
        return css`
          height: ${`${props.resized.height}px`};
        `;
    }
    return css`
      height: inherit;
    `;
  }}
`;