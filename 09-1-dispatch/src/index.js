import {select,path,event,mouse,dispatch} from 'd3';
import './style.css';

const div = select('.container')
	.append('div')
	.classed('module',true);
const w = div.node().clientWidth;
const h = div.node().clientHeight;
const plot = div.append('svg')
	.attr('width',w)
	.attr('height',h);

//Draw shapes
const circle = plot.append('g')
	.attr('transform',`translate(${w/4},${h/2})`)
	.append('circle')
	.attr('r',w/16);
const square = plot.append('g')
	.attr('transform',`translate(${w/4*2},${h/2})`)
	.append('rect')
	.attr('x',-w/16)
	.attr('y',-w/16)
	.attr('width',w/8)
	.attr('height',w/8);
const triangle = plot.append('g')
	.attr('transform',`translate(${w/4*3},${h/2})`)
	.append('path');
const pathData = path(); //d3.path(), line 1 import path from d3
pathData.moveTo(0,-w/16);
pathData.lineTo(w/16,w/16);
pathData.lineTo(-w/16,w/16);
pathData.lineTo(0,-w/16);
triangle.attr('d',pathData.toString());

//Basic d3 event API
//selection.on(eventType, callback)
/*
circle.on('click',function(d){
	console.log(d);
	console.log(this); //this ==> undefined
	console.log(event);
});

document.querySelector('circle').addEventListener('click', function(e){
	console.log(e);
})

square
	.on('mouseenter',function(d){
		console.log(this);
	})
	.on('mouseleave', d => {
		console.log(this);
	});

//On mouseenter
//Turn circle red

circle
	.on('mouseenter', function(d){
		select(this).transition().style('fill', 'pink');
		square.transition().style('fill', 'pink');
		triangle.transition().style('fill', 'pink');
	})
	.on('mouseleave', function(d){
		select(this).transition().style('fill', 'black');
		square.transition().style('fill', 'black');
		triangle.transition().style('fill', 'black');
	})

//Turn square green

square
	.on('mouseenter.foo',function(d){
		select(this).style('fill',"lightblue");
	})
	.on('mouseleave', function(d) {
		select(this).style('fill', 'black');
	});


//square
//	.on('.foo', null); //remove square fill color


//Turn triangle blue

triangle
	.on('mouseenter', function(d){
		select(this).style('fill', "#DDA0DD");
	})
	.on('mouseleave', function(d){
		select(this).style('fill', 'black')
	})


//How do we make these three elements interact among themselves?

*/

// d3.dispatch //factory, function
// dispatcher //instance

const dispatcher = dispatch('element:changeColor');

circle
	.on('mouseenter', () => {dispatcher.call('element:changeColor', null, 'red');})//broadcast to the dispatch that mousenter event occurred
	.on('mouseleave', () => {dispatcher.call('element:changeColor', null, 'black');})
square
	.on('mouseenter', () => {dispatcher.call('element:changeColor', null, 'green');})
	.on('mouseleave', () => {dispatcher.call('element:changeColor', null, 'black');})
triangle
	.on('mouseenter', () => {dispatcher.call('element:changeColor', null, 'blue');})
	.on('mouseleave', () => {dispatcher.call('element:changeColor', null, 'black');})

dispatcher.on('element:changeColor', function(arg){
	square.transition().style('fill', arg);
	triangle.transition().style('fill', arg);
	circle.transition().style('fill', arg);
})

//dispatch broadcasts event back out to all the subscribers



























