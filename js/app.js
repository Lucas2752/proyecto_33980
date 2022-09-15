
const contenedorProductos = document.getElementById('contenedor-productos') // Contenedor del carrito

const contenedorCarrito = document.getElementById('carrito-contenedor')

const apiKey = `dcacea55e6bce077bd20412a0dc1c31f`;

const botonesCarrito = document.getElementById('botonesCarrito')
const botonVaciar = document.getElementById('vaciar-carrito')
const botonComprar = document.getElementById('comprar-carrito')
const botonSalir = document.getElementById('carritoCerrar')

const contadorCarrito = document.getElementById('contadorCarrito')

const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

const selecTamaños = document.getElementById('selecTamaños');
const buscador = document.getElementById('search');



let carrito = []

//Api del clima.
const fetchData = position => {
  const {latitude, longitude} = position.coords;
  fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => WeatherData(data))
};
const WeatherData = data => {
  let temperatura = document.getElementById("temperatura");
  temperatura.innerHTML = `La Temperatura en ${data.name} es de ${data.main.temp}°`
  if(Number(data.main.temp) > 15) {
    Swal.fire({
      title: 'El dia es especial para que pruebes nuestra pintura!',
      showConfirmButton: false,
      timer: 4000,
      icon: 'success'
    });
  }else {
    Swal.fire({
      title: 'Con el frio y humedad te recomendamos nuestros aerosoles de secado rapido!',
      showConfirmButton: false,
      timer: 4000,
      icon: 'success'
    });
  };
};

const OnLoad = ()=> {
  navigator.geolocation.getCurrentPosition(fetchData);
};

//filtro
selecTamaños.addEventListener('change',()=>{
    if(selecTamaños.value == 'all'){
        stockProductos(stockProductos)
    }else{
        stockProductos(stockProductos.filter(producto=> producto.tamaño == selecTamaños.value))
    }
})

//Buscador
buscador.addEventListener('input',()=>{
    mostrarProductos(stockProductos.filter(producto=> producto.nombre.toLowerCase().includes(buscador.value.toLowerCase())))
})

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})


botonComprar.addEventListener(`click`,()=> {
        carrito.length = 0
        Swal.fire({           // Alert repreguntando si desea realizar la compra
          title: 'Estas seguro?',
          text: 'Vas a obtener el carrito!!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Comprar!'
        }).then((result) => {
          if(result.isConfirmed) {
            Swal.fire({       //Alert confirmacion de compra
              title: 'Confirmado!',
              showConfirmButton: false,
              timer: 1500,
              icon: 'success'
            });
            Swal.fire(
                'Gracias por su compra!',
                'Ferreteria Lucas',
                'success'
              );
          };  
        }); 
        actualizarCarrito()

});


botonVaciar.addEventListener(`click`,()=> {
        carrito.length = 0

        Swal.fire({         // Alert repreguntando si desea borrar el carrito
          title: 'Estas seguro?',
          text: 'Vas a borrar todo el carrito!!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Borrar!'
        }).then((result) => {
          if(result.isConfirmed) {   // Alert confirmando la cancelacion 
            Swal.fire({
              title: 'Carrito eliminado!',
              showConfirmButton: false,
              timer: 1500,
              icon: 'error'
            });
            actualizarCarrito()
          };  
        }); 
});

botonSalir.addEventListener(`click`,()=> {
    carrito.length = 0

    let timerInterval
    Swal.fire({                // Alert conteo de salida al efectuar el escape (X)
      title: 'Estas saliendo del carrito',
      html: 'Faltan <b></b> milisegundos.',
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
});

// Agregando HTML del carrito
stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = 
      `
        <div class="card">
            <div class="card-image">
                <img src="${producto.img}" />
                <span class="card-title">${producto.nombre}</span>
                <a
                    <button id="agregar${producto.id}" 
                        class="btn-floating halfway-fab waves-effect waves-light red">
                        <i class="material-icons">
                             add_shopping_cart
                        </i>
                    </button>
                </a>                
            </div>
            <div class="card-content">
                <p>${producto.desc}</p>
                <p> Tamaño: ${producto.tamaño}</p>
                <p class="precioProducto"> Precio: $${producto.precio}</p>
            </div>
        </div>
      `
    contenedorProductos.appendChild(div)
    const boton = document.getElementById(`agregar${producto.id}`) //Por cada elemento de mi array creo un div con su ID
    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })
})

const agregarAlCarrito = (prodId) => {

// Si el producto ya existe se va a sumar en el carrito pero no va a afectar mas de una vez al contador del carrito
    const existe = carrito.some (prod => prod.id === prodId) //Compruebo si el elemento ya existe en el carrito
    if (existe){
        const prod = carrito.map (prod => { //Busca el producto igual y le suma la cantidad al carrito
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { //Si no existe lo agregamos por primera vez al carrito y por unica vez al contador
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    actualizarCarrito()
}

//Va a buscar que elemento le indique y va a borrar el indice de tal item
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item) 
    carrito.splice(indice, 1) 
    actualizarCarrito() 
    console.log(carrito)
}

//Siempre que llame a esta const va a borrar el nodo, recorrer el array y devolver la info actualizada
const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "" 
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = 
        `
          <p>${prod.nombre}</p>
          <p>Precio:$${prod.precio}</p>
          <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
          <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div)
        localStorage.setItem('carrito', JSON.stringify(carrito))
    })

    contadorCarrito.innerText = carrito.length 
    console.log(carrito) 
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)    
    VerifyStorage()
}

//Busca algun resultado en el localStorage, lo devuelve y nos da un alert
function VerifyStorage() {
    let arrayCarrito = JSON.parse(localStorage.getItem("carrito"));
    if(arrayCarrito) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1800,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
      Toastify({  //Si encuentra algo nos avisa al recargar la pagina
        text: 'Tu carrito te espera!', 
        duration: 1900,
        position: 'right',
        gravity: "top"
    }).showToast()
      Buttons();
      for(elemento of arrayCarrito ) {
        AddCart(elemento.codigo);
      };
    };
  };