import server from './server';

const PORT = 3003;

server.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
})



