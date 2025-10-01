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
    <form onSubmit={add} className="flex w-full">
      <input
        type="text"
        placeholder="Write Todo..."
        className="flex-1 border border-black/10 rounded-l-lg px-3 outline-none bg-white text-black py-1.5"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white hover:bg-green-700"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
