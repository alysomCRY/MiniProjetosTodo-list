 'user strict'

// vai ate local storage e verifica se tem a key "todoList" se sim pega este item se nao(??) fica vazio [].
//quando chamo o JSON.parse ele transforma o todoList em array pois ele vem do localstorage como string,e para o banco precisamos de arrays
const getBanco = () => JSON.parse(localStorage.getItem ("todoList")) ?? [];
//manda para o locarStorage oq o usuario digitou e para isso transforma em string novamente
const setBanco = (banco) => localStorage.setItem("todoList", JSON.stringify(banco));
//cria o item label e com innerHTML adiciona o restante dos intens
//usamos tambem o atrubuto (data) pois ele pode ser chamado como um id ou classe,e neste caso o "data-indice"recebe o indice quando é criado um novo elemento
const criarItem = (texto, status, indice) => {
    const item = document.createElement("label");
    item.classList.add("todo__item");
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice = ${indice}>
        <div>${texto}</div>
        <input type="button" value="X">
    `
    document.getElementById("todoList").appendChild(item);
    
}
//limpa a tarefa para nao ter repetições,"while" enquanto tiver o primeiro filho,remove o filho de "todoList"(o ultimo filho)
const limparTarefas = () => {
    const todoList = document.getElementById("todoList");
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
        }
}

//método que vai ler o banco de dados e vai criar um item para cade elemento do array do banco de dados,chamando o"item tarefa" e o "item status"  e o "indice" para que possa diferenciar cada elemento pois como é um array cada elemento tem seu proprio indice e em seguida atualiza a tela com esses elementos
const atualizarTela = () => {
    limparTarefas();
    //cria a const banco e pega o "getbanco" para quando for atualizar a tela
    const banco = getBanco();
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}
const inserirItem = (evento) => {
    // pega o evento.key
    const tecla = evento.key;
    //pega o target do evento e em seguida pega o valor de onde veio esse evento,no caso o valor digitado em "newItem"
    const texto = evento.target.value; 
    //verifica se esse evento foi a tecla "Enter"
    const limpaCampo = () => evento.target.value = "";
    if (tecla === "Enter") {
        //primeiro vai ler o banco em seguida dar push em um item para dentro de banco(getbanco)
        const banco = getBanco();
        // quando for o enter adiciona ao banco de dados uma nova tarefa
        banco.push({"tarefa" : texto, "status" : ""})
        setBanco(banco);
        atualizarTela();
        limpaCampo();
    }
    
}
const removeItem = (indice) => {
    //chama o get banco
    const banco = getBanco(); 
    //apartir do item que ele recebe ele remove 1 nesse caso ele mesmo
    banco.splice(indice, 1);
    setBanco(banco);
    atualizarTela();
    //busca em banco remove 1 e depois manda para o banco(locastorage) e em seguida atualiza a tela
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    //vai buscar no banco o indice correto,se o status for "" vazio entao (?) muda o status para "checked" se(:) nao deixa vazio 
    banco[indice].status = banco[indice].status === "" ? "checked" : "";
    setBanco(banco);
    atualizarTela();
}

const clickItem = (evento) => {
    const elemento = evento.target
    // se o elemento clicado for do tipo button remove o item do banco
    if (elemento.type === "button"){
        //vai no elemento clicado e na propriedade "data" que neste caso quando cria item ele cria "data-indice" e busca a "plavra chave""indice"
        const indice = elemento.dataset.indice;
        // chama a funcao que remove o item do banco
        removeItem(indice)
    }else if (elemento.type === "checkbox") {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
}


document.getElementById("newItem").addEventListener("keypress", inserirItem);
document.getElementById("todoList").addEventListener("click", clickItem);
// quando quiser chamar uma funcao assim q a pagina for "aberta" chame a funcao fora da const
atualizarTela();