"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import PlusIcon from "./icons/plusIcon";
import KanbanCard from "./Components/KanbanCard";

const KanbanColumn = ({ name, columnId, cards, onAddCard, onRemoveCard, onDragEnd }) => {
  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="columns-1 flex flex-col gap-5 h-full overflow-y-auto bg-slate-100 rounded-xl shadow-lg p-3 overflow-hidden relative min-w-64
            after:absolute after:h-1 after:w-full after:top-0 after:left-0 after:bg-gray-800 text-gray-600"
        >
          <div className="text-lg text-gray-600 font-semibold">
            <h2>{name}</h2>

            <button
              className="text-gray-600 text-xl bg-transparent cursor-pointer border-none"
              onClick={onAddCard}
            >
              <PlusIcon />
            </button>
          </div>
          <div className="kanban-cards flex flex-col gap-2 h-full overflow-y-auto overflow-x-hidden rounded-xl">
            {cards.map((card, index) => (
              <Draggable key={card.id} draggableId={card.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <KanbanCard key={card.id} id={card.id} onRemove={onRemoveCard} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState({
    "column-1": { id: "column-1", name: "Pendente", cards: [] },
    "column-2": { id: "column-2", name: "Em progresso", cards: [] },
    "column-3": { id: "column-3", name: "Pronto", cards: [] },
  });

  const handleAddCard = (columnId) => {
    const newCard = { id: Date.now() };
    setColumns((prevColumns) => ({
      ...prevColumns,
      [columnId]: {
        ...prevColumns[columnId],
        cards: [...prevColumns[columnId].cards, newCard],
      },
    }));
  };

  const handleRemoveCard = (columnId, cardId) => {
    setColumns((prevColumns) => ({
      ...prevColumns,
      [columnId]: {
        ...prevColumns[columnId],
        cards: prevColumns[columnId].cards.filter((card) => card.id !== cardId),
      },
    }));
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = columns[source.droppableId];
    const finishColumn = columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newCards = Array.from(startColumn.cards);
      newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, startColumn.cards[source.index]);

      const newColumn = {
        ...startColumn,
        cards: newCards,
      };

      setColumns((prevColumns) => ({
        ...prevColumns,
        [newColumn.id]: newColumn,
      }));
    } else {
      const startCards = Array.from(startColumn.cards);
      startCards.splice(source.index, 1);
      const newStartColumn = {
        ...startColumn,
        cards: startCards,
      };

      const finishCards = Array.from(finishColumn.cards);
      finishCards.splice(destination.index, 0, startColumn.cards[source.index]);
      const newFinishColumn = {
        ...finishColumn,
        cards: finishCards,
      };

      setColumns((prevColumns) => ({
        ...prevColumns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="font-[family-name:var(--font-geist-sans)] m-0 p-0 box-border min-h-screen flex justify-center items-center">
        <main className="flex gap-4 p-6 w-full h-screen overflow-x-auto">
          {Object.values(columns).map((column) => (
            <KanbanColumn
              key={column.id}
              columnId={column.id}
              name={column.name}
              cards={column.cards}
              onAddCard={() => handleAddCard(column.id)}
              onRemoveCard={(cardId) => handleRemoveCard(column.id, cardId)}
            />
          ))}
        </main>
      </div>
    </DragDropContext>
  );
}