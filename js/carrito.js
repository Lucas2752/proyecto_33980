   // Lucas Carrera

   class Aerosol{
    constructor(id,marca,tamaño,valor){
       this.id = id;
       this.marca = marca;
       this.tamaño = tamaño;
       this.valor = valor;
    }
 }
    // Asignacion de productos
 let aerosol1= new Aerosol(1,"Kuwait","Chico",590)
 let aerosol2= new Aerosol(2,"Kuwait","Grande",970)
 let aerosol3= new Aerosol(3,"Krylon","Chico",880)
 let aerosol4= new Aerosol(4,"Krylon","Grande",1100)
 let aerosol5= new Aerosol(5,"Montana 94","Chico",1400)
 let aerosol6= new Aerosol(6,"Montana 94","Grande",2100)
 let aerosol7= new Aerosol(7,"Montana Hardcore","Chico",1510)
 let aerosol8= new Aerosol(8,"Montana Hardcore","Grande",2240)
    // comienzo del uso de array
 let aerosoles = [aerosol1,aerosol2,aerosol3,aerosol4,aerosol5,aerosol6,aerosol7,aerosol8]

 let carrito = [];
    // Opcions ordenadas numericamente para la eleccion del cliente
 const mostrarProductos = () => {
    let mensaje = "Selecciona el aerosol que deseas"
    aerosoles.forEach(pintura => {
        mensaje += `
        Opcion ${pintura.id}: ${pintura.marca} tamaño: ${pintura.tamaño} = $${pintura.valor}`
    })
    // Opcion en caso de que el cliente no decida comprar
    mensaje += `
        Opcion 0: Terminar compra`
    let opcion = Number(prompt(mensaje))
    return opcion;
 }
    // En caso de que el cliente elija comprar
 let comprar = true

 while (comprar) {
    let opcion = mostrarProductos()
    if (opcion >= 1 && opcion <= 8) {
        // Si es el primer articulo que compra
        let aerosolDeseado = aerosoles.find(pintura => pintura.id === opcion)
        if (carrito.length === 0){
            aerosolDeseado.cantidad = 1;
            carrito.push(aerosolDeseado)
        }else{
            // Si ya tenia un articulo igual en el carrito y desea comprar otro
            let pinturaCarrito = carrito.find(pintura => pintura.id === opcion)
            if(pinturaCarrito){
                pinturaCarrito.cantidad++;
            }else{
                aerosolDeseado.cantidad = 1;
                carrito.push(aerosolDeseado)
            }
        }
    }else {
        comprar = false;
    }
 }
    // Mensaje final con recopilacion de producctos seleccionados y detalle
const mostrarTotalCarrito=()=>{
    let mensajeCarrito = "";
    if(carrito.length > 0){
        carrito.forEach(pintura =>{
            mensajeCarrito += `
                Marca: ${pintura.marca} - Cantidad ${pintura.cantidad} - Total: $${pintura.cantidad * pintura.valor}`
        })
        mensajeCarrito+= `
                Total Carrito: $${carrito.reduce((total,pintura)=>total + (pintura.valor * pintura.cantidad),0)}`
        alert(mensajeCarrito)
    }else{
        // Mensaje final con carrito vacio
        mensajeCarrito += 'No elejiste ningun aerosol'
        alert(mensajeCarrito)
    }
}

mostrarTotalCarrito()