import MainContent from "../../components/templates/MainContent/MainContent";
import {MainContentProvider} from "../../components/templates/MainContent/MainContentContext";

function ExampleOne() {
    return (
        <MainContent
            title="test"
        >
            <MainContent.Section>
                <span>테스트 페이지입니다.</span>
            </MainContent.Section>

        </MainContent>

    )
}

export default ExampleOne;