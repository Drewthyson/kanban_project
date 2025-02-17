"use client";

import photo from "@/app/images/photo.png";
import { useEffect, useState } from "react";

const KanbanCard = () => {
  const handleDragStart = (e, cardId) => {
    e.dataTransfer.setData("cardId", cardId); // Armazena o ID do card sendo arrastado
  };

  const handleDrop = (e, columnTitle) => {
    const cardId = Number(e.dataTransfer.getData("cardId"));
    const sourceColumn = Object.keys(columns).find((col) =>
      columns[col].some((card) => card.id === cardId)
    );

    if (sourceColumn) {
      const updatedSourceCards = columns[sourceColumn].filter(
        (card) => card.id !== cardId
      );
      const updatedTargetCards = [...columns[columnTitle], { id: cardId }];
      setColumns((prevColumns) => ({
        ...prevColumns,
        [sourceColumn]: updatedSourceCards,
        [columnTitle]: updatedTargetCards,
      }));
    }
  };
  return (
    <div
      className="kanban-card flex flex-col gap-2 bg-white rounded-xl p-3 shadow-md"
      draggable="true"
      onDragStart={handleDragStart}
      onDrop={handleDrop}
    >
      <div className="text-white w-fit text-xs py-1 px-2 rounded-xl bg-pink-400">
        <span>Alta prioridade</span>
      </div>

      <p className="card-title">Revisar documento do projeto</p>

      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
              />
            </svg>
            1
          </p>

          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
              />
            </svg>
            1
          </p>
        </div>

        <div className="w-10 h-10">
          <img className="object-cover rounded-full" src={photo.src} />
        </div>
      </div>
    </div>
  );
};

const KanbanColumn = (name) => {
  const [cards, setCards] = useState([]);

  const handleAddCard = () => {
    const newCard = { id: Date.now() };
    setCards([...cards, newCard]);
  };
  return (
    <div
      className="columns-1 flex flex-col gap-5 h-full overflow-y-auto bg-slate-100 rounded-xl shadow-lg p-3 overflow-hidden relative min-w-64
        after:absolute after:h-1 after:w-full after:top-0 after:left-0 after:bg-gray-800 text-gray-600"
    >
      <div className="text-lg text-gray-600 font-semibold">
        <h2>{name}</h2>

        <button
          className="text-gray-600 text-xl bg-transparent cursor-pointer border-none"
          onClick={handleAddCard}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
      <div className="kanban-cards flex flex-col gap-2 h-full overflow-y-auto overflow-x-hidden rounded-xl">
        {cards.map((card) => (
          <KanbanCard key={card.id} />
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  useEffect(() => {
    document.querySelectorAll(".kanban-card").forEach((card) => {
      card.addEventListener("dragstart", (e) => {
        e.currentTarget.classList.add("dragging");
      });

      card.addEventListener("dragend", (e) => {
        e.currentTarget.classList.remove("dragging");
      });
    });

    document.querySelectorAll(".kanban-cards").forEach((column) => {
      column.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.currentTarget.classList.add("cards-hover");
      });

      column.addEventListener("dragleave", (e) => {
        e.currentTarget.classList.remove("cards-hover");
      });

      column.addEventListener("drop", (e) => {
        e.currentTarget.classList.remove("cards-hover");
      });
    });
  }, []);
  return (
    <div className="font-[family-name:var(--font-geist-sans)] m-0 p-0 box-border min-h-screen flex justify-center items-center">
      <main className="flex gap-4 p-6 w-full h-screen overflow-x-auto">
        {/* COLUMN 1 */}
        {KanbanColumn("Pendente")}

        {/* COLUMN 2 */}
        {KanbanColumn("a fazer")}

        {/* COLUMN 3 */}
        {KanbanColumn("Pronto")}
      </main>
    </div>
  );
}
