import { useEffect, useState } from "react"
import { TodoForm } from "./TodoForm"
import "./styles.css"
import { TodoList } from "./TodoList"

export  default function App() {

  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if(localValue === null) return []
    return JSON.parse(localValue)
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos)), 
    [todos]
  });

  function addTodo(title) {
    setTodos(currentTodo => {
      return [
        ...currentTodo, 
      {id:crypto.randomUUID(), title, completed:false}
      ]
    })
  };
  
  function toggleTodo(id, completed){
    setTodos(currentTodo => {
      return currentTodo.map(todo => {
          if (todo.id === id)
          {
            return {...todo, completed}
          }

          return todo
        })
      
    })
  };

  function deleteTodo(id){
    setTodos(currentTodo =>{
      return currentTodo.filter(todo => todo.id !==id)
    })
  };



  return (
    <>
    <TodoForm addTodo={addTodo}/>
    <h1 className='header'>To Do Items</h1>
    <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </>
  )
}
