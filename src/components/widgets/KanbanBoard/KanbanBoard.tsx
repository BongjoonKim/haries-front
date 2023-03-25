import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

interface KanbanProps {
  items : Kanban.Items;
  setItems: (items: Kanban.Items) => void;
}

function KanbanBoard(props : KanbanProps) {
  
  const onDragEnd = ({source, destination}: DropResult) => {
    if (!destination) return;
  }
    
    return (
      <>
        안녕
      </>
    )
}

export default KanbanBoard;