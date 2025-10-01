import { useTodo } from "../Contexts/TodoContext";

function History() {
  const { history, deleteHistory, markIncomplete } = useTodo();

  return (
    <div className="flex flex-col gap-y-3">
      {history.length === 0 && <p className="text-center text-gray-300">No completed tasks yet</p>}
      {history.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between border border-black/10 rounded-lg px-3 py-2 
            shadow-sm bg-green-200 text-black"
        >
          <span className="flex-1">{todo.todo}</span>
          <div className="flex gap-2">
            <button
              onClick={() => markIncomplete(todo.id)}
              className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Incomplete
            </button>
            <button
              onClick={() => deleteHistory(todo.id)}
              className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default History;
