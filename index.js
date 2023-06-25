let medicion=[];  

$(function(){


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
        $("#horaI").text(horaIngresada);
        $("#minI").text(minimaIngresada);
        $("#maxI").text(maximaIngresada);
 
        var nuevaMedicion = [ 
            horaIngresada,
            minimaIngresada,
            maximaIngresada
        ];

        medicion.push(nuevaMedicion);
        localStorage.setItem("medicion", JSON.stringify(medicion));
        actualizaMedicion();
    });
});


function actualizaMedicion() {
    //alert("si hay elemento agrego en tabla");

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

