import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { TodoProvider, useTodo } from "./Contexts/TodoContext";
import Todo from "./components/Todo";
import History from "./components/History";
import { useEffect } from "react";

// ✅ Layout wrapper to refresh on tab switch
function Layout({ children }) {
  const { processTodos } = useTodo();
  const location = useLocation();

  useEffect(() => {
    processTodos();
  }, [location]);

  return <>{children}</>;
}

function App() {
  return (
    <TodoProvider>
      <Router>
        <div className="bg-[#172842] min-h-screen py-6 px-4">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white bg-[#1e355c]">
            <h1 className="text-2xl font-bold text-center mb-6">
              Manage Your Todos
            </h1>

            {/* Nav links */}
            <div className="flex gap-6 justify-center mb-6">
              <Link to="/todos" className="text-green-400 hover:text-green-200">To-Do List</Link>
              <Link to="/history" className="text-blue-400 hover:text-blue-200">History</Link>
            </div>

            {/* Routes */}
            <Layout>
              <Routes>
                <Route path="/todos" element={<Todo />} />
                <Route path="/history" element={<History />} />
                <Route path="*" element={<Todo />} />
              </Routes>
            </Layout>
          </div>
        </div>
      </Router>
    </TodoProvider>
  );
}

export default App;
