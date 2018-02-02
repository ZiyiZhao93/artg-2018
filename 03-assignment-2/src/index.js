import * as d3 from 'd3';
//Install bootstrap first, using npm install bootstrap --save
//import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import parse from './parse';
import activityHistogram from './activityHistogram';

console.log('Week 3 assignment 2');

//Import and parse data
d3.csv('./data/hubway_trips_reduced.csv', parse, function(err,trips){

	//Nest trips by origin station
	const tripsByStation0 = d3.nest()
		//.key(function(d){ return d.station0 })
		.key(d => d.station0)
		.entries(trips);

	console.log(tripsByStation0);

	const stationNodes = d3.select('#timeline-multiple')
		.selectAll('.station-node')
		.data(tripsByStation0, d => key); //array size 142
	const stationNodesEnter = stationNodes.enter() //size 142
		.append('div') //do not append anything
		.style('width','300px')
		.style('height','180px')
		.style('float','left');
	stationNodes.exit().remove();
	stationNodes.merge(stationNodesEnter) //142
		.each(activityHistogram); //What arguments are we passing to activityHistogram?

});