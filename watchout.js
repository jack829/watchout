var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
};

var gameStats = {
  score: 0,
  bestScore: 0
};

var axes = {
  x: d3.scale.linear().domain([0,100]).range([0,gameOptions.width]),
  y: d3.scale.linear().domain([0,100]).range([0,gameOptions.height])
}

var createEnemies = function() {
  var enemyData = [];
  for (var i = 0; i < gameOptions.nEnemies; i++) {
    var enemy = {};
    enemy.id = i;
    enemy.x = Math.random() * gameOptions.width;
    enemy.y = Math.random() * gameOptions.height;
    enemyData.push(enemy);
  }

  return enemyData;
};  

var createPlayer = function(){
  var playerData = [];
  var player = {};
  player.x = gameOptions.width/2;
  player.y = gameOptions.height/2;
  playerData.push(player);
  return playerData;
};

var dragCircle = d3.behavior.drag()
    .on('drag', function (d, i) {
    d.cx += d3.event.dx;
    d.cy += d3.event.dy;
    d3.select('circle.player').attr('cx', d.cx).attr('cy', d.cy);
});

var gameboard = d3.select('body').append('svg')
                  .attr('width', gameOptions.width)
                  .attr('height', gameOptions.height);
                  

var originalPlayer = createPlayer();
//debugger;

var player = gameboard.selectAll('circle')
                .data(originalPlayer)
                .enter()
                .append('circle')
                .attr("class", "player")
                .attr("cx", function(d){return d.x;})
                .attr("cy", function(d){return d.y;})
                .attr('r', 10)
                .style("fill", "red")
                .call(dragCircle);
//debugger;
var enemyPositions = createEnemies(); 

var enemies = gameboard.selectAll('circle')
                .data(enemyPositions)
                .enter()
                .append('circle')
                .attr("class", "enemy")
                .attr("cx", function(d,i){return enemyPositions[i].x})
                .attr("cy", function(d,i){return enemyPositions[i].y})
                .attr("r", 5)
                .style("fill", "black");



var gameTurn = function() {
  var newPositions = createEnemies();

  gameboard.selectAll('circle.enemy')
            .data(newPositions)
            .transition()
            .attr("cx", function(d, i){return newPositions[i].x})
            .attr("cy", function(d, i){return newPositions[i].y})
            .duration(2000);
};

gameTurn();
setInterval(gameTurn, 2000);






