const listaCursos = document.querySelector('#lista-cursos');
const tabla = document.querySelector('#lista-carrito tbody');

let carrito = [];

function getCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const item = [];
        item.id = e.target.getAttribute('data-id');
        const padre = e.target.parentElement;
        item.name = padre.querySelector('h4').innerText;
        item.price = padre.querySelector('p span').innerText;
        item.image = padre.parentElement.querySelector('img').src;
        item.cantity = 1;
        addItem(item);
        // Llenar la tabla
        showTable();
    }
}

function addItem(item){
    // Verificar si el objeto existe en carrito
        if(carrito.some(itemCarrito => item.id === itemCarrito.id )){
            carrito.forEach(itemCarrito => {
                if(itemCarrito.id === item.id){
                    itemCarrito.cantity++;
                }
            });
        }
        else{
            carrito.push(item);
        }
}

function showTable(){
    // Limpiar tabla
    tabla.innerHTML = '';
    // Iterar carrito para insertar
    carrito.forEach(item => {
        tabla.appendChild(createRow(item));
    });
}

function createRow(item){
    const row = document.createElement('tr');
    let rowHTML = ``;
    rowHTML += `<td><img src="${ item.image }" width="100px"></td>`;
    rowHTML += `<td>${ item.name }</td>`;
    rowHTML += `<td>${ item.price }</td>`;
    rowHTML += `<td>${ item.cantity }</td>`;
    const button = document.createElement('button');
    button.setAttribute('data-id', item.id);
    button.classList.add('btn');
    button.innerHTML = 'X';
    const td = document.createElement('td');
    td.appendChild(button);
    row.innerHTML = rowHTML;
    row.appendChild(td);
    return row;
}

function btnDelItem(e){
    if(e.target.classList.contains('btn')){
        const id = e.target.getAttribute('data-id');
        // Eliminar de Carrito
        carrito = carrito.filter(itemCarrito => itemCarrito.id !== id);
        showTable();
    }
}

listaCursos.addEventListener('click', getCurso);
tabla.addEventListener('click', btnDelItem);