// Generated from c:\Users\Acer\Documents\GitHub\Joker-Discord-Chat-Bot\commands\inc\time.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by timeParser.

function timeVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

timeVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
timeVisitor.prototype.constructor = timeVisitor;

// Visit a parse tree produced by timeParser#time.
timeVisitor.prototype.visitTime = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by timeParser#years.
timeVisitor.prototype.visitYears = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by timeParser#months.
timeVisitor.prototype.visitMonths = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by timeParser#weeks.
timeVisitor.prototype.visitWeeks = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by timeParser#days.
timeVisitor.prototype.visitDays = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by timeParser#hours.
timeVisitor.prototype.visitHours = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by timeParser#minutes.
timeVisitor.prototype.visitMinutes = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by timeParser#seconds.
timeVisitor.prototype.visitSeconds = function(ctx) {
  return this.visitChildren(ctx);
};



exports.timeVisitor = timeVisitor;