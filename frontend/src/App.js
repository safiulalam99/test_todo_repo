// eslint-disable-next-line
import React from 'react';
import {useState, useEffect} from 'react';
import './App.css';
const api= "http://localhost:8000";

function App() {
    const [todos, setTodos]= useState([]);
    const [rans, rantodo]= useState([]);
    const [popupActive, setPopupActive]= useState(false);
    const[newTodo, setNewTodo]=useState("");
    
    useEffect (()=>{
        getTodos();
        //getRandom();
    },[])

    const getRandom = ()=>{
        fetch(api+"/api/v1/task/random")
        .then(res => res.json())
        .then(data=>setTodos(data))
        .catch(err => console.error("Error is",err));
        }

    const getTodos = ()=>{
        fetch(api+"/api/todo")
        .then(res => res.json())
        .then(data=>setTodos(data))
        .catch(err => console.error("Error is",err));
        }
    

const completeTodo= async id=>{
    const data = await fetch(api+"/api/todo/comp/"+id)
    .then(res=>res.json());
    setTodos(todos=>todos.map(todo=>{
        if(todo._id===data._id){
            todo.complete=data.complete;
        }
        return todo;
    }));
}

const deleteTodo =async id=> {
    const data = await fetch(api+"/api/todo/delete/"+id,{
        method:"DELETE"
    }).then(res=>res.json());
        setTodos(todos=> todos.filter(todo =>todo._id !== data._id));

}

const addTodo=async()=>{
    const data = await fetch (api+"/api/todo/post",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({text:newTodo})
    }).then(res=>res.json());
   setTodos([...todos,data]);
   setPopupActive(false);
   setNewTodo("");
}

const ranAdd=async()=>{
    const data = await fetch (api+"/api/todo/post",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({text:newTodo})
       // body:JSON.stringify({"userName": userName})
    }).then(res=>res.json());
   setTodos([...todos,data]);
   setPopupActive(false);
   setNewTodo("");
}


  return (
    <div className="App">
      <h1>Welcome </h1>
      <h4>Your tasks</h4>
      <div className="todos">
          {todos.map(todo=>(
            <div className={"todo "+ (todo.complete ? "is-complete" : "")
            } key={todo._id}onClick={()=> completeTodo(todo._id)}>
              <div className="checkbox"></div>
                  <div className="text">{todo.text}</div>
                  <div className="delete-todo" onClick={()=>deleteTodo
                (todo._id)}>x</div>
              </div>
         
          ))}               
      </div>
      <div className ="addPopup" onClick={()=> setPopupActive(true)}>+</div>
      {popupActive ? (
          <div className = "popup">
               <div className ="closePopup" onClick={()=> setPopupActive(false)}>+</div>
               <div className = "content">
                   <h3>Add Task</h3>
                   {newTodo}
                   <input type="text" className="add-todo-input"
                   onChange={e=>setNewTodo(e.target.value)}
                   value={newTodo}/>
                   <div className ="button" onClick = {addTodo}>Create Task</div>
               </div>
                   
              </div>
      ):''}
    </div>
  );
}

export default App;
