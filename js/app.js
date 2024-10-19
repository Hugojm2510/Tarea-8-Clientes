let carrito = [];

document.querySelectorAll('.agregar-carrito').forEach((boton) => {

    boton.addEventListener('click', (e) => {                        // vamos a agregar el evento 'clic' a los botones "agregar carritos" / la (e) representa el evento / =>, este operador indica, lo que sigue es el cuerpo de la funcion
        e.preventDefault();                                         // hace lo mismo que en la tarea de los colores de fondo
    
        const producto = e.target.closest('.card');
        const nombre = producto.querySelector('h4').innerText;
        const precio = producto.querySelector('.precio span.u-pull-right').innerText.replace('$','');

        // comprobar si el producto ya esta en el carrito
        const productoExistente = carrito.find(item => item.nombre === nombre);

        if(productoExistente){
            productoExistente.cantidad += 1;
        } else {
            carrito.push({nombre, precio, cantidad: 1})                     // agregar productos al carrito
        }

        pintarCarrito();
    });
});


// funcion pintar carrito
function pintarCarrito(){
    
    const tbody = document.querySelector('#lista-carrito tbody');
    tbody.innerHTML = '';                                           // para limpiar la tabla

    carrito.forEach((item, index) => {
        const fila = document.createElement('tr');
    

    // vamos a introducir contenido y crear una plantilla dentro de `...` y ${...} -> vamos a insertar expresiones
        fila.innerHTML = `
            <td><img src="img/curso${index + 1}.jpg" class="imagen-curso u-full-width" alt="${item.nombre}"></td>
            <td>${item.nombre}</td>
            <td>${item.precio}</td>
            <td>${item.cantidad}</td>
            <td><button class="borrar-curso" data-index="${index}">Borrar</button></td>
        `;
    
        tbody.appendChild(fila);
    });     


    // vamos a agregar el evento de borrar cada producto
    document.querySelectorAll('.borrar-curso').forEach((boton) => {

        boton.addEventListener('click', (e) =>{
            const index = e.target.dataset.index;
            carrito.splice(index, 1);                                      // borrar el array
            pintarCarrito();                                               // volver a pintar la tabla
        });
    });
}

    // agregar el evento para vaciar carrito
    document.getElementById('vaciar-carrito').addEventListener('click', () => {
        carrito = [];                                                       // vaciar el carrito
        pintarCarrito();                                                    // volver a pintar la tabla
    });