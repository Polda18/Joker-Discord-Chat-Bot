// Generated from c:\Users\Acer\Documents\GitHub\Joker-Discord-Chat-Bot\commands\inc\time.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0002\u0002,\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
    "\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t",
    "\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0003\u0002\u0003\u0002\u0007",
    "\u0002\u0018\n\u0002\f\u0002\u000e\u0002\u001b\u000b\u0002\u0003\u0003",
    "\u0003\u0003\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003\u0006",
    "\u0003\u0006\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0003\t\u0003\t",
    "\u0003\n\u0003\n\u0002\u0002\u000b\u0003\u0002\u0005\u0002\u0007\u0002",
    "\t\u0002\u000b\u0002\r\u0002\u000f\u0002\u0011\u0002\u0013\u0002\u0003",
    "\u0002\f\u0003\u00023;\u0003\u00022;\u0004\u0002[[{{\u0004\u0002OOo",
    "o\u0004\u0002YYyy\u0004\u0002FFff\u0004\u0002JJjj\u0004\u0002KKkk\u0004",
    "\u0002PPpp\u0004\u0002UUuu\u0002#\u0003\u0015\u0003\u0002\u0002\u0002",
    "\u0005\u001c\u0003\u0002\u0002\u0002\u0007\u001e\u0003\u0002\u0002\u0002",
    "\t \u0003\u0002\u0002\u0002\u000b\"\u0003\u0002\u0002\u0002\r$\u0003",
    "\u0002\u0002\u0002\u000f&\u0003\u0002\u0002\u0002\u0011(\u0003\u0002",
    "\u0002\u0002\u0013*\u0003\u0002\u0002\u0002\u0015\u0019\t\u0002\u0002",
    "\u0002\u0016\u0018\t\u0003\u0002\u0002\u0017\u0016\u0003\u0002\u0002",
    "\u0002\u0018\u001b\u0003\u0002\u0002\u0002\u0019\u0017\u0003\u0002\u0002",
    "\u0002\u0019\u001a\u0003\u0002\u0002\u0002\u001a\u0004\u0003\u0002\u0002",
    "\u0002\u001b\u0019\u0003\u0002\u0002\u0002\u001c\u001d\t\u0004\u0002",
    "\u0002\u001d\u0006\u0003\u0002\u0002\u0002\u001e\u001f\t\u0005\u0002",
    "\u0002\u001f\b\u0003\u0002\u0002\u0002 !\t\u0006\u0002\u0002!\n\u0003",
    "\u0002\u0002\u0002\"#\t\u0007\u0002\u0002#\f\u0003\u0002\u0002\u0002",
    "$%\t\b\u0002\u0002%\u000e\u0003\u0002\u0002\u0002&\'\t\t\u0002\u0002",
    "\'\u0010\u0003\u0002\u0002\u0002()\t\n\u0002\u0002)\u0012\u0003\u0002",
    "\u0002\u0002*+\t\u000b\u0002\u0002+\u0014\u0003\u0002\u0002\u0002\u0004",
    "\u0002\u0019\u0002"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

function timeLexer(input) {
	antlr4.Lexer.call(this, input);
    this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    return this;
}

timeLexer.prototype = Object.create(antlr4.Lexer.prototype);
timeLexer.prototype.constructor = timeLexer;

Object.defineProperty(timeLexer.prototype, "atn", {
        get : function() {
                return atn;
        }
});

timeLexer.EOF = antlr4.Token.EOF;

timeLexer.prototype.channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];

timeLexer.prototype.modeNames = [ "DEFAULT_MODE" ];

timeLexer.prototype.literalNames = [  ];

timeLexer.prototype.symbolicNames = [  ];

timeLexer.prototype.ruleNames = [ "INT", "Y", "M", "W", "D", "H", "I", "N", 
                                  "S" ];

timeLexer.prototype.grammarFileName = "time.g4";



exports.timeLexer = timeLexer;

