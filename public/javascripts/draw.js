



function randomCor() {
  
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
 
  var cor = randomCor();
 
  drawCircle( x, y, 10, cor );  
  
  emitCircle( x, y, 10, cor );

}


function drawCircle( x, y, raio, cor ) {
  
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
 
  io.emit('drawCircle', data, sessionId);
}

io.on( 'drawCircle', function( data ) {  
  drawCircle( data.x, data.y, data.raio, data.cor );  
})