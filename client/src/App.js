import * as React from 'react';
import Button from '@mui/material/Button';
import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [inputValue, setInput] = useState('')
  const [pendingTask, setPendingTask] = useState([])
  const [inProgress, setInProgress] = useState([])
  const [completed, setCompleted] = useState([])
  const [count, setCount] = useState(0)

  useEffect(()=> {
    fetch('http://localhost:3001/api/pending/')
    .then((resp) => resp.json())
    .then((resp) => setPendingTask(resp))
    .catch((error) => console.log(error));
    
    fetch('http://localhost:3001/api/inprogress/')
    .then((resp) => resp.json())
    .then((resp) => setInProgress(resp))
    .catch((error) => console.log(error));
    
    fetch('http://localhost:3001/api/getcompleted/')
    .then((resp) => resp.json())
    .then((resp) => setCompleted(resp))
    .catch((error) => console.log(error));
  },[count]);
  

  const addTask = () =>{
    fetch('http://localhost:3001/api/addpending/', {
      method: "POST",
      headers: {"Content-Type": "application/JSON"},
      body: JSON.stringify({inputValue})
    })
    setCount(count+1)
  }

  const deleteTask = (id) =>{
    fetch('http://localhost:3001/api/deletetask/', {
      method: "POST",
      headers: {"Content-Type": "application/JSON"},
      body: JSON.stringify({id}) 
    })
    setCount(count+1)
  }

  const setTaskInProgress = (id) =>{
    fetch('http://localhost:3001/api/setinprogress/', {
      method: "POST",
      headers: {"Content-Type": "application/JSON"},
      body: JSON.stringify({id}) 
    })
    setCount(count+1)
  }

  const deleteinprogress = (id) =>{
    fetch('http://localhost:3001/api/deleteinprogresstask/', {
      method: "POST",
      headers: {"Content-Type": "application/JSON"},
      body: JSON.stringify({id}) 
    })
    setCount(count+1)
  }

  const deletecompleted = (id) =>{
    fetch('http://localhost:3001/api/deletecompletedtask/', {
      method: "POST",
      headers: {"Content-Type": "application/JSON"},
      body: JSON.stringify({id}) 
    })
    setCount(count+1)
  }

  const setTaskCompleted = (id) =>{
    fetch('http://localhost:3001/api/setcompleted/', {
      method: "POST",
      headers: {"Content-Type": "application/JSON"},
      body: JSON.stringify({id}) 
    })
    setCount(count+1)
  }

  return (
    <div className="App">
      Project Management<br></br><br></br>
      <input type="text" onChange={(e)=>setInput(e.target.value)} />
      <Button variant="contained" onClick={(e)=>addTask()}>Add a task</Button>
        <br></br><br></br>
      Pending Tasks:<br></br>  <br></br>{pendingTask.map((val)=>{
        return <div>
          {val.tasks} &nbsp;&nbsp;&nbsp; <Button variant="contained" onClick={(e)=>deleteTask(val.id)}>Delete</Button>
          &nbsp;&nbsp;&nbsp; <Button variant="contained" onClick={(e)=>setTaskInProgress(val.id)}>Set Task In Progress</Button>
          <br></br>
          <br></br>
          </div>
      })}

        In Progress Tasks:<br></br>  <br></br>
        {inProgress.map((val)=>{
        return <div>
          {val.tasks}  &nbsp;&nbsp;&nbsp; <Button variant="contained" onClick={(e)=>deleteinprogress(val.id)}>Delete</Button>
          &nbsp;&nbsp;&nbsp; <Button variant="contained" onClick={(e)=>setTaskCompleted(val.id)}>Set Task Completed</Button>
          <br></br>
          <br></br>
          </div>
      })}

        Completed Tasks:<br></br>  <br></br>
        {completed.map((val)=>{
        return <div>
          {val.tasks}  &nbsp;&nbsp;&nbsp; <Button variant="contained" onClick={(e)=>deletecompleted(val.id)}>Delete</Button>
          <br></br>
          <br></br>
          </div>
      })}
    </div>
  );
}

export default App;
