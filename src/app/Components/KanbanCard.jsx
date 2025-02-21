import photo from "@/app/images/photo.png";
import CommentIcon from "../icons/commentIcon";
import ClipIcon from "../icons/clipIcon";
import DeleteIcon from "../icons/deleteIcon";

const KanbanCard = ({ id, onRemove, onMove, columnId}) => {
  return (
    <div
      className="kanban-card flex flex-col gap-2 bg-white rounded-xl p-3 shadow-md"
      draggable
    >
      <div className="flex place-content-between">
        <p contentEditable="true" suppressContentEditableWarning={true} className="card-title w-24 ">
          card 1
        </p>
        <button onClick={() => onRemove(id)}>
          <DeleteIcon />
        </button>
      </div>

      <div className="text-white w-fit text-xs py-1 px-2 rounded-xl bg-pink-400">
        <span contentEditable="true" suppressContentEditableWarning={true}>nomedocliente</span>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <CommentIcon />
          <p>1</p>

          <ClipIcon />
          <p>1</p>
        </div>

        <div className="w-10 h-10">
          <img className="object-cover rounded-full" src={photo.src} />
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;
