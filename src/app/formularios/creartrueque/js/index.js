var separador = document.getElementById('separadorMiles');
console.log("imprime separador", separador)
separador.addEventListener('keyup', (e) =>{
    console.log("muestro la entrada del campo valor ", entrada); 
    var entrada= e.target.value.split('.').join('');
    entrada = entrada.split('').reverse();
    var salida = [];
    var aux = '';
    console.log("muestro la entrada del campo valor ", entrada); 
    var paginador = Math.ceil(entrada.lenght / 3 );
    console.log("muestro la paginación ", paginador); 
    for(let i= 0; i<paginador; i++)
    {
        for(let j=0; j<3; j++){
            if(entrada[j+(i*3)]!=undefined){
                aux+=entrada[j+(i*3)];

            }
        }
        salida.push(aux);
        console.log("muestro la paginación ", aux); 
        aux='';
        e.target.value=salida.join('.').split("").reverse().join('')
    }
   
}, false);

