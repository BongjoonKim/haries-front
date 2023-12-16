import {ChangeEvent, ForwardedRef, forwardRef, InputHTMLAttributes, useCallback, useState} from "react";
import {message} from "../../../types/form";
import {currentStatus} from "../../../constants/types/status.const";
import styled from "styled-components";
import converter from "../../../utilities/converter";
import FieldMessage from "../FieldMessage";
import {KeyboardEvent, FocusEvent} from "react";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    // value?: string | number | readonly string[] | undefined;
    checked?: boolean;
    id?: string;
    label?: string;
    message?: message<currentStatus>;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onReset?: () => void;
    onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
    className?: string;
    status?: currentStatus;
    filter?: RegExp;
    actionType?: string;
    actionOptions?: string;
    width?: string | number;
    height?: string | number;
    names?: string[];
    flex?: string | number;
    title?: string;
    hasSearched?: boolean;
    isLoading?: boolean;
    value?: string | number | readonly string[] | undefined;
}

export default forwardRef((props: TextInputProps, ref: ForwardedRef<HTMLInputElement> | any) => {
    const [value, setValue] = useState<string | number | readonly string[] | undefined>(props.value || "");
    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        if (props.filter) {
            event.target.value = String(event.target.value)?.replace?.(props.filter, "");
        }
        console.log("제목 값 확인", event.target.value)
        props.onChange?.(event);
        setValue(() => event.target.value)
    }, [value]);
    
    return (
        <StyledInput title={props.title} width={props.width} flex={props.flex}>
            {props.label && props.id && (
                <label className="input-label" htmlFor={props.id}>
                    {props.label}
                </label>
            )}
            <input
                style={{backgroundColor: props.hasSearched ? "#e7f3ff" : ""}}
                ref={ref}
                type={props.type}
                id={props.id}
                // value={value}
                value={props.value ? props.value : value}
                data-type={props.actionType}
                data-option={props.actionOptions}
                data-names={props.names}
                checked={props.checked}
                name={props.name}
                onChange={props.onChange ? props.onChange : handleChange}
                // onChange={props.onChange}
                onKeyPress={props.onKeyPress}
                autoComplete={props.autoComplete}
                maxLength={props.maxLength}
                onKeyDown={props.onKeyDown}
                onReset={props.onReset}
                onPaste={props.onPaste}
                inputMode={props.inputMode}
                readOnly={props.readOnly}
                disabled={props.disabled}
                placeholder={props.placeholder}
                title={props.title}
                onBlur={(event: FocusEvent<HTMLInputElement, Element>) => {
                    props.onBlur?.(event);
                }}
                onFocus={(event: FocusEvent<HTMLInputElement, Element>) => {
                    props.onFocus?.(event);
                }}
                className={converter.classNames(["input-text", props.status, props.className])}
                required={props.required}
                pattern={props.pattern}
                />
                <FieldMessage<currentStatus> message={props.message} status={props.status} />
        </StyledInput>
    )
})

const StyledInput = styled.div<{
        height?: string | number;
        width?: string | number;
        flex?: string | number;
}>`
  width: ${props => props.width ?? "initial"};
  height: ${props => props.height ?? "initial"};
  position: relative;
  margin: 0 2px;
  display: flex;

  .input-text {
    height: 28px;
    width: ${props => {return props.width ?? "100%";
    }}
    padding: 4px 8px;
    border: 1px solid #c8c8c8;
    border-radius: 4px;
    transition-duration: 0.3s;
    outline: 0;
    margin: 0;
    flex: 1;
    box-sizing: border-box;
    font-size: 12px;

    &:focus {
      transition-duration: 0.2s;
      border-color: #b7d2e7;
    }
  }
  input::-ms-clear,
  input::-ms-reveal {
    display: none;
  }
  input::-webkit-search-decoration,
  input::-webkit-search-cancel-button,
  input::-webkit-search-results-button,
  input::-webkit-search-results-decoration {
    display: none;
}
`;