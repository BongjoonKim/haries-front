import MainContent from "../../../components/templates/MainContent/MainContent";
import {Dialog, ModeTypes} from "../../../components/modules/Mode";
import exampleTwo from "../ExampleTwo";
import useMode from "../../../hooks/ui/useMode";
import {useState} from "react";
import KanbanBoard from "../../../components/widgets/KanbanBoard";
import {Button} from "@mui/material";
import useExampleOne from "./useExampleOne";
import {useNavigate} from "react-router-dom";

function ExampleOne() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Kanban.Items>({
    todo: [...Array(5)].map((_, inx) => ({
      id: `${inx}${inx}`,
      titles: `Title ${inx + 1}000`,
      status: 'todo',
      index: inx,
      contents : `contents ${inx + 1}000`
    })),
    doing: []
  })
  const {threeOnClick} = useExampleOne();
  return (
    <>
      <Button onClick={threeOnClick}>two</Button>
      <Button>three</Button>
      <div className="min-h-[780px]">
        <KanbanBoard items={items} setItems={setItems} />
      </div>
    </>
  )
}

export default ExampleOne;