import * as d3 from 'd3';
import './style/main.css';
import './style/stationSearch.css';

//Import utility function
import {parse, parse2} from './utils';

//Import modules
import Histogram from './components/Histogram';
import MainViz from './components/mainViz';

//Histogram
//
const timeline = Histogram()
	.domain([new Date(2013,0,1), new Date(2013,11,31)]) //11 = 12, year go 1 - 11, data go 1 - 31 or 30
	.value(d => d.t0)
	.thresholds(d3.timeMonth.range(new Date(2013,0,1), new Date(2013,11,31), 1))
	.tickXFormat(d => {
		return (new Date(d)).toUTCString();
	})
	.tickX(2);// number

//d3.select('#month-1').on('click', () => {d3.csv('file name', parse2, dataloaded(data loadeed is a function)})

//Histogram is factory function
const activityHistogram = Histogram()
	.thresholds(d3.range(0,24,.5))
	.domain([0,24])
	.value(d => d.time_of_day0)
	.tickXFormat(d => {
			const time = +d;
			const hour = Math.floor(time);
			let min = Math.round((time-hour)*60);
			min = String(min).length === 1? "0"+ min : min;
			return `${hour}:${min}`
		})
	.maxY(1000);

const mainViz = MainViz(); //a closure

d3.csv('./data/hubway_trips_reduced.csv', parse, (err,trips) => {

	d3.select('#time-of-the-day-main')
		.datum(trips)
		.each(activityHistogram);

	d3.select('#timeline-main')
		.datum(trips)
		.each(timeline);

	d3.select('.main')
		.datum(trips)
		.each(mainViz);

});








