import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const TodoContext = createContext();
export const useTodo = () => useContext(TodoContext); 

export const TodoProvider = ({ children }) => {

  const [todos, setTodos] = useState([]);
  const [history, setHistory] = useState([]);


  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((res) => {
        const mapped = res.data.map((task) => ({
          id: task.id,
          todo: task.title,
          completed: task.completed,
          completedAt: task.completed ? Date.now() : null,
        }));

        setTodos(mapped);
        
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      processTodos();
    }, 30000);
    return () => clearInterval(interval);
  }, [todos]);

  const processTodos = () => {
    const now = Date.now();
    const expired = todos.filter(
      (task) => task.completed && task.completedAt && now - task.completedAt >= 5 * 60 * 1000
    );

    if (expired.length > 0) {
      setTodos((prev) => prev.filter((task) => !expired.includes(task)));
      setHistory((prev) => [...prev, ...expired]);
    }
  };

  const addTodo = (todo) => {
    setTodos([{ id: Date.now(), ...todo, completedAt: null }, ...todos]);
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos(todos.map((task) => (task.id === id ? updatedTodo : task)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((task) =>
        task.id === id
          ? {
              ...task,
              completedAt: !task.completed ? Date.now() : null,
              completed: !task.completed,
              
            }
          : task
      )
    );
  };

  const deleteHistory = (id) => {
    setHistory(history.filter((task) => task.id !== id));
  };

  const markIncomplete = (id) => {
    const newtask = history.find((task) => task.id === id);
    if (newtask) {
      setHistory(history.filter((task) => task.id !== id));
      setTodos([...todos, { ...newtask, completed: false, completedAt: null }]);
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

