'use strict';

function inicializar(){
   
    var tablero = crearArray();
    var arrayOrdenado = crearArray();       
    var start = document.querySelector('#start');
    var span = document.getElementsByTagName('span');
    var td = document.getElementsByTagName('td');
    var tiempo;
    var objetoMovido;
    var cont = 1;
    var cont2 = 0;
    var cont3 = 0;     

    function crearArray(){
        let tablero = new Array();
        let columna1 = [1,2,3,4];
        let columna2 = [5,6,7,8];
        let columna3 = [9,10,11,12];
        let columna4 = [13,14,15,0];
    
        tablero[0]=columna1;
        tablero[1]=columna2;
        tablero[2]=columna3;
        tablero[3]=columna4;
        return tablero;  
    }

    //eventos----------
    start.addEventListener('click',botonStart);
    for(let valor of td){
        valor.addEventListener('dragstart',eventoDrag);
        
    }
    //fin eventos------

    //funcion para ordenar
    function Desordenar(){
        var array = tablero.sort(function () { return Math.random() - 0.5 });
        let cont = 0;
        for(var i=0; i<array.length; i++){
            for(var j=0; j<array[i].length; j++){               
                td[cont].innerHTML = array[i][j];
                if(td[cont].innerHTML == '0'){
                    td[cont].style.background = 'white';
                }
                cont++;
            }
        }
    }    

    //funcion para el boton start
    function botonStart(){
        ponerVerdeTd();        
        this.disabled = true;
        tiempo = intervalo(cont,cont2);
        Desordenar();
        cambiarValoresArray();
    }

    function intervalo(cont,cont2){        
        let tiempo = setInterval(function(){
            if(cont==60){
                    cont=0;
                    cont2++;              
            }
            
            if(cont2==0){
                if(cont.toString().length==1){
                    span[1].innerHTML = `00:0${cont}`;
                }
                else{
                    span[1].innerHTML = `00:${cont}`;
                }                
            }            
            else{
                if(cont2.toString().length==1){
                    if(cont.toString().length==1){
                        span[1].innerHTML = `0${cont2}:0${cont}`;
                    }
                    else{
                        span[1].innerHTML = `0${cont2}:${cont}`;
                    }                    
                }
                else{
                    span[1].innerHTML = `${cont2}:${cont}`;
                }                
            }
            cont++;
        },1000);     
        return tiempo;   
    }

    //funcion de hacer click a las celdas
    function eventoDrag(){        
        let aux = this.id.split('_');
        let aux2 = aux[1];
        event.dataTransfer.setData("text", this.innerHTML);  
      
        if(td[parseInt(aux2)+1]){
            if( td[parseInt(aux2)+1].id == 'c_4' || td[parseInt(aux2)+1].id == 'c_8' || td[parseInt(aux2)+1].id == 'c_12'){
                //esta parte esta echa porque de la forma en la que lo estoy haciendo, las celdas de la derecha, el +1 seria la celda
                //izquierda de abajo y no deberia moverse alli
            }
            else if(td[parseInt(aux2)+1].innerHTML == '0' ){//el de la derecha               
                intercambiar(this, td[parseInt(aux2)+1]);               
            }
        }
        
        if(td[parseInt(aux2)-1]){
            if(td[parseInt(aux2)-1].innerHTML == '0'){//el de la izquierda              
                intercambiar(this,td[parseInt(aux2)-1]);
            }
        }

        if(td[parseInt(aux2)+4]){
            if(td[parseInt(aux2)+4].innerHTML == '0'){//el de a abajo              
                intercambiar(this,td[parseInt(aux2)+4]);
            }
        }

        if(td[parseInt(aux2)-4]){
            if(td[parseInt(aux2)-4].innerHTML == '0'){;//el de a arriva              
                intercambiar(this,td[parseInt(aux2)-4]);
            }
        }
    }

    //evento dragover
    function eventoDragober(){
        event.preventDefault();
    }

    //funcion intercambiar
    function intercambiar(celdaEscogida, celda){
        celda.addEventListener('dragover',eventoDragober);
        celda.addEventListener('drop',eventoDrop);
        objetoMovido = celdaEscogida;
    }

    //evento drop
    function eventoDrop(){    
        var data = event.dataTransfer.getData("text");     
        this.innerHTML = data;
        this.style.background = 'green';
        objetoMovido.style.background = 'white';
        objetoMovido.innerHTML= '0';
        this.removeEventListener('dragover',eventoDragober, false);
        this.removeEventListener('drop',eventoDrop, false);   
        cont3++;
        span[0].innerHTML = cont3;  
        cambiarValoresArray();  
        comprobarFinal();       
    }

    //funcion para comprobar si has ganado
    function comprobarFinal(){  
        if(arrayOrdenado.toString() == tablero.toString()) {
            alert('Has Ganado');
            cont3 = 0;
            clearInterval(tiempo);
            start.disabled = false;
            span[0].innerHTML = cont3;    
            cont=0;
            cont2=0; 
            span[1].innerHTML = `00:00`;
        }
      
    }

    //funcion para poner todos los td en verde(){
    function ponerVerdeTd(){
        for(var i=0; i<td.length; i++){
            td[i].style.background = 'green';
        }
    }

    //funcion para cambiar los valores del array table
    function cambiarValoresArray(){
        let cont = 0;
        for(var i=0; i<tablero.length; i++){
            for(var j=0; j<tablero[i].length; j++){   
                tablero[i][j] = td[cont].innerHTML;               
                cont++;
            }
        }   
    }
        
    
}