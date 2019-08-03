// Generated from c:\Users\Acer\Documents\GitHub\Joker-Discord-Chat-Bot\commands\inc\time.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by timeParser.
function timeListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

timeListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
timeListener.prototype.constructor = timeListener;

// Enter a parse tree produced by timeParser#time.
timeListener.prototype.enterTime = function(ctx) {
};

// Exit a parse tree produced by timeParser#time.
timeListener.prototype.exitTime = function(ctx) {
};


// Enter a parse tree produced by timeParser#years.
timeListener.prototype.enterYears = function(ctx) {
};

// Exit a parse tree produced by timeParser#years.
timeListener.prototype.exitYears = function(ctx) {
};


// Enter a parse tree produced by timeParser#months.
timeListener.prototype.enterMonths = function(ctx) {
};

// Exit a parse tree produced by timeParser#months.
timeListener.prototype.exitMonths = function(ctx) {
};


// Enter a parse tree produced by timeParser#weeks.
timeListener.prototype.enterWeeks = function(ctx) {
};

// Exit a parse tree produced by timeParser#weeks.
timeListener.prototype.exitWeeks = function(ctx) {
};


// Enter a parse tree produced by timeParser#days.
timeListener.prototype.enterDays = function(ctx) {
};

// Exit a parse tree produced by timeParser#days.
timeListener.prototype.exitDays = function(ctx) {
};


// Enter a parse tree produced by timeParser#hours.
timeListener.prototype.enterHours = function(ctx) {
};

// Exit a parse tree produced by timeParser#hours.
timeListener.prototype.exitHours = function(ctx) {
};


// Enter a parse tree produced by timeParser#minutes.
timeListener.prototype.enterMinutes = function(ctx) {
};

// Exit a parse tree produced by timeParser#minutes.
timeListener.prototype.exitMinutes = function(ctx) {
};


// Enter a parse tree produced by timeParser#seconds.
timeListener.prototype.enterSeconds = function(ctx) {
};

// Exit a parse tree produced by timeParser#seconds.
timeListener.prototype.exitSeconds = function(ctx) {
};



exports.timeListener = timeListener;