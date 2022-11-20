import {ComponentClass, createElement, FunctionComponent} from "react";
import styled from "styled-components";

interface InjectorProps<T> {
    InjectTarget: FunctionComponent<any> | ComponentClass<T, any>;
    injectProps: T[];
    flexDirection?: string;
}

function Injector<T>(props: InjectorProps<T>) {
    return (
        <StyledInjector>
            {Array.isArray(props.injectProps) &&
                (props.injectProps as T[]).map((item: T, index: number) =>
                    createElement(props.InjectTarget, {
                        ...(item as T),
                        key: `injector-${index.toString()}`
                    })
                )}
        </StyledInjector>
    )
}

export default Injector;

const StyledInjector = styled.div<{flexDirection ?: string}>`
    display: flex;
    flex-direction: ${props => props.flexDirection || "initial"}   
`;