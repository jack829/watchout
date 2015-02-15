var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
};

var score = 0;
var bestScore = 0;
var collisionCount = 0;

var updateScores = function() {
  d3.select('.scoreboard .high span').text(bestScore);
  d3.select('.scoreboard .current span').text(score);
  d3.select('.scoreboard .collisions span').text(collisionCount);
};

var numEnemies = gameOptions.nEnemies
var enemies =function(numEnemies){
  var enemyArray = []
  for (var i = 0; i < numEnemies; i++){
    var single = {};
      single.id = i;
      single.x = Math.random() * gameOptions.width;
      single.y = Math.random() * gameOptions.height;
      enemyArray.push(single);
    }
  return enemyArray;
}(numEnemies);  
//debugger;

var player = {

  x : gameOptions.width/2,
  y : gameOptions.height/2
  
}

var dragCircle = d3.behavior.drag()
    .on('drag', function (d, i) {
    d.x += d3.event.dx;
    d.y += d3.event.dy;
    d3.select('circle.player').attr('cx', d.x).attr('cy', d.y);
});

var gameboard = d3.select('body').append('svg')
                  .attr('width', gameOptions.width)
                  .attr('height', gameOptions.height);
                  


//debugger;

var player1 = gameboard.selectAll('circle')
                .data([player])
                .enter()
                .append('circle')
                .attr("class", "player")
                .attr("cx", function(d){return d.x;})
                .attr("cy", function(d){return d.y;})
                .attr('r', 10)
                .call(dragCircle)
                .style("fill", "red");
//debugger;


var placeenemies = gameboard.selectAll('circle.update')
                .data(enemies)
                .enter()
                .append("svg:image")
                .attr('x',function(d,i){return d.x})
                .attr('y',function(d,i){return d.y})
                .attr('width', 20)
                .attr('height', 24)
                .attr("xlink:href", "Shuriken.png");
                // .attr("cx", function(d,i){return d.x})
                // .attr("cy", function(d,i){return d.y})
                // .attr("r", 10)
                // //.style("fill", "black")
                // .style("background-image", "url('asteroid.png)");



var update = function(data) {
  data.transition().duration(2000)
            .attr("x", function(d){return d.x = Math.random() * gameOptions.width})
            .attr("y", function(d){return d.y = Math.random() * gameOptions.height})
            .each('end', function(){
              update(d3.select(this));
            });       
};

update(placeenemies);
//debugger;
//setInterval(function(){update(enemies);}, 2000);

var scoreTicker = function() {
  score = score + 1;
  bestScore = Math.max(score, bestScore);
  updateScores();
}
setInterval(scoreTicker, 100);

var prevCollision = false;

var detectCollisions = function() {
  var collision = false;
  placeenemies.each(function() {
    var cx = d3.select(this).attr('x');
    var cy = d3.select(this).attr('y');
    var x = cx - player.x;
    var y = cy - player.y;
    if (Math.sqrt(x*x + y*y) < 20) {
      collision = true;
    }
  });

//debugger;
  if (collision) {
    score = 0;
    if (prevCollision != collision) {
      collisionCount = collisionCount + 1;
    } 
  }
  prevCollision = collision;
};

d3.timer(detectCollisions);









