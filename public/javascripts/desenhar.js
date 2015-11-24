



function CorRandomica() {
  
  return {
    vermelho: 0,
    verde: Math.random(),
    azul: Math.random(),
    alfa: ( Math.random() * 0.25 ) + 0.05
  };

}


function onMouseDrag(event) {

  
  var x = event.middlePoint.x;
  var y = event.middlePoint.y;
  
  // de acordo com a velocidade do mouse aumenta o raio
  //var raio = event.delta.length / 2;  
 
  var cor = CorRandomica();
 
  desenharCirculo( x, y, 10, cor );  
  
  emitCircle( x, y, 10, cor );

}


function desenharCirculo( x, y, raio, cor ) {
  
  var circle = new Path.Circle( new Point( x, y ), raio);
  circle.fillColor = new RgbColor( cor.vermelho, cor.verde, cor.azul, cor.alfa );
  
  view.draw();
}

function emitCircle( x, y, raio, cor ) {

  var sessionId = io.socket.sessionid;  
 
  var data = {
    x: x,
    y: y,
    raio: raio,
    cor: cor
  };
 
  io.emit('desenharCirculo', data, sessionId);
}

io.on( 'desenharCirculo', function( data ) {  
  desenharCirculo( data.x, data.y, data.raio, data.cor );  
})