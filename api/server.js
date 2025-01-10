const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json());

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
  host:'mysql-xitique.alwaysdata.net',
  user:'xitique', 
  password: 'Acossa@824018...84',
  database: 'xitique_cash',
});

db.connect(err => {
  if (err) {
    console.error('Erro de conexão: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados');
});

// Endpoint para adicionar aluno
app.post('/addAluno', (req, res) => {
  const { nome, turma } = req.body;
  const query = 'INSERT INTO alunos (nome, turma) VALUES (?, ?)';
  
  db.query(query, [nome, turma], (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao inserir aluno');
    }
    res.status(200).send('Aluno inserido com sucesso');
  });
});

// Endpoint para listar alunos
app.get('/getAlunos', (req, res) => {
  const query = 'SELECT * FROM alunos';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao obter alunos');
    }
    res.json(results);
  });
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
