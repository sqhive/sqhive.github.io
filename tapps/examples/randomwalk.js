/**
 * Random Walk Tadapp
 * @author: Me
 */

goog.provide('app');

goog.require('goog.object');
goog.require('goog.dom');
goog.require('goog.graphics');

var step = 10,
	offset = 25;

var current 
	= previous
	= null;

var container
	= size
	= canvas
	= cursor
	= segment
	= null;

var strokes = null;

app.preExecute = function() {
	ta.general().setTitle('Random Walk');
	canvas = new goog.graphics.CanvasGraphics(step, step);
	strokes =  [
		new goog.graphics.Stroke(1, '#1ABC9C'),
		new goog.graphics.Stroke(1, 'black')
	];
	var vs = goog.dom.getViewportSize();
	size = {x: vs.width-offset, y: vs.height-offset};
};

app.execute = function() {
	return html.components.div({id: 'container'});
};

app.postExecute = function() {
	container = goog.dom.$('container');
	size.x = container.clientWidth;
	current = previous = {x: Math.round(size.x/2), y: Math.round(size.y/2)};
		
	canvas.render(container);
	canvas.setSize(size.x, size.y);
	cursor = canvas.drawEllipse(current.x, current.y, 5, 5, strokes[1]);
	app.loop();
};

app.loop = function() {
	setTimeout(function() {
		app.random();
		app.walk();
		app.loop();
	}, 100);
};

app.random = function () {
	var random = [
		Math.round(Math.random()) ? 'x' : 'y',
		Math.round(Math.random())
	];
	previous = goog.object.clone(current);
	current[random[0]] +=
		(current[random[0]] > step) ?
			(current[random[0]] > size[random[0]] - 2*step) ?
				-step : step*Math.pow(-1, random[1])
			: step;
};

app.walk = function() {
	var fill = new goog.graphics.SolidFill('blue');
    canvas.drawRect(
		previous.x > current.x ? current.x : previous.x,
		previous.y > current.y ? current.y : previous.y,
		Math.abs(current.x - previous.x),
		Math.abs(current.y - previous.y),
		strokes[0],
		fill
	);
	cursor.setCenter(current.x, current.y);
};
