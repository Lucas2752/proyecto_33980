// const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let carritoStorage = [];

let carritoDeCompras = [];

// let carrito
// let carritoLocalStorage = JSON.parse( localStorage.getItem('carrito'))
// if (carritoLocalStorage) {
//     carrito = carritoLocalStorage
// }else{
//     carrito = []
// }

CargaProductosStorage();

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

const selecTamaños = document.getElementById('selecTamaños');
const buscador = document.getElementById('search');



//filtro
selecTamaños.addEventListener('change',()=>{
    if(selecTamaños.value == 'all'){
        mostrarProductos(stockProductos)
    }else{
        mostrarProductos(stockProductos.filter(item=> item.tamaño == selecTamaños.value))
    }
})




// selecTamaños.addEventListener('change',()=>{(selecTamaños.value == 'all')? mostrarProductos(stockProductos) : mostrarProductos.filter(item=> item.tamaño == selecTamaños.value)})


//Buscador
buscador.addEventListener('input',()=>{
    mostrarProductos(stockProductos.filter(item=> item.nombre.toLowerCase().includes(buscador.value.toLowerCase())))
})


mostrarProductos(stockProductos)

//logica Ecommerce
function mostrarProductos(array){ 
    contenedorProductos.innerHTML=''
   array.forEach(item =>{

    let div = document.createElement('div')

    div.className = 'producto'
    div.innerHTML= `<div class="card">
                        <div class="card-image">
                        <img src="${item.img}" />
                        <span class="card-title">${item.nombre}</span>
                        <a
                            id="botonAgregar${item.id}"
                            class="btn-floating halfway-fab waves-effect waves-light red"
                            ><i class="material-icons">add_shopping_cart</i></a
                        >
                        </div>
                        <div class="card-content">
                        <p>${item.desc}</p>
                        <p>Tamaño: ${item.tamaño}</p>
                        <p>$${item.precio}</p>
                        </div>
                </div>`
    contenedorProductos.appendChild(div)

    let btnAgregar = document.getElementById(`botonAgregar${item.id}`)
    btnAgregar.addEventListener('click',()=>{
        agregarAlCarrito(item.id);
    })
   })

}

function agregarAlCarrito(id) {
    let existe = carritoDeCompras.find(produc => produc.id == id)
    if(existe){
        existe.cantidad = existe.cantidad + 1
        document.getElementById(`cant${existe.id}`).innerHTML = `<p id="cant${existe.id}">cantidad:${existe.cantidad}</p>`
        actualizarCarrito()
    }else{
        let productoAgregar = stockProductos.find(item=> item.id == id)
        productoAgregar.cantidad = 1
        // CrearOpcion(); //prueba

        carritoDeCompras.push(productoAgregar);
        mostrarCarrito(productoAgregar)
        actualizarCarrito()
    }
    
    GuardarStorage()
    
}




function mostrarCarrito(productoAgregar) {

    let div = document.createElement('div')
    div.setAttribute('class', 'productoEnCarrito')
    div.innerHTML += `<p>${productoAgregar.nombre}</p>
                    <p>Precio: $${productoAgregar.precio}</p>
                    <p id="cant${productoAgregar.id}">cantidad:${productoAgregar.cantidad}</p>
                    <button class="boton-eliminar" id="${productoAgregar.id}">
                    <i class="fas fa-trash-alt"></i>
                    </button>
                    <button id="botonBorrarTodo"><i class="fas fa-trash-alt"></button>`


                    contenedorCarrito.appendChild(div)
                    eliminar()


                    let borrarTodoCarro = document.getElementById(`botonBorrarTodo`); 
                    borrarTodoCarro.addEventListener(`click`,()=> { .
                        Swal.fire({
                          title: 'Estas seguro?',
                          text: 'Vas a borrar todo el carrito!!',
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: '#3085d6',
                          cancelButtonColor: '#d33',
                          confirmButtonText: 'Si, Borrar!'
                        }).then((result) => {
                          if (result.isConfirmed) {
                            BorrarCarrito();
                            ActualizarStock();
                            Swal.fire({
                              title: 'Confirmado!',
                              showConfirmButton: false,
                              timer: 1500,
                              icon: 'success'
                            })
                          }      
                        })
                    })

                    contenedorCarrito.appendChild(div)
                    GuardarStorage()
                
                    eliminarTodo()
}

function BorrarCarrito() {
    localStorage.clear();
    document.getElementsByClassName('modal-carrito').innerHTML = '';
    carrito = []; 
    mostrarCarrito();
  }


function eliminarTodo() {
    let btnEliminarTodo = document.getElementsByClassName('boton-eliminar')
    for (const btn of btnEliminarTodo) {
        btn.addEventListener('click',(e)=>{
            btn.parentElement.remove();
            carritoDeCompras = carritoDeCompras.filter(item => item.id != e.target.parentElement.id)
            actualizarCarrito()
        })
    }
}





function eliminar() {
    let btnEliminar = document.getElementsByClassName('boton-eliminar')
    for (const btn of btnEliminar) {
        btn.addEventListener('click',(e)=>{
            btn.parentElement.remove();
            carritoDeCompras = carritoDeCompras.filter(item => item.id != e.target.parentElement.id)
            actualizarCarrito()
        })
    }
}


function  actualizarCarrito (){
   contadorCarrito.innerText= carritoDeCompras.reduce((acc,el)=> acc + el.cantidad, 0)            
   precioTotal.innerText = carritoDeCompras.reduce((acc,el)=> acc + (el.precio * el.cantidad), 0)
}                                                             




function GuardarStorage() {
    localStorage.setItem("productosViejo",JSON.stringify(carritoDeCompras));
}
function VerificarCargar() {
    let arrayCarrito = JSON.parse(localStorage.getItem("productosViejo"));
}


function CargaProductosStorage() {
    let productosStorage = JSON.parse(localStorage.getItem("productos"));
}