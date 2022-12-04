import {createElement} from "react";
import {ModeRouterComponent} from "../../../../types/mode";
import {ModeTypes} from "./generate";

function ModeRoute<T = ModeTypes, N = string>({
    component,
    name,
    title,
    type,
}: ModeRouterComponent.ModeRouteProps) {
    return createElement(component);
}

export default ModeRoute;