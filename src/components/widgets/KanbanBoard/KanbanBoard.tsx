import {DragDropContext, Draggable, Droppable, DropResult} from 'react-beautiful-dnd';
import {useEffect, useState} from "react";
import converter from "../../../utilities/converter";

interface KanbanProps {
  items : Kanban.Items;
  setItems: (items: Kanban.Items) => void;
  
  titles?: string;
}

function KanbanBoard(props : KanbanProps) {
  
  const onDragEnd = ({source, destination}: DropResult) => {
    if (!destination) return;
    
    const sourceKey = source.droppableId as Kanban.Status;
    const destinationKey = destination.droppableId as Kanban.Status;
    
    const _items = JSON.parse(JSON.stringify(props.items)) as typeof props.items;
    const [targetItem] = _items[sourceKey].splice(source.index, 1);
    _items[destinationKey].splice(destination.index, 0, targetItem);
    props.setItems(_items);
  };
  
  const [enabled, setEnabled] = useState<boolean>(false);
  
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    }
  }, []);
  
  if (!enabled) {
    return null;
  }
    
    return (
      <div style={{padding: "1rem"}}>
        <div style={{marginBottom: "0.5rem"}}>
          <span>with react-beautiful-dnd</span>
        </div>
        <div style={{display: "flex", marginTop: "1rem"}}>
          <DragDropContext onDragEnd={onDragEnd}>
            <div
              style={{
                display: "grid",
                flex: "1 1 0%",
                borderRadius: "0.5rem",
                userSelect: "none",
                gridTemplateColumns: `repeat(${Object.keys(props.items).length}, minmax(0, 1fr))`,
                gap: "1rem"
              }}
            >
              {Object.keys(props.items).map((key) => (
                <Droppable key={key} droppableId={key}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        display: "flex",
                        padding: "1rem",
                        backgroundColor: "#E5E7EB",
                        flexDirection: "column",
                        borderRadius: "0.75rem",
                        gap: "0.75rem",
                        transitionProperty: "box-shadow",
                        boxShadow: snapshot.isDraggingOver
                          ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                          : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
                      }}
                    >
                      <span style={{
                        fontSize: "0.75rem",
                        lineHeight: "1rem",
                        fontWeight: "600"
                        }}
                      >
                        {key.toLocaleUpperCase()}
                      </span>
                      {props.items[key as Kanban.Status].map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                padding: "1rem",
                                backgroundColor: "#ffffff",
                                transitionProperty: "box-shadow",
                                borderRadius: "0.5rem",
                                opacity: snapshot.isDragging
                                  ? "0.5"
                                  : "1",
                                boxShadow: snapshot.isDragging
                                  ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                                  : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                                ...provided.draggableProps.style
                              }}
                            >
                              <h5 style={{fontWeight: "600"}}>{item.titles}</h5>
                              <span
                                style={{
                                  color: "#6B7280",
                                  fontSize: "0.875rem",
                                  lineHeight: "1.25rem"
                              }}
                              >
                                {item.contents}
                              </span>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        </div>
      </div>
    )
}

export default KanbanBoard;