const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extender: true}));


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tasksdb'
});

app.get('/api/pending/', (req,res)=>{
    const sqlSelect = "SELECT * from pendingtasks";
    db.query(sqlSelect, (err, result)=>{
        //console.log(result)
        res.send(result);
    });
});

app.post('/api/addpending/', (req,res)=>{
    const tasks=req.body.inputValue
    console.log(tasks)
    const sqlInsert = "INSERT INTO pendingtasks(tasks) values (?) ";
    db.query(sqlInsert, tasks, (err, result)=>{
        console.log(err)
    });
});


app.post('/api/deletetask/', (req,res)=>{
    const tasks=req.body.id
    const sqldelete = "DELETE FROM pendingtasks WHERE id=(?) ";
    db.query(sqldelete, tasks, (err, result)=>{
        console.log(err)
    });
});

app.post('/api/setinprogress/', (req,res)=>{
    const taskss=req.body.id
    const sqlSelect = "SELECT tasks from pendingtasks where id=(?)";
    db.query(sqlSelect,taskss, (err, result)=>{
        console.log(result)
        
    //     const sqlInsert = "INSERT INTO inprogresstask(tasks) values (?) ";
    //     db.query(sqlInsert, result.tasks, (err, result)=>{
    //     console.log(err)
    // });
    });
});
app.listen(3001, () => {
    console.log('Running on 3001');
});