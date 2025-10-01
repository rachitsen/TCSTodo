import { useTodo } from "../Contexts/TodoContext";

function History() {
  const { history, deleteHistory, markIncomplete } = useTodo();

  return (
    <div className="flex flex-col gap-3">
      {history.length === 0 && (
        <p className="text-center text-gray-500">No completed tasks yet</p>
      )}
      {history.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between p-3 rounded-lg border bg-green-200"
        >
          <span className=" text-gray-600 flex-1">{todo.todo}</span>
          <div className="flex gap-2">
            <button
              onClick={() => markIncomplete(todo.id)}
              className="px-2 py-1 bg-green-400 text-white rounded-lg hover:bg-green-500"
            >
              Incomplete
            </button>
            <button
              onClick={() => deleteHistory(todo.id)}
              className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
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
