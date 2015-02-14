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

  cx : gameOptions.width/2,
  cy : gameOptions.height/2
  
}

var dragCircle = d3.behavior.drag()
    .on('drag', function (d, i) {
    d.cx += d3.event.dx;
    d.cy += d3.event.dy;
    d3.select('circle.player').attr('cx', d.cx).attr('cy', d.cy);
});

var gameboard = d3.select('body').append('svg')
                  .attr('width', gameOptions.width)
                  .attr('height', gameOptions.height);
                  


//debugger;

var player = gameboard.selectAll('circle')
                .data([player])
                .enter()
                .append('circle')
                .attr("class", "player")
                .attr("cx", function(d){return d.cx;})
                .attr("cy", function(d){return d.cy;})
                .attr('r', 10)
                .call(dragCircle)
                .style("fill", "red");
//debugger;


var placeenemies = gameboard.selectAll('circle.update')
                .data(enemies)
                .enter()
                .append('circle')
                .attr("cx", function(d,i){return d.cx})
                .attr("cy", function(d,i){return d.cy})
                .attr("r", 5)
                .style("fill", "black");



var update = function(data) {

  placeenemies.attr('class','update')
            .transition().duration(2000)
            .attr("cx", function(d){return d.x = Math.random() * gameOptions.width})
            .attr("cy", function(d){return d.y = Math.random() * gameOptions.height});
            
};

update(enemies);
//debugger;
setInterval(function(){update(enemies);}, 2000);






