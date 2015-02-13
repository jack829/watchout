var gameOptions = {
  heigth: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
};

var gameStats = {
  score: 0,
  bestScore: 0
};

var size = {
  h: 450,
  w: 700
}

var dataset = [2, 5, 8, 11];

var svg = d3.select('body').append('svg')
        .attr('width', 700)
        .attr('height', 450);
     


var circles = svg.selectAll('circle')
                .data(dataset)
                .enter()
                .append('circle');

circles.attr('cx', function(d, i){
                return (i * 50) + 25;
        })
        .attr('cy', size.h/2)
        .attr('r', function(d) {
                return d;
        });                
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
