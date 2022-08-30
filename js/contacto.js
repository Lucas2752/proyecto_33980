{
    const redesSociales = document.getElementById('redesSociales')
    
    const itemList = document.createElement('ol')
    itemList.innerHTML =   `Instagram: @Ferreteriafl <br>                       
                            Facebook: Ferreteria Lucas <br>
                            Twitter: @Ferreteriafl <br>                  
                            Youtube: La Ferreteria De Lucas`
    
    redesSociales.appendChild(itemList)
    }
    
    
    {
    const infoContact = document.getElementById('infoContact')
    
    
    const itemList = document.createElement('ol')
    itemList.innerHTML =   `Cuyo 396, Moreno <br>
                            11 3410 1440 <br>
                            Ferreteriafl@gmail.com`
    
    infoContact.appendChild(itemList)
    }
    
    
    //codigo para validar con .value en consola 
    
    
    const nombre = document.getElementById("name")
    const email = document.getElementById("email")
    const telefono = document.getElementById("telefono")
    const asunto = document.getElementById("asunto")
    


//Storage y JSON

// document.getElementById('name').value="Nombre";
// document.getElementById('email').value="Email@gmail.com";
// document.getElementById('telefono').value="Numero de telefono";
// document.getElementById('asunto').value="Consulta";

document.getElementById('name').placeholder="Nombre";
document.getElementById('email').placeholder="Email@gmail.com";
document.getElementById('telefono').placeholder="Numero de telefono";
document.getElementById('asunto').placeholder="Consulta";



class Subscriptor
{
     constructor(obj) {
        this.name  = obj.name;
        this.email  = obj.email;
        this.telefono  = obj.telefono;
        this.asunto = obj.asunto
    }
}


let ArrayDeSubscriptores=[];

VerificaryCargar();

let botonRegistrar = document.getElementById("btnRegistrar")
botonRegistrar.onclick = () =>{

    let nameIngresado = document.getElementById('name').value;
    let emailIngresada = document.getElementById('email').value;
    let telefonoIngresado = document.getElementById('telefono').value;
    let asuntoIngresado = document.getElementById('asunto').value;

    /* validaciones */
    let objGenerico={name : nameIngresado , email : emailIngresada , telefono : telefonoIngresado , asunto : asuntoIngresado}
    ArrayDeSubscriptores.push(new Subscriptor(objGenerico));


    Guardar()     
}
function Guardar()
{
    localStorage.setItem("ListadoSubscriptores",JSON.stringify( ArrayDeSubscriptores));
}

function VerificaryCargar()
{
    let arrayAuxiliar=JSON.parse(localStorage.getItem("ListadoSubscriptores"));

    if(arrayAuxiliar)
    {
        for(elemento of arrayAuxiliar )
        {
            ArrayDeSubscriptores.push(new Subscriptor(elemento));
            
        }
        let largo=arrayAuxiliar.length;
        console.log("tiene "+ largo +" elementos");
    }
    else
    {
        console.log("no hay registros");
    }
   

}