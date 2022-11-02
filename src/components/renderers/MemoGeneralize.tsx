import {memo, ComponentType, ComponentProps} from "react";

type PropsComparator<C extends ComponentType> = (
    prevProps : Readonly<ComponentProps<C>>,
    nextProps : Readonly<ComponentProps<C>>
) => boolean;

function MemoGeneralize<C extends ComponentType<any>>(
    Component : C,
    propsComparator ?: PropsComparator<C>,
) {
    return memo(Component, propsComparator) as any as C;
}

export default MemoGeneralize;