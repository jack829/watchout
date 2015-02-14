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

var circles = gameboard.selectAll('circle')
                .data(enemyPositions)
                .enter()
                .append('circle');


circles.attr("cx",function(d,i){return enemyPositions[i].x})
        .attr("cy", function(d,i){return enemyPositions[i].y})
        .attr("r", 5)
        .style("fill", "black");



// var circles = svg.selectAll('circle')
//                 .data()
//                 .enter()
//                 .append('circle');


// var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

// var width = 960,
//     height = 500;

// var svg = d3.select('body').append('svg')
//         .attr('width', width)
//         .attr('height', height)
//         .append('g')
//         .attr('transform', 'translate(32, ' + (height / 2) + ')');

// function update(data) {
//   var text = svg.selectAll('text').data(data);

//   text.attr('class', 'enter');

//   text.enter().append('text')
//       .attr('class', 'enter')
//       .attr('x', function(d, i) {return i * 32;})
//       .attr('dy', '.35em');

//   text.text(function(d) { return d; });

//   text.exit().remove();
// }

// update(alphabet);

// setInterval(function() {
//   update(shuffle(alphabet)
//     .slice(0, Math.floor(Math.random() * 26))
//     .sort());
// }, 1500);

// function shuffle(array) {
//   var m = array.length, t, i;
//   while (m) {
//     i = Math.floor(Math.random() * m--);
//     t = array[m], array[m] = array[i], array[i] = t;
//   }
//   return array;
// }
