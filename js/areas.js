
function probarCodigoAreas(){

    // Inicio del oficio carpintero
 let oficio=prompt("¿Usted es carpintero? Responder con si o no");

 while(oficio!="no"){
   switch(oficio){
     case "si":
       console.log("Tenemos las mejores herramientas de mano y electricas para la carpinteria");
       oficio="no";
       break;
   } //fin del switch
} //fin del while

    // Inicio del oficio herrero
let oficio2=prompt("¿Usted es herrero? Responder con si o no");

while(oficio2!="no"){
  switch(oficio2){
    case "si":
      console.log("Tenemos gran variedad de bisagras, tornillos y electrodos para la herreria");
      oficio2="no";
      break;
  } //fin del switch
} //fin del while

    // Inicio del oficio pintor
let oficio3=prompt("¿Usted es pintor? Responder con si o no");

while(oficio3!="no"){
  switch(oficio3){
    case "si":
      console.log("Trabajamos con todo tipo de pintura, rodillos y pinceles");
      oficio3="no";
      break;
  } //fin del switch
} //fin del while

 console.log("se termino la carga de datos")
}