import { useEffect, useState } from "react";
import { useTodo } from "../Contexts/TodoContext";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

function Todo() {
  const { todos } = useTodo();
  const [showMsg, setShowMsg] = useState(true);

  // Hide message after 30s
  useEffect(() => {
    const timer = setTimeout(() => setShowMsg(false), 30000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="mb-4">
        <TodoForm />
      </div>

      {/* Info message */}
      {showMsg && (
        <div className="mb-4 text-sm text-blue-800 bg-blue-200 px-3 py-2 rounded border border-blue-300">
          Note: If you check a task, it will automatically move to History after 5 minutes.
        </div>
      )}

      {/* Todo list */}
      <div className="flex flex-col gap-3">
        {todos.length === 0 && (
          <p className="text-center text-gray-500">No todos yet</p>
        )}
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </>
  );
}

export default Todo;
