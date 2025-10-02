import { useState } from "react";
import { useTodo } from "../Contexts/TodoContext";

function TodoItem({ todo }) {
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const [isTodoEditable, setIsTodoEditable] = useState(false);

 

  return (
    <div
      className={`flex flex-col gap-2 border 
        border-black/10 rounded-lg px-3 py-2 shadow-sm duration-300 text-black sm:flex-row sm:items-center sm:justify-between 
        ${todo.completed ? "bg-green-200" : "bg-blue-100"}`}
    >
      
      <div className="flex items-center flex-1">
        <div className="relative group">
  <input
    type="checkbox"
    checked={todo.completed}
    onChange={() => toggleComplete(todo.id)}
    className="cursor-pointer"
  />

</div>
        <input
          type="text"
          className={`flex-1 mx-2 outline-none bg-transparent text-sm sm:text-base
            ${isTodoEditable ? "border px-2 rounded" : "border-transparent"}
            ${todo.completed ? "line-through text-gray-600" : ""}`}
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          readOnly={!isTodoEditable}
        />
      </div>

     
      <div className="flex gap-2 shrink-0">
        <button
          className="px-3 py-2 text-sm sm:text-base bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => {
            if (todo.completed) return;
            if (isTodoEditable) {
              updateTodo(todo.id, { ...todo, todo: todoMsg });
              setIsTodoEditable(false);
            } else {
              setIsTodoEditable(true);
            }
          }}
          disabled={todo.completed}
        >
          {isTodoEditable ? "Save" : "Edit"}
        </button>

        <button
          className="px-3 py-2 text-sm sm:text-base bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
