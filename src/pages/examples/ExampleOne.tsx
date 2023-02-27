import MainContent from "../../components/templates/MainContent/MainContent";
import {Dialog, ModeTypes} from "../../components/modules/Mode";
import exampleTwo from "./ExampleTwo";
import useMode from "../../hooks/ui/useMode";
import Button from "../../components/elements/Button/CustomButton";
import useExampleOne from "./useExampleOne";

function ExampleOne() {
    const {getModeProps : getLocalModeProps, handleShowMode, handleCloseMode} = useMode();
    const data = useExampleOne();
    
    return (
        // <MainContent
        //     title=""
        // >
        //     <MainContent.Section mainContentTheme="light" id="test">
        //     </MainContent.Section>
        //
        // </MainContent>
    <img src={`${process.env.PUBLIC_URL}/mainPage.jpeg`} width={"100px"} style={{top: 1000}}/>
    )
}

export default ExampleOne;