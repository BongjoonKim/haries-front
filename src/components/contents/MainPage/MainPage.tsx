import React, {useState} from "react";
import Button from "../../elements/Button/BasicButton";

function MainPage() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    return (
        <div className="container">
            <div className="content-section"><h1>Cafeteria &amp; Office Catering Solutions Employees LOVE</h1>
                <div className="description"> Corporate catering and cafeteria solutions customized to your employees’ unique
                    tastes while delivering the flexibility and consistency large enterprises expect.
                    <Button onClick={() => setModalIsOpen(true)}>
                        Get Started Now
                    </Button>
                    <Button >
                        안녕
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default MainPage;