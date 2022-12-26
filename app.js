 'user strict'

const getBanco = () => JSON.parse(localStorage.getItem ("todoList")) ?? [];
const setBanco = (banco) => localStorage.setItem("todoList", JSON.stringify(banco));
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
const limparTarefas = () => {
    const todoList = document.getElementById("todoList");
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
        }
}

const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco();
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}
const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value; 
    const limpaCampo = () => evento.target.value = "";
    if (tecla === "Enter") {
        const banco = getBanco();
        banco.push({"tarefa" : texto, "status" : ""})
        setBanco(banco);
        atualizarTela();
        limpaCampo();
    }
    
}
const removeItem = (indice) => {
    const banco = getBanco(); 
    banco.splice(indice, 1);
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === "" ? "checked" : "";
    setBanco(banco);
    atualizarTela();
}

const clickItem = (evento) => {
    const elemento = evento.target
    if (elemento.type === "button"){
        const indice = elemento.dataset.indice;
        removeItem(indice)
    }else if (elemento.type === "checkbox") {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
}


document.getElementById("newItem").addEventListener("keypress", inserirItem);
document.getElementById("todoList").addEventListener("click", clickItem);
atualizarTela();