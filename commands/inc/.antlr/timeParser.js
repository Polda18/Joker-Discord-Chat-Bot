// Generated from c:\Users\Acer\Documents\GitHub\Joker-Discord-Chat-Bot\commands\inc\time.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');
var timeListener = require('./timeListener').timeListener;
var timeVisitor = require('./timeVisitor').timeVisitor;

var grammarFileName = "time.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\u000bH\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0003\u0002\u0005\u0002\u0014\n\u0002\u0003\u0002",
    "\u0005\u0002\u0017\n\u0002\u0003\u0002\u0005\u0002\u001a\n\u0002\u0003",
    "\u0002\u0005\u0002\u001d\n\u0002\u0003\u0002\u0005\u0002 \n\u0002\u0003",
    "\u0002\u0005\u0002#\n\u0002\u0003\u0002\u0005\u0002&\n\u0002\u0003\u0003",
    "\u0003\u0003\u0005\u0003*\n\u0003\u0003\u0004\u0003\u0004\u0005\u0004",
    ".\n\u0004\u0003\u0005\u0003\u0005\u0005\u00052\n\u0005\u0003\u0006\u0003",
    "\u0006\u0005\u00066\n\u0006\u0003\u0007\u0003\u0007\u0005\u0007:\n\u0007",
    "\u0003\b\u0003\b\u0003\b\u0003\b\u0005\b@\n\b\u0003\t\u0003\t\u0005",
    "\tD\n\t\u0005\tF\n\t\u0003\t\u0002\u0002\n\u0002\u0004\u0006\b\n\f\u000e",
    "\u0010\u0002\u0002\u0002N\u0002\u0013\u0003\u0002\u0002\u0002\u0004",
    ")\u0003\u0002\u0002\u0002\u0006-\u0003\u0002\u0002\u0002\b1\u0003\u0002",
    "\u0002\u0002\n5\u0003\u0002\u0002\u0002\f9\u0003\u0002\u0002\u0002\u000e",
    "?\u0003\u0002\u0002\u0002\u0010E\u0003\u0002\u0002\u0002\u0012\u0014",
    "\u0005\u0004\u0003\u0002\u0013\u0012\u0003\u0002\u0002\u0002\u0013\u0014",
    "\u0003\u0002\u0002\u0002\u0014\u0016\u0003\u0002\u0002\u0002\u0015\u0017",
    "\u0005\u0006\u0004\u0002\u0016\u0015\u0003\u0002\u0002\u0002\u0016\u0017",
    "\u0003\u0002\u0002\u0002\u0017\u0019\u0003\u0002\u0002\u0002\u0018\u001a",
    "\u0005\b\u0005\u0002\u0019\u0018\u0003\u0002\u0002\u0002\u0019\u001a",
    "\u0003\u0002\u0002\u0002\u001a\u001c\u0003\u0002\u0002\u0002\u001b\u001d",
    "\u0005\n\u0006\u0002\u001c\u001b\u0003\u0002\u0002\u0002\u001c\u001d",
    "\u0003\u0002\u0002\u0002\u001d\u001f\u0003\u0002\u0002\u0002\u001e ",
    "\u0005\f\u0007\u0002\u001f\u001e\u0003\u0002\u0002\u0002\u001f \u0003",
    "\u0002\u0002\u0002 \"\u0003\u0002\u0002\u0002!#\u0005\u000e\b\u0002",
    "\"!\u0003\u0002\u0002\u0002\"#\u0003\u0002\u0002\u0002#%\u0003\u0002",
    "\u0002\u0002$&\u0005\u0010\t\u0002%$\u0003\u0002\u0002\u0002%&\u0003",
    "\u0002\u0002\u0002&\u0003\u0003\u0002\u0002\u0002\'(\u0007\u0003\u0002",
    "\u0002(*\u0007\u0004\u0002\u0002)\'\u0003\u0002\u0002\u0002)*\u0003",
    "\u0002\u0002\u0002*\u0005\u0003\u0002\u0002\u0002+,\u0007\u0003\u0002",
    "\u0002,.\u0007\u0005\u0002\u0002-+\u0003\u0002\u0002\u0002-.\u0003\u0002",
    "\u0002\u0002.\u0007\u0003\u0002\u0002\u0002/0\u0007\u0003\u0002\u0002",
    "02\u0007\u0006\u0002\u00021/\u0003\u0002\u0002\u000212\u0003\u0002\u0002",
    "\u00022\t\u0003\u0002\u0002\u000234\u0007\u0003\u0002\u000246\u0007",
    "\u0007\u0002\u000253\u0003\u0002\u0002\u000256\u0003\u0002\u0002\u0002",
    "6\u000b\u0003\u0002\u0002\u000278\u0007\u0003\u0002\u00028:\u0007\b",
    "\u0002\u000297\u0003\u0002\u0002\u00029:\u0003\u0002\u0002\u0002:\r",
    "\u0003\u0002\u0002\u0002;<\u0007\u0003\u0002\u0002<=\u0007\u0005\u0002",
    "\u0002=>\u0007\t\u0002\u0002>@\u0007\n\u0002\u0002?;\u0003\u0002\u0002",
    "\u0002?@\u0003\u0002\u0002\u0002@\u000f\u0003\u0002\u0002\u0002AC\u0007",
    "\u0003\u0002\u0002BD\u0007\u000b\u0002\u0002CB\u0003\u0002\u0002\u0002",
    "CD\u0003\u0002\u0002\u0002DF\u0003\u0002\u0002\u0002EA\u0003\u0002\u0002",
    "\u0002EF\u0003\u0002\u0002\u0002F\u0011\u0003\u0002\u0002\u0002\u0011",
    "\u0013\u0016\u0019\u001c\u001f\"%)-159?CE"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [  ];

var symbolicNames = [ null, "INT", "Y", "M", "W", "D", "H", "I", "N", "S" ];

var ruleNames =  [ "time", "years", "months", "weeks", "days", "hours", 
                   "minutes", "seconds" ];

function timeParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

timeParser.prototype = Object.create(antlr4.Parser.prototype);
timeParser.prototype.constructor = timeParser;

Object.defineProperty(timeParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

timeParser.EOF = antlr4.Token.EOF;
timeParser.INT = 1;
timeParser.Y = 2;
timeParser.M = 3;
timeParser.W = 4;
timeParser.D = 5;
timeParser.H = 6;
timeParser.I = 7;
timeParser.N = 8;
timeParser.S = 9;

timeParser.RULE_time = 0;
timeParser.RULE_years = 1;
timeParser.RULE_months = 2;
timeParser.RULE_weeks = 3;
timeParser.RULE_days = 4;
timeParser.RULE_hours = 5;
timeParser.RULE_minutes = 6;
timeParser.RULE_seconds = 7;

function TimeContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = timeParser.RULE_time;
    return this;
}

TimeContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
TimeContext.prototype.constructor = TimeContext;

TimeContext.prototype.years = function() {
    return this.getTypedRuleContext(YearsContext,0);
};

TimeContext.prototype.months = function() {
    return this.getTypedRuleContext(MonthsContext,0);
};

TimeContext.prototype.weeks = function() {
    return this.getTypedRuleContext(WeeksContext,0);
};

TimeContext.prototype.days = function() {
    return this.getTypedRuleContext(DaysContext,0);
};

TimeContext.prototype.hours = function() {
    return this.getTypedRuleContext(HoursContext,0);
};

TimeContext.prototype.minutes = function() {
    return this.getTypedRuleContext(MinutesContext,0);
};

TimeContext.prototype.seconds = function() {
    return this.getTypedRuleContext(SecondsContext,0);
};

TimeContext.prototype.enterRule = function(listener) {
    if(listener instanceof timeListener ) {
        listener.enterTime(this);
	}
};

TimeContext.prototype.exitRule = function(listener) {
    if(listener instanceof timeListener ) {
        listener.exitTime(this);
	}
};

TimeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof timeVisitor ) {
        return visitor.visitTime(this);
    } else {
        return visitor.visitChildren(this);
    }
};




timeParser.TimeContext = TimeContext;

timeParser.prototype.time = function() {

    var localctx = new TimeContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, timeParser.RULE_time);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 17;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,0,this._ctx);
        if(la_===1) {
            this.state = 16;
            this.years();

        }
        this.state = 20;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
        if(la_===1) {
            this.state = 19;
            this.months();

        }
        this.state = 23;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
        if(la_===1) {
            this.state = 22;
            this.weeks();

        }
        this.state = 26;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,3,this._ctx);
        if(la_===1) {
            this.state = 25;
            this.days();

        }
        this.state = 29;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,4,this._ctx);
        if(la_===1) {
            this.state = 28;
            this.hours();

        }
        this.state = 32;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,5,this._ctx);
        if(la_===1) {
            this.state = 31;
            this.minutes();

        }
        this.state = 35;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
        if(la_===1) {
            this.state = 34;
            this.seconds();

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function YearsContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = timeParser.RULE_years;
    return this;
}

YearsContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
YearsContext.prototype.constructor = YearsContext;

YearsContext.prototype.INT = function() {
    return this.getToken(timeParser.INT, 0);
};

YearsContext.prototype.Y = function() {
    return this.getToken(timeParser.Y, 0);
};

YearsContext.prototype.enterRule = function(listener) {
    if(listener instanceof timeListener ) {
        listener.enterYears(this);
	}
};

YearsContext.prototype.exitRule = function(listener) {
    if(listener instanceof timeListener ) {
        listener.exitYears(this);
	}
};

YearsContext.prototype.accept = function(visitor) {
    if ( visitor instanceof timeVisitor ) {
        return visitor.visitYears(this);
    } else {
        return visitor.visitChildren(this);
    }
};




timeParser.YearsContext = YearsContext;

timeParser.prototype.years = function() {

    var localctx = new YearsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, timeParser.RULE_years);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 39;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
        if(la_===1) {
            this.state = 37;
            this.match(timeParser.INT);
            this.state = 38;
            this.match(timeParser.Y);

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function MonthsContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = timeParser.RULE_months;
    return this;
}

MonthsContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
MonthsContext.prototype.constructor = MonthsContext;

MonthsContext.prototype.INT = function() {
    return this.getToken(timeParser.INT, 0);
};

MonthsContext.prototype.M = function() {
    return this.getToken(timeParser.M, 0);
};

MonthsContext.prototype.enterRule = function(listener) {
    if(listener instanceof timeListener ) {
        listener.enterMonths(this);
	}
};

MonthsContext.prototype.exitRule = function(listener) {
    if(listener instanceof timeListener ) {
        listener.exitMonths(this);
	}
};

MonthsContext.prototype.accept = function(visitor) {
    if ( visitor instanceof timeVisitor ) {
        return visitor.visitMonths(this);
    } else {
        return visitor.visitChildren(this);
    }
};




timeParser.MonthsContext = MonthsContext;

timeParser.prototype.months = function() {

    var localctx = new MonthsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, timeParser.RULE_months);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 43;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,8,this._ctx);
        if(la_===1) {
            this.state = 41;
            this.match(timeParser.INT);
            this.state = 42;
            this.match(timeParser.M);

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function WeeksContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = timeParser.RULE_weeks;
    return this;
}

WeeksContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
WeeksContext.prototype.constructor = WeeksContext;

WeeksContext.prototype.INT = function() {
    return this.getToken(timeParser.INT, 0);
};

WeeksContext.prototype.W = function() {
    return this.getToken(timeParser.W, 0);
};

WeeksContext.prototype.enterRule = function(listener) {
    if(listener instanceof timeListener ) {
        listener.enterWeeks(this);
	}
};

WeeksContext.prototype.exitRule = function(listener) {
    if(listener instanceof timeListener ) {
        listener.exitWeeks(this);
	}
};

WeeksContext.prototype.accept = function(visitor) {
    if ( visitor instanceof timeVisitor ) {
        return visitor.visitWeeks(this);
    } else {
        return visitor.visitChildren(this);
    }
};




timeParser.WeeksContext = WeeksContext;

timeParser.prototype.weeks = function() {

    var localctx = new WeeksContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, timeParser.RULE_weeks);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 47;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,9,this._ctx);
        if(la_===1) {
            this.state = 45;
            this.match(timeParser.INT);
            this.state = 46;
            this.match(timeParser.W);

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function DaysContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = timeParser.RULE_days;
    return this;
}

DaysContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
DaysContext.prototype.constructor = DaysContext;

DaysContext.prototype.INT = function() {
    return this.getToken(timeParser.INT, 0);
};

DaysContext.prototype.D = function() {
    return this.getToken(timeParser.D, 0);
};

DaysContext.prototype.enterRule = function(listener) {
    if(listener instanceof timeListener ) {
        listener.enterDays(this);
	}
};

DaysContext.prototype.exitRule = function(listener) {
    if(listener instanceof timeListener ) {
        listener.exitDays(this);
	}
};

DaysContext.prototype.accept = function(visitor) {
    if ( visitor instanceof timeVisitor ) {
        return visitor.visitDays(this);
    } else {
        return visitor.visitChildren(this);
    }
};




timeParser.DaysContext = DaysContext;

timeParser.prototype.days = function() {

    var localctx = new DaysContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, timeParser.RULE_days);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 51;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,10,this._ctx);
        if(la_===1) {
            this.state = 49;
            this.match(timeParser.INT);
            this.state = 50;
            this.match(timeParser.D);

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function HoursContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = timeParser.RULE_hours;
    return this;
}

HoursContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HoursContext.prototype.constructor = HoursContext;

HoursContext.prototype.INT = function() {
    return this.getToken(timeParser.INT, 0);
};

HoursContext.prototype.H = function() {
    return this.getToken(timeParser.H, 0);
};

HoursContext.prototype.enterRule = function(listener) {
    if(listener instanceof timeListener ) {
        listener.enterHours(this);
	}
};

HoursContext.prototype.exitRule = function(listener) {
    if(listener instanceof timeListener ) {
        listener.exitHours(this);
	}
};

HoursContext.prototype.accept = function(visitor) {
    if ( visitor instanceof timeVisitor ) {
        return visitor.visitHours(this);
    } else {
        return visitor.visitChildren(this);
    }
};




timeParser.HoursContext = HoursContext;

timeParser.prototype.hours = function() {

    var localctx = new HoursContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, timeParser.RULE_hours);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 55;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,11,this._ctx);
        if(la_===1) {
            this.state = 53;
            this.match(timeParser.INT);
            this.state = 54;
            this.match(timeParser.H);

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function MinutesContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = timeParser.RULE_minutes;
    return this;
}

MinutesContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
MinutesContext.prototype.constructor = MinutesContext;

MinutesContext.prototype.INT = function() {
    return this.getToken(timeParser.INT, 0);
};

MinutesContext.prototype.M = function() {
    return this.getToken(timeParser.M, 0);
};

MinutesContext.prototype.I = function() {
    return this.getToken(timeParser.I, 0);
};

MinutesContext.prototype.N = function() {
    return this.getToken(timeParser.N, 0);
};

MinutesContext.prototype.enterRule = function(listener) {
    if(listener instanceof timeListener ) {
        listener.enterMinutes(this);
	}
};

MinutesContext.prototype.exitRule = function(listener) {
    if(listener instanceof timeListener ) {
        listener.exitMinutes(this);
	}
};

MinutesContext.prototype.accept = function(visitor) {
    if ( visitor instanceof timeVisitor ) {
        return visitor.visitMinutes(this);
    } else {
        return visitor.visitChildren(this);
    }
};




timeParser.MinutesContext = MinutesContext;

timeParser.prototype.minutes = function() {

    var localctx = new MinutesContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, timeParser.RULE_minutes);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 61;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,12,this._ctx);
        if(la_===1) {
            this.state = 57;
            this.match(timeParser.INT);
            this.state = 58;
            this.match(timeParser.M);
            this.state = 59;
            this.match(timeParser.I);
            this.state = 60;
            this.match(timeParser.N);

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function SecondsContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = timeParser.RULE_seconds;
    return this;
}

SecondsContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
SecondsContext.prototype.constructor = SecondsContext;

SecondsContext.prototype.INT = function() {
    return this.getToken(timeParser.INT, 0);
};

SecondsContext.prototype.S = function() {
    return this.getToken(timeParser.S, 0);
};

SecondsContext.prototype.enterRule = function(listener) {
    if(listener instanceof timeListener ) {
        listener.enterSeconds(this);
	}
};

SecondsContext.prototype.exitRule = function(listener) {
    if(listener instanceof timeListener ) {
        listener.exitSeconds(this);
	}
};

SecondsContext.prototype.accept = function(visitor) {
    if ( visitor instanceof timeVisitor ) {
        return visitor.visitSeconds(this);
    } else {
        return visitor.visitChildren(this);
    }
};




timeParser.SecondsContext = SecondsContext;

timeParser.prototype.seconds = function() {

    var localctx = new SecondsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, timeParser.RULE_seconds);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 67;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===timeParser.INT) {
            this.state = 63;
            this.match(timeParser.INT);
            this.state = 65;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===timeParser.S) {
                this.state = 64;
                this.match(timeParser.S);
            }

        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


exports.timeParser = timeParser;
