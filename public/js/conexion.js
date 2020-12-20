
const socket = io();


let mensaje = document.getElementById('mensaje');
let enviar = document.getElementById('enviar');
let output = document.getElementById('output');
let accion = document.getElementById('accion');
let usuario;
let num;
socket.on('user servidor', function(data){
    usuario = data;
});

enviar.addEventListener('click', function(){
    if((usuario!='') && mensaje.value!=''){
        socket.emit('mensaje',{
            Usuario: usuario,
            Mensaje: mensaje.value
        })
    }
    
});

mensaje.addEventListener('keypress', function(){
    socket.emit('escribiendo', usuario);
});

socket.on('mensaje servidor', function (data){
    accion.innerHTML = '';
    output.innerHTML +=  `<p> 
    <strong>${data.Usuario}</strong>: ${data.Mensaje}
    </p>`
});

socket.on('escribiendo servidor', function(data){
    accion.innerHTML = `<p><em>${data} esta escribiendo</em></p>`
});