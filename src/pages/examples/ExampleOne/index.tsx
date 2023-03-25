import {Routes, Route} from "react-router-dom";
import ExampleOne from "./ExampleOne";

function ExamplePage() {
    return (
        <Routes>
            <Route path="/" element={ExampleOne()} />
        </Routes>
    )
}

export default ExamplePage;