// TaskItems.jsx

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
    return (
      <div className="flex justify-between items-center bg-white p-3 border rounded shadow-sm">
        <span className={`flex-1 ${task.completed ? 'line-through text-gray-400' : ''}`}>
          {task.title}
        </span>
        <div className="flex gap-2">
          <button onClick={onToggle} className="text-green-600 hover:underline" title="Terminer">
            ✅
          </button>
          <button onClick={onEdit} className="text-yellow-600 hover:underline" title="Modifier">
            ✏️
          </button>
          <button onClick={onDelete} className="text-red-600 hover:underline" title="Supprimer">
            🗑️
          </button>
        </div>
      </div>
    );
  };
  
  export default TaskItem;
  