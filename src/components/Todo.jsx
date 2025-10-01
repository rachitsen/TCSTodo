import { useTodo } from "../Contexts/TodoContext"; // custum hook
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

function Todo() {
  const { todos } = useTodo();

  return (
    <>
      <div className="mb-4">
        <TodoForm />
      </div>
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
