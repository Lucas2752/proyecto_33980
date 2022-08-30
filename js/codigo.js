//    // Lucas Carrera

// function probarCodigoIngreso()

//         // Regristro y bienvenida
//    {   
//         let nombreIngresado=prompt("ingrese su nombre");
//         let respuesta="s";
//         let precio;

//         console.log("Hola, bienvenido "+ nombreIngresado);
//         while(respuesta=="s")
//        {
//           // Asesoramiento de acuerdo al presupuesto del cliente
//          precio=parseInt(prompt("ingrese cuanto desea gastar en la amoladora"));
//          if(precio>=12200)
//          {
//            console.log("La mejor opcion es comprar la amoladora Makita de $12.200");
//            console.log("Tambien podes comprar la amoladora Skill de $8.700");
//            console.log("O podes optar por la amoladora Gamma de $6.300")
//           }
        
//          if(precio<12200 && precio>=8700)
//          {
//              console.log("La mejor opcion es comprar la amoladora Skill de $8.700");
//              console.log("Tambien podes comprar la amoladora Gamma de $6.300");
//          }

//          if(precio<8700 && precio>=6300)
//          {
//              console.log("La mejor opcion es comprar la amoladora Gamma de $6.300");
//          }
        
//          if(precio<6300)
//          {
//             console.log("No disponemos por el momento de ninguna amoladora por ese precio")
//          }

//          respuesta=prompt("Si quiere correguir el monto, presione (s), en caso contrario ingrese cualquier tecla para terminar de cargar los datos");

//          {
//           // Calculo para presupuesto por x cantidad de tornillos
//          let cantidadTornillo = parseInt(prompt("Ingrese cantidad de tornillos que desea"));
//          let precioTornillo = 3;
//          let multiplicacion = cantidadTornillo * precioTornillo;
//          console.log("El precio por " + cantidadTornillo + " tornillos es de: $" + multiplicacion);
//          }

//        }//fin del while
//        console.log("se termino la carga de datos");
//     }
