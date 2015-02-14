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

var gameboard = d3.select('body').append('svg')
        .attr('width', gameOptions.width)
        .attr('height', gameOptions.height);

var enemyPositions = createEnemies(); 

var enemies = gameboard.selectAll('circle')
                .data(enemyPositions)
                .enter()
                .append('circle');


enemies.attr("cx",function(d,i){return enemyPositions[i].x})
        .attr("cy", function(d,i){return enemyPositions[i].y})
        .attr("r", 5)
        .style("fill", "black");

var gameTurn = function() {
  var newPositions = createEnemies();

  gameboard.selectAll('circle')
            .data(newPositions)
            .attr("cx", function(d, i){return newPositions[i].x})
            .attr("cy", function(d, i){return newPositions[i].y})
            .transition()
            .duration(2000);
}

gameTurn();
setInterval(gameTurn, 2000);


