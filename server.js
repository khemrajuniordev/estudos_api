//Crie uma constante chamada express e coloque nela o pacote Express.

const express = require('express');

//Crie uma aplicacao da funcao express e guarde ela dentro da constante app

const app = express();

//Diga para o express usar o middleware que permite interpretar dados json

app.use(express.json());

//Crie uma lista chamada tarefas para guardar nossas tarefas na memoria
let tarefas = [
    //Crie a primeira tarega com o id 1 , titulo e status de nao concluida
    { id: 1, titulo: "Aprender restfull", concluida: false },
    //Crie a segunda tarefa com o id 2, titulo e status de nao concluida 
    { id: 2, titulo: "Construir uma API", concluida: false }
];


//Diga ao app quando receber um GET em /tarefas, execute esta funcao
app.get('/tarefas', (req, res) => {
    //Responda com status (200) e envie todas as tarefas em formato JSON
    res.status(200).json(tarefas);
});

//Diga ao app quando receber um GET em /tarefa/:id, execute esta funcao
app.get('/tarefas/:id', (req, res) => { //acesse o get que pertence ao app
    //Pegue o id que veio n URL e transofme de texte para numero inteiro
    const id = parseInt(req.params.id);
    //Procure dentro da lista a tarefa cujo id seja exatamente igual ao id recebido
    const tarefa = tarefas.find(t => t.id === id);
    //Se nenhuma tarefa foi encontrada
    if (!tarefa) {
        //Pare aqui e retorne com statu dizendo que nao encontrou
        return res.status(404).json({ mensagem: "Tarefa nao encontrada." });
    }
    //Se a tarefa foi encontrada, returna com status 200 e envie ela em json
    return res.status(200).json(tarefa);
});

//Diga ao app quando receber um POST inserir ou postar em /tarefas, execute esta funcao 
app.post('/tarefas', (req, res) => {
    //Pegue a propriedade titulo que veio dentro do corpo da requisicao
    const { titulo } = req.body;
    //Se o titulo nao foi enviado
    if (!titulo) {
        //pare aqui e retorne com status 400 dizendo que o titulo e obrigatorio
        return res.status(400).json({ Mensagem: "O campo titulo e obrigatorio" })
    }
    //Crie um objeto chamado novaTarefa que representa a tarefa a ser criada.
    const novaTarefa = {
        //Defina o id como a quantidade atual de tarefas mais 1 (prox numero)
        id: tarefas.length + 1,
        //Use o titulo que o usuario enviou (forma curta de titulo: titulo)
        titulo,
        //Comece a tarefa como nao concluida
        concluida: false
    };

    //Adiciona uma nova tarefa ao final da lista
    tarefas.push(novaTarefa);
    //Retorne com status(201) criado e envie a nova tarefa em json
    res.status(201).json(novaTarefa);
});


//PUT
//Diga ao app quando receber um PUT em /tarefas/:id, execute esta funcao
app.put('/tarefas/:id', (req, res) => {
    //Pegue o id que veio na URL e transforme de texto para numero inteiro
    const id = parseInt(req.params.id);
    //Descubra em qual posicao da lista esta a tarefa com esse id.
    const index = tarefas.findIndex(t => t.id === id);
    //Se a posicao for -1 significa que a tarefa nao existe
    if (index === -1) {
        //entao pare aqui e retorna o status 404 dizendo que nao encontrou
        return res.status(404).json({ Mensagem: "Tarefa nao encontrada." });
    }
    //Na posicao encontrada, substitua a tarefa antiga por uma nova versao
    tarefas[index] = {
        //Matenha o mesmo id da tarefa original
        id,
        //Use o novo titulo se ele veio, caso contrario, mantenha o titulo antigo
        titulo: req.body.titulo || tarefas[index].titulo,
        //Use o novo valor de concluida se ele veio, senao, mantenha o antigo
        concluida: req.body.concluida ?? tarefas[index].concluida
    };
    //Responda com status 200 e envie a tarefa ja atualiza em json
    res.status(200).json(tarefas[index]);
});


//DELETE

//Diga ao app quando receber um DELETE em /tarefas/:id execute esta funcao
app.delete('/tarefas/:id', (req, res) => {
    //Pegue o id que veio na URL e transforme de texto para numero inteiro
    const id = parseInt(req.params.id);
    //Descubra em qual posicao da lista esta a tarefa com esse id.
    const index = tarefas.findIndex(t => t.id === id);
    //Se a posicao for -1 significa que a tarefa nao existe
    if (index === -1) {
        //entao pare aqui e retorne com o status 404 dizendo que nao encontrou
        return res.status(404).json({ mensagem: "Tarefa nao encontrada." });
    }
    //Na posicao encontrada remova exatamente 1 elemento da lista
    tarefas.splice(index, 1);
    //Responda com status 204 (sucesso sem conteudo) e encerra a reposta
    res.status(204).send();
});

//Crie uma constante chamada PORT com o numero da porta que o servidor vai usar
const port = 3000;
//Faca o app escutar a porta definida e execute algo quando o servidor iniciar
app.listen(port, () => {
    //Mostre no terminal uma mensagem avisando que a API esta no ar, com a porta
    console.log(`API rodando com sucesso em http://localhost:${port}`);
});