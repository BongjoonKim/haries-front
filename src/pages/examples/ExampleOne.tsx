import MainContent from "../../components/templates/MainContent/MainContent";
import {Dialog, ModeTypes} from "../../components/modules/Mode";
import exampleTwo from "./ExampleTwo";
import useMode from "../../hooks/ui/useMode";
import Button from "../../components/elements/Button/Button";
import useExampleOne from "./useExampleOne";

function ExampleOne() {
    const {getModeProps : getLocalModeProps, handleShowMode, handleCloseMode} = useMode();
    const data = useExampleOne();
    
    return (
        <MainContent
            title="test"
        >
            <MainContent.Section mainContentTheme="light" id="test">
                <span>안녕</span>
                <Button onClick={() => handleShowMode("TEST")} />
                <Dialog type={ModeTypes.MODELESS} name="TEST" children={exampleTwo()} {...getLocalModeProps()} />

            </MainContent.Section>
        </MainContent>

    )
}

export default ExampleOne;