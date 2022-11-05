import {ModeTypes} from "./generate";
import {createElement} from "react";
import {ModeRouterComponent} from "../../../../types/mode";

function ModeRoute<T = ModeTypes, N = string>({
    component,
    name,
    title,
    type
}: ModeRouterComponent.ModeRouteProps<T, N>) {
    return createElement(component, {name, title, type});
}

export default ModeRoute;