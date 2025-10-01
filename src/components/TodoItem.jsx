import { useState } from "react";
import { useTodo } from "../Contexts/TodoContext";

function TodoItem({ todo }) {
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const [isTodoEditable, setIsTodoEditable] = useState(false);

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  return (
    <div
      className={`flex items-center justify-between border border-black/10 rounded-lg px-3 py-2 
        shadow-sm duration-300 text-black 
        ${todo.completed ? "bg-green-100" : "bg-purple-100"}`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
        className="cursor-pointer"
      />

      <input
        type="text"
        className={`flex-1 mx-2 outline-none bg-transparent 
          ${isTodoEditable ? "border px-2 rounded" : "border-transparent"} 
          ${todo.completed ? "line-through text-gray-600" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />

      <button
        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => {
          if (todo.completed) return;
          if (isTodoEditable) {
            editTodo();
          } else {
            setIsTodoEditable(true);
          }
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "Save" : "Edit"}
      </button>

      <button
        className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 ml-2"
        onClick={() => deleteTodo(todo.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
