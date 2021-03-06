import './style.css';
import {select} from 'd3';
import SomeModule from './some-module';

//Instantiate a module
const someModule = SomeModule();
select('.app-container')
	.append('div')
	.attr('class','module')
	.each(someModule);


//SCROLLMAGIC
//First, install scrollmagic using "npm install scrollmagic --save"
const Scrollmagic = require('scrollmagic');

//First, you need to create a Controller
const controller = new Scrollmagic.Controller();

//Then, you create a bunch of scenes
//Docs here: http://scrollmagic.io/docs/ScrollMagic.Scene.html#constructor
const scene1 = new Scrollmagic.Scene({
		triggerElement:'#scene-1'
	})
	.on('enter', () => {
		console.log('Scene-1:enter')
	})
	.addTo(controller);

const scene2 = new Scrollmagic.Scene({
		triggerElement:'#scene-2'
	})
	.on('enter', () => {
		console.log('Scene-2:enter')
		select('.app-container')
			.style('background','lightblue');

		someModule.changeState({
			x:300,
			y:500,
			r:30
		});

	})
	.on('leave', () => {
		console.log('Scene-2:end')
		select('.app-container')
			.style('background','pink');


		someModule.changeState({
			x:0,
			y:200,
			r:5
		});

	})
	.addTo(controller);

const scene3 = new Scrollmagic.Scene({
		triggerElement:'#scene-3'
	})
	.on('enter', () => {
		console.log('Scene-3:enter')
		select('.app-container')
			.style('background','yellow');

	})
	.on('leave', () => {
		console.log('Scene-3:end')
		select('.app-container')
			.style('background','lightblue');

	})
	.addTo(controller);



