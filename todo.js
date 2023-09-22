class Atividade {
  constructor(id, nome, descricao, responsavel) {
      this.id = id;
      this.nome = nome;
      this.descricao = descricao;
      this.responsavel = responsavel;
  }
}

const listaDeAtividades = [];

const incluirAtividade = () => {
  const id = document.getElementById('id').value
  const nome = document.getElementById('nome').value
  const descricao = document.getElementById('descricao').value
  const responsavel = document.getElementById('responsavel').value

  if (!nome || !descricao || !responsavel)
    return

  if (id) {
    editarDescricaoAtividade(id, descricao)
  } else {
    const randomId = Math.floor(Math.random() * 1000000);
    adicionarAtividade(randomId, nome, descricao, responsavel)
  }

}

//ADICIONAR UMA ATIVIDADE
const adicionarAtividade = (id, nome, descricao, responsavel) => {
  const atividade = new Atividade(id, nome, descricao, responsavel)
  listaDeAtividades.push(atividade)
  renderizarLista()
  document.getElementById('id').value = ''
  document.getElementById('nome').value = ''
  document.getElementById('descricao').value = ''
  document.getElementById('responsavel').value = ''
}

const renderizarLista = () => {
  
  const elementoUl = document.getElementById('lista-atividades')
  const elementoLi = document.createElement('li')

  listaDeAtividades.forEach((atividade, index) => {
    elementoLi.id = atividade.id
    elementoLi.innerHTML = `
      Nome: ${atividade.nome} - Descrição: ${atividade.descricao} - Responsável: ${atividade.responsavel} - <button onclick="removerAtividade('${atividade.nome}')">Remover</button> - <button onclick="buscarAtividade('${atividade.id}')">Mostrar</button>
    `
    elementoUl.appendChild(elementoLi)
  })
}

//REMOVER UMA ATIVIDADE
const removerAtividade = (nome) => {

  //logica de remover atividade
  const index = listaDeAtividades.findIndex(item => item.nome.toLowerCase() === nome.toLowerCase())
  let id

  if (index > -1) {
    id = listaDeAtividades[index].id
    listaDeAtividades.splice(index, 1)
    document.getElementById(id).remove()
  }

}

//PESQUISAR UMA ATIVIDADE
const buscarAtividade = (id) => {

  if (!id)
    return

  //logica de buscar atividade
  const atividade = listaDeAtividades.find(item => item.id.toString() === id)

  if(atividade) {
    document.getElementById('id').value = atividade.id
    document.getElementById('nome').value = atividade.nome
    document.getElementById('descricao').value = atividade.descricao
    document.getElementById('responsavel').value = atividade.responsavel
  }
}

//EDITAR DESCRICAO DE UMA ATIVIDADE
const editarDescricaoAtividade = (id, novaDescricao) => {
  //logica para editar descricao da atividade
  const item = listaDeAtividades.find(item => item.id.toString() === id)
  
  if (item)
    item.descricao = novaDescricao

  renderizarLista()
}



