let medicion=[];  
let modifica = -1;



$(function(){


    $("#exampleModal").modal({backdrop: 'static', keyboard: false});

    actualizaMedicion();


    $("#grabar").on("click", function(){
         let medi = localStorage.getItem("medicion");
        if(medi == null){
            let medicion=[];     
        }else{ 
            medicion = JSON.parse(localStorage.getItem("medicion"));
        }  

        let horaIngresada = $("#horaIngresada").val();
        let minimaIngresada = $("#minimaIngresada").val();
        let maximaIngresada = $("#maximaIngresada").val();


        if (horaIngresada=="") {
           $("#exampleModalLabelMsg").text("Debe ingresar una Hora para poder registrar");       
           $("#exampleModalLabelMinMsg").text("");
           $("#exampleModalLabelMaxMsg").text("");
        }else if( minimaIngresada==0 ) { 
            $("#exampleModalLabelMinMsg").text("Debe ingresar una medicion minima valida");
            $("#exampleModalLabelMsg").text("");        
            $("#exampleModalLabelMaxMsg").text("");
        }else if( maximaIngresada==0 ) { 
            $("#exampleModalLabelMaxMsg").text("Debe ingresar una medicion maxima valida");
            $("#exampleModalLabelMsg").text("");        
            $("#exampleModalLabelMinMsg").text("");
         } else {

            $("#horaI").text(horaIngresada);
            $("#minI").text(minimaIngresada);
            $("#maxI").text(maximaIngresada);
        
            var nuevaMedicion = [ 
                horaIngresada,
                minimaIngresada,
                maximaIngresada
            ];

            if(modifica >= 0){
                medicion.splice(modifica, 0, nuevaMedicion);
                medicion.splice(modifica+1,1);    
                $("#exampleModalLabelMsg").text("");        
                $("#exampleModalLabelMinMsg").text("");
                $("#exampleModalLabelMaxMsg").text("");
            }else{
                medicion.push(nuevaMedicion);
                $("#exampleModalLabelMsg").text("");
                $("#exampleModalLabelMinMsg").text("");
                $("#exampleModalLabelMaxMsg").text("");
            }
            modifica = -1;
            localStorage.setItem("medicion", JSON.stringify(medicion));
            actualizaMedicion();
        
            $("#exampleModal input").val("");
            $("#exampleModal").modal("hide");
        }

    });

    $("#cerrarModal").on("click", function(){
        $("#exampleModal input").val("");
        $("#exampleModalLabelMsg").text("");  
        $("#exampleModalLabelMinMsg").text("");
        $("#exampleModalLabelMaxMsg").text("");
        $("#exampleModal").modal("hide");
    });


});

function actualizaMedicion() {

    let medi = localStorage.getItem("medicion");
    if(medi == null){
        let medicion=[];     
    }else{ 
        medicion = JSON.parse(localStorage.getItem("medicion"));
    } 
    let medicionesHtml='<tr><th scope="col">Hora de las Mediciones</th><th scope="col">Valor de la Mínima</th><th scope="col">Valor de la Alta</th></tr>';
    for(let i in medicion){ 
        medicionesHtml +=  `<tr id=fila${[i]}">`; 
        for(let sub in medicion[i]){ 
              medicionesHtml += `<td > ${medicion[i][sub]} </td>`;
        }
        medicionesHtml += `<td><input type="button" onclick="modificarFila(${[i]});" value="Modificar" /></td>`; 
        medicionesHtml += `<td><input type="button" onclick="eliminarFila(${[i]});" value="Eliminar" /></td>`; 
        medicionesHtml += '</tr>';
      } 
    $("#listamediciones").html(medicionesHtml);

}


function eliminarFila(index) {
    let medi = localStorage.getItem("medicion");
 
    if(medi == null){
        let medicion=[];     
    }else{ 
        medicion = JSON.parse(localStorage.getItem("medicion"));
    }  

     let horaIngresada = $("#horaIngresada").val();
    let minimaIngresada = $("#minimaIngresada").val();
    let maximaIngresada = $("#maximaIngresada").val();
    $("#horaI").text(horaIngresada);
    $("#minI").text(minimaIngresada);
    $("#maxI").text(maximaIngresada);

    var nuevaMedicion = [ 
        horaIngresada,
        minimaIngresada,
        maximaIngresada
    ]; 

    medicion.splice(index,1);
    localStorage.setItem("medicion", JSON.stringify(medicion));
    actualizaMedicion();

  }


  function modificarFila(index) {
    let medi = localStorage.getItem("medicion");
 
    if(medi == null){
        let medicion=[];     
    }else{ 
        medicion = JSON.parse(localStorage.getItem("medicion"));
    }  

    for(let i in medicion){ 
        if(i == index){
            for(let sub in medicion[i]){    
                if(sub == 0){   
                    $("#horaIngresada").val(medicion[i][sub]);
                }  else if(sub == 1){  
                    $("#minimaIngresada").val(medicion[i][sub]);
                }   else if(sub == 2){  
                    $("#maximaIngresada").val(medicion[i][sub]);
                }
            }
        }
      } 
      modifica = index;
      $("#exampleModal").modal("show");

  }




  function validaHora(horaIngresada)
{
    let hora = horaIngresada;
 	if (hora=="") {
        $("#exampleModalLabelMsg").text("Debe ingresar una Hora para poder registrar");
        alert("pera");
	}
}

