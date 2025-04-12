import TaskItem from './TaskItems';

const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  console.log(tasks);
  if (!tasks.length) {
    return <p className="text-center text-gray-500">Aucune tâche pour l'instant.</p>;
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggle(task.id)}
          onDelete={() => onDelete(task.id)}
          onEdit={() => onEdit(task)}
        />
      ))}
    </div>
  );
};

export default TaskList;
// TaskList.jsx