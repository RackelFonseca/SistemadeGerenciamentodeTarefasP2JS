const prompt = require('prompt-sync')();
//const axios = require('axios');
const axios = require('./api.js');


async function cadastrarTarefa() {
  var id = Number(prompt('Digite o id da tarefa:   '));
  var descricao = prompt('Digite a descrição da tarefa:  ');

  try {
    await axios.api.post('/tarefas', {
      id: id,
      descricao: descricao,
      status: 'Pendente'
    });
    console.log('Tarefa Cadastrada com sucesso!');
  } catch (erro) {
    console.log('Erro: Tarefa não Cadastrada:', erro.message);
  }
}


async function alterarTarefa() {
  var id = Number(prompt('Digite o id da tarefa que deseja alterar:   '));
  var descricao = prompt('Digite a nova descrição da tarefa:');

  try {
    await axios.api.put(`/tarefas/${id}`, {
      id: id,
      descricao: descricao,
      status: 'Pendente'

    });

    console.log('Tarefa Alterada com sucesso!');
  }
  catch (erro) {
    console.log('Erro ao alterar tarefa:', erro.message);
  }
}


async function marcarTarefaConcluida() {
  var id = Number(prompt('Digite o id da tarefa que sera concluida:   '));
  var tarefa = await obterTarefa(id);

  try {
    await axios.api.put(`/tarefas/${id}`, {
      id: id,
      descricao: tarefa.descricao,
      status: 'Concluída'

    });

    console.log('Tarefa concluída com sucesso!');
  }
  catch (erro) {
    console.log('Erro: Tarefa não concluída:', erro.message);
  }
}

async function excluirTarefa() {
  var id = Number(prompt('Digite o id da tarefa que deseja excluir:   '));
  try {
    await axios.api.delete(`/tarefas/${id}`);

    console.log('Sua tarefa foi excluída!');
  }
  catch (erro) {
    console.log('Erro: Tarefa não excluida:', erro.message);
  }
}

async function listarTarefasPendentes() {

  try {
    var response = await axios.api.get('/tarefas');
    var lista = response.data.filter((item) => item.status === 'Pendente');

    console.table(lista);
  }
  catch (erro) {
    console.log('Ocorreu um erro ao obter terefas');
  }
}

async function listarTarefasConcluidas() {

  try {
    var response = await axios.api.get('/tarefas');
    var lista = response.data.filter((item) => item.status === 'Concluída');

    console.table(lista);
  }
  catch (erro) {
    console.log('Ocorreu um erro ao obter terefas');
  }
}

async function obterTarefa(id) {
  var response = await axios.api.get(`/tarefas/${id}`);
  var tarefa = response.data;
  return tarefa;
}


async function main() {

  console.log('Bem-vindo ao sistema de gerenciamento de tarefas');

  do {

    var op;
    console.log(`O que deseja fazer?`);
    console.log('1- Cadastrar nova tarefa');
    console.log('2- Alterar tarefa');
    console.log('3- Marcar tarefa como concluida');
    console.log('4- Excluir uma tarefa');
    console.log('5- Listar tarefas pendentes');
    console.log('6- Listar tarefas concluídas');
    console.log('7- Sair do sistema');

    op = prompt('Digite a opção desejada: ');
    switch (op) {
      case '1':
        await cadastrarTarefa();
        prompt(`Digite Enter para continuar ...`);
        console.clear();
        break;
      case '2':
        await alterarTarefa();
        prompt(`Digite Enter para continuar ...`);
        console.clear();
        break;
      case '3':
        await marcarTarefaConcluida();
        prompt(`Digite Enter para continuar ...`);
        console.clear();
        break;
      case '4':
        await excluirTarefa();
        prompt(`Digite Enter para continuar ...`);
        console.clear();
        break;
      case '5':
        await listarTarefasPendentes();
        prompt(`Digite Enter para continuar ...`);
        console.clear();
        break;
      case '6':
        await listarTarefasConcluidas();
        prompt(`Digite Enter para continuar ...`);
        console.clear();
        break;
      case '7':
        console.log('Obrigado por usar o sistema.. Encerrando ...');
        break;
      default:
        console.log('Entrada inválida...');
        prompt(`Digite Enter para continuar ...`);
    }
  } while (op !== '7');
}

main();