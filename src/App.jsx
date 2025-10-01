import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { TodoProvider } from "./Contexts/TodoContext";
import Todo from "./components/Todo";
import History from "./components/History";

function App() {
  return (
    <TodoProvider>
      <Router>
        <div className="bg-blue-300 py-6 px-4 flex justify-center min-h-screen">
          <div className=" bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
            <h1 className="text-4xl font-bold text-center text-blue-900 mb-6">
              TCS ToDo's
            </h1>

            
            <div className="mb-6 flex gap-6 justify-center">
              <NavLink to="/" className={({isActive}) => (isActive? "bg-blue-300 p-2 text-xl rounded-lg  text-blue-900 hover:no-underline, hover:rounded-none":" border-1 p-2 text-xl rounded-lg no-underline text-blue-900 hover:no-underline, hover:rounded-none")}>
                To-Do List
              </NavLink>
              <NavLink to="/history" className={({isActive}) => (isActive? "bg-blue-300 p-2 text-xl rounded-lg  text-blue-900 hover:no-underline, hover:rounded-none":" border-1 p-2 text-xl rounded-lg no-underline text-blue-900 hover:no-underline, hover:rounded-none")}>
                History
              </NavLink>
            </div>

            
            <Routes>
              <Route path="/" element={<Todo />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </div>
        </div>
      </Router>
    </TodoProvider>
  );
}

export default App;
