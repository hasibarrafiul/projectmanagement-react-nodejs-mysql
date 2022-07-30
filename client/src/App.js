import * as React from 'react';
import Button from '@mui/material/Button';
import './App.css';
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import Add from '@mui/icons-material/Add';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import AssignmentIcon from '@mui/icons-material/Assignment';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import DoneIcon from '@mui/icons-material/Done';

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
      Project Management <br></br><br></br>
      <TextField label="Add a task" variant="outlined" type="text" onChange={(e)=>setInput(e.target.value)} />
      <br></br> <br></br>
      <Button variant="contained" endIcon={<Add />} onClick={(e)=>addTask()}>Assign</Button>
        <br></br><br></br>

        <TableContainer component={Paper}>
      <Table align='center'>
        <TableRow>
          <TableCell>
            Pending Tasks
          </TableCell>
          <TableCell>
            In Progress Tasks
          </TableCell>
          <TableCell>
            Completed Tasks
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
          <Paper>
      {pendingTask.map((val)=>{
        return <List>
        <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <KeyboardDoubleArrowRightIcon onClick={(e)=>setTaskInProgress(val.id)}/>
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <AssignmentIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={val.tasks}
                />
                <ListItem secondaryAction={
            <IconButton edge="end" aria-label="delete">
            <DeleteIcon onClick={(e)=>deleteTask(val.id)}/>
          </IconButton>
          }></ListItem>
              </ListItem>
        </List>
      })}
    </Paper>
          </TableCell>
          <TableCell>
          <Paper>
        
        {inProgress.map((val)=>{
        return <List>
        <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <KeyboardDoubleArrowRightIcon onClick={(e)=>setTaskCompleted(val.id)}/>
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <RotateLeftIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={val.tasks}
                />
                <ListItem secondaryAction={
            <IconButton edge="end" aria-label="delete">
            <DeleteIcon onClick={(e)=>deleteinprogress(val.id)}/>
          </IconButton>
          }></ListItem>
              </ListItem>
        </List>
      })}
    </Paper>
          </TableCell>
          <TableCell>
          <Paper>
        {completed.map((val)=>{
        return <List>
          <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon onClick={(e)=>deletecompleted(val.id)}/>
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <DoneIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={val.tasks}
                  />
                </ListItem>
          </List>
      })}   </Paper>
          </TableCell>
        </TableRow>
      </Table>
      </TableContainer>
    </div>
  );
}

export default App;
