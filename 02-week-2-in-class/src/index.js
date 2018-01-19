import * as d3 from 'd3';
//Install bootstrap first, using npm install bootstrap --save
//import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import parse from './parse';

console.log('Week 2 in class ...');

/*
//Part 1: review d3-selection
//https://github.com/d3/d3-selection

//Select elements
const moduleSelection = d3.select('.module')
const divSelection = d3.select('div')

// console.log(divSelection);
// console.log(moduleSelection);
// console.log(moduleSelection.node()); //node

//Selection vs DOMNode

//Modifying selection
const rednode = moduleSelection
	.append('div')
	.attr('class','new new-div')
	.style('width','100px')
	.style('heigh','200px')
	.style('background','red')
	.html('thanks');
const greennode = rednode
	.append('div')
	.style('width','20px')
	.style('height','20px')
	.style('background','green')
	.classed('green-node',true)
	.classed('new-div',false)
	.classed('new',true);

console.log(greennode);
console.log(rednode);

//Handle events
rednode.on('click', function(){

	console.log('red box has been clicked');
});
greennode.on('click', function(){
	d3.event.stopPropagation();
});

const divSelection2 = d3.select('body')
	.selectAll('div');

console.log(divSelection2.size());

//Control flow: .each and .call
divSelection2.each(function(d,i,nodes){
	//callback
	console.group();

	console.log(d) //datum
	console.log(i)	//index
	console.log(nodes) //group
	console.log(this); //node

	console.groupEnd();
});
*/


//Data binding


//Import and parse data
d3.csv('./data/hubway_trips_reduced.csv', parse, function(err,trips){

	//Data transformation, discovery, and mining
	console.log(trips);

	const tripsByStation0 = d3.nest()
		.key(function(d){return d.station0 })
		.entries(trips);

	const tripVolumeByStation0 = tripsByStation0.map(function(d){
	/**
	d = {
		key:'22'
		value: [...]
	}
	**/
		return {
			station: d.key,
			volume: d.values.length
		};
	});
	

	console.log(tripVolumeByStation0);

	//mine for macimum
	const maxVolume = d3.max(tripVolumeByStation0, function(d){
		return d.volume;
	});
	console.log(maxVolume);

	//visual space neas
	const margin = {t:100, r:100, b:100, l:100};
	const padding = 3;
	const w = d3.select('.module').node().clientWidth;
	const h = d3.select('.module').node().clientHeight;
	const _w = w - margin.l - margin.r;
	const _h = h - margin.t - margin.b;
	console.log(w,h);

	//Scale
	const scaleX = d3.scaleLinear().domain([0,maxVolume]).range([0,w]);



	//Represent / DOM manipulation
	const svgNode = d3.select('.module')
		.append('svg')
		.attr('width', w)
		.attr('height', h); //selection
	const plat = svgNode
		.append('g')
		.attr('class', 'chart')
		.attr('transform', `translate(${margin.l}, ${margin.t})`);
	console.log(svgNode.node());
	
	const stationNodes = plat.selectAll('.station') //selection of 0 element
		.data(tripVolumeByStation0)
		.enter() //special selection, of deficit between DOM and data points in the array, size in this case is 142.
		.append('g')
		.attr('class', 'station')
		.attr('transform', function(d,i){
			return `translate(0, ${i*_h/tripVolumeByStation0.length})`
		}); //selection of <g.station> x 142

	stationNodes
		.append('rect')
		.attr('width', function(d){
			return scaleX(d.volume);
		})
		.attr('height', _h/tripVolumeByStation0.length - padding)
		.style('fill','red');

	stationNodes
		.append('text')
		.text(function(d){
			return d.station;
		})
		.attr('text-anchor', 'end')
		.style('font-size', '6px');
});





















