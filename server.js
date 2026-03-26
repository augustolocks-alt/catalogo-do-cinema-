import Fastify from 'fastify'
const servidor = Fastify()

servidor.get('/filmes', async (request, reply) => {
 const resultado = await sql.query('SELECT * FROM filmes')
 return resultado.ro
})
servidor.listen({ port: 3000})

const express = require('express');
const app = express();

app.use(express.json());

let filmes = [];
let idAtual = 1;
app.post('/filmes', (req, res) => {
  const { titulo, genero, ano_lancamento, diretor } = req.body;

  const novoFilme = {
    id: idAtual++,
    titulo,
    genero,
    ano_lancamento,
    diretor
  };

  filmes.push(novoFilme);
  res.status(201).json(novoFilme);
});
app.get('/filmes', (req, res) => {
  res.json(filmes);
});
app.put('/filmes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, genero, ano_lancamento, diretor } = req.body;

  const filme = filmes.find(f => f.id === id);

  if (!filme) {
    return res.status(404).json({ mensagem: 'Filme não encontrado' });
  }

  filme.titulo = titulo;
  filme.genero = genero;
  filme.ano_lancamento = ano_lancamento;
  filme.diretor = diretor;

  res.json(filme);
});
app.delete('/filmes/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = filmes.findIndex(f => f.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Filme não encontrado' });
  }

  filmes.splice(index, 1);

  res.json({ mensagem: 'Filme deletado com sucesso' });
});
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});