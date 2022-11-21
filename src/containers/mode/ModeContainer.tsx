import {ModeRoute, ModeRouter, ModeTypes, useModeContext} from "../../components/modules/Mode";
import GlobalModeNames from "../../constants/modes/global-mode.const";
import ExampleOne from "../../pages/examples/ExampleOne";

export default function ModeContainer() {
    const {getModeRouterProps} = useModeContext();

    return (
        <ModeRouter<ModeTypes, GlobalModeNames> {...getModeRouterProps()}>
            <ModeRoute
                component={ExampleOne}
                name=""
                type={ModeTypes.MODELESS}
            />
        </ModeRouter>
    )

}