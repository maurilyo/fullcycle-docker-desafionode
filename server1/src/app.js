const express = require('express');
const app = express();
const cors = require("cors");
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}
var nomes;
const mysql = require('mysql')
const connection = mysql.createConnection(config)
const sql = `INSERT INTO people(nome) values('Maurilio')`

let createPeople = `create table if not exists people(
  id int primary key auto_increment,
  nome varchar(255)
)`;

connection.query(createPeople, function(err, results, fields) {
  if (err) {
    console.log(err.message);
  }else{
    console.log('create table');
  }
});

const pool = mysql.createPool({
  connectionLimit: 10,    
  password: 'root',
  user: 'root',
  database: 'nodedb',
  host: 'db',
  port: 3306
}); 

SelectAllElements = () =>{
  return new Promise((resolve, reject)=>{
      pool.query('SELECT * FROM people ',  (error, elements)=>{
          if(error){
              return reject(error);
          }
          return resolve(elements);
      });
  });
};

connection.query(sql)

app.use(cors());
app.get('/', async (req, res, next) => {
  try {
    const resultElements = await SelectAllElements();
    res.status(200).json({msg : '<h1>Full Cycle Rocks!</h1>', elements: resultElements});
  }catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.get('/add', (req, res) => {
  
  connection.query(sql)
  connection.end
  
  return res.status(200).send({ "message": "Novo registro adicionado" });
});

app.listen(5001, () => console.log('Rodando na porta 5001'));