
goog.provide('app');

var array = [
	{type: 'danger', text: '1'},
	{type: 'default', text: '2'},
	{type: 'success', text: '3'},
	{type: 'warning', text: '4'},
	{type: 'info', text: '5'}
];

app.preExecute = function() {

};

app.execute = function() {
	return bootstrap.components.buttonGroup({'buttons': array});
};

app.postExecute = function() {
	
};
