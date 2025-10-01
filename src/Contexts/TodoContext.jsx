import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const TodoContext = createContext();
export const useTodo = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [history, setHistory] = useState([]);

  // ✅ Fetch initial todos
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((res) => {
        const mapped = res.data.map((t) => ({
          id: t.id,
          todo: t.title,
          completed: t.completed,
          completedAt: null,
        }));

        mapped.map((task)=>{
            if(task.completed){
                task.completedAt=Date.now();
            }
        })

        setTodos(mapped);

        
      });
  }, []);

  // ✅ Background sweep every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      processTodos();
    }, 30000);
    return () => clearInterval(interval);
  }, [todos]);

  const processTodos = () => {
    const now = Date.now();
    const expired = todos.filter(
      (t) => t.completed && t.completedAt && now - t.completedAt >= 1 * 60 * 1000
    );

    if (expired.length > 0) {
      setTodos((prev) => prev.filter((t) => !expired.includes(t)));
      setHistory((prev) => [...prev, ...expired]);
    }
  };

  const addTodo = (todo) => {
    setTodos([{ id: Date.now(), ...todo, completedAt: null }, ...todos]);
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
              completedAt: !t.completed ? Date.now() : null,
            }
          : t
      )
    );
  };

  const deleteHistory = (id) => {
    setHistory(history.filter((t) => t.id !== id));
  };

  const markIncomplete = (id) => {
    const task = history.find((t) => t.id === id);
    if (task) {
      setHistory(history.filter((t) => t.id !== id));
      setTodos([...todos, { ...task, completed: false, completedAt: null }]);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        history,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleComplete,
        deleteHistory,
        markIncomplete,
        processTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
