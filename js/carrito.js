   // Lucas Carrera

   class Aerosol{
    constructor(id,marca,tamaño,valor){
       this.id = id;
       this.marca = marca;
       this.tamaño = tamaño;
       this.valor = valor;
    }
 }

 let aerosol1= new Aerosol(1,"Kuwait","Chico",590)
 let aerosol2= new Aerosol(2,"Kuwait","Grande",970)
 let aerosol3= new Aerosol(3,"Krylon","Chico",880)
 let aerosol4= new Aerosol(4,"Krylon","Grande",1100)
 let aerosol5= new Aerosol(5,"Montana 94","Chico",1400)
 let aerosol6= new Aerosol(6,"Montana 94","Grande",2100)
 let aerosol7= new Aerosol(7,"Montana Hardcore","Chico",1510)
 let aerosol8= new Aerosol(8,"Montana Hardcore","Grande",2240)

 let aerosoles = [aerosol1,aerosol2,aerosol3,aerosol4,aerosol5,aerosol6,aerosol7,aerosol8]

 let carrito = [];