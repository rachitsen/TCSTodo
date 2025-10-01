import { useState } from "react";
import { useTodo } from "../Contexts/TodoContext";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!todo.trim()) return;
    addTodo({ todo, completed: false });
    setTodo("");
  };

  return (
    <form onSubmit={add} className="flex gap-2 w-full">
      <input
        type="text"
        placeholder="Write Todo..."
        className="flex-1 border rounded-lg px-3 py-2 outline-none text-blue-900"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
