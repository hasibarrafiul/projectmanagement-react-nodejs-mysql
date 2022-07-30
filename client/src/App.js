import * as React from 'react';
import Button from '@mui/material/Button';
import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [inputValue, setInput] = useState('')
  const [pendingTask, setPendingTask] = useState([])
  const [inProgress, setInProgress] = useState([])
  const [completed, setCompleted] = useState([])

  useEffect(()=> {
    getPendingTask();
    getInProgressTask();
  },[pendingTask]);

  const getPendingTask = () =>{
    fetch('http://localhost:3001/api/pending/')
    .then((resp) => resp.json())
    .then((resp) => setPendingTask(resp))
    .catch((error) => console.log(error));
  }

  const getInProgressTask = () =>{
    fetch('http://localhost:3001/api/inprogress/')
    .then((resp) => resp.json())
    .then((resp) => setInProgress(resp))
    .catch((error) => console.log(error));
  }
  

  const addTask = () =>{
    fetch('http://localhost:3001/api/addpending/', {
      method: "POST",
      headers: {"Content-Type": "application/JSON"},
      body: JSON.stringify({inputValue}) 
    })
    getPendingTask()
    
  }

  const deleteTask = (id) =>{
    fetch('http://localhost:3001/api/deletetask/', {
      method: "POST",
      headers: {"Content-Type": "application/JSON"},
      body: JSON.stringify({id}) 
    })
    getPendingTask()
  }

  const setTaskInProgress = (id) =>{
    fetch('http://localhost:3001/api/setinprogress/', {
      method: "POST",
      headers: {"Content-Type": "application/JSON"},
      body: JSON.stringify({id}) 
    })
    getPendingTask()
    getInProgressTask()
  }

  const deleteinprogress = (id) =>{
    fetch('http://localhost:3001/api/deleteinprogresstask/', {
      method: "POST",
      headers: {"Content-Type": "application/JSON"},
      body: JSON.stringify({id}) 
    })
    getInProgressTask()
  }

  return (
    <div className="App">
      Project Management<br></br><br></br>
      <input type="text" onChange={(e)=>setInput(e.target.value)} />
      <button onClick={(e)=>addTask()}>Add a task</button>
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
          <br></br>
          <br></br>
          </div>
      })}
    </div>
  );
}

export default App;
