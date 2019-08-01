module.exports = (mods, switches) => {
    // Check the correct time format: 1y2m3w4d5h6min7s [modifiers order only]

    // All modifiers are contained
    if(switches.y && switches.m && switches.w && switches.d && switches.h && switches.min && switches.s) {
        // Check the right order (the positions of the modifiers)
        if(mods.y > mods.m || mods.m > mods.w || mods.w > mods.d || mods.d > mods.h || mods.h > mods.min || mods.min > mods.s)
            // Incorrect order => error = 
            return false;
    }

    // One modifier missing
    if(!switches.y && switches.m && switches.w && switches.d && switches.h && switches.min && switches.s) {
        // Years modifier not included
        if(mods.m > mods.w || mods.w > mods.d || mods.d > mods.h || mods.h > mods.min || mods.min > mods.s)
            return false;
    }
    if(switches.y && !switches.m && switches.w && switches.d && switches.h && switches.min && switches.s) {
        // Months modifier not included
        if(mods.y > mods.w || mods.w > mods.d || mods.d > mods.h || mods.h > mods.min || mods.min > mods.s)
            return false;
    }
    if(switches.y && switches.m && !switches.w && switches.d && switches.h && switches.min && switches.s) {
        // Weeks modifier not included
        if(mods.y > mods.m || mods.m > mods.d || mods.d > mods.h || mods.h > mods.min || mods.min > mods.s)
            return false;
    }
    if(switches.y && switches.m && switches.w && !switches.d && switches.h && switches.min && switches.s) {
        // Days modifier not included
        if(mods.y > mods.m || mods.m > mods.w || mods.w > mods.h || mods.h > mods.min || mods.min > mods.s)
            return false;
    }
    if(switches.y && switches.m && switches.w && switches.d && !switches.h && switches.min && switches.s) {
        // Hours modifier not included
        if(mods.y > mods.m || mods.m > mods.w || mods.w > mods.d || mods.d > mods.min || mods.min > mods.s)
            return false;
    }
    if(switches.y && switches.m && switches.w && switches.d && switches.h && !switches.min && switches.s) {
        // Minutes modifier not included
        if(mods.y > mods.m || mods.m > mods.w || mods.w > mods.d || mods.d > mods.h || mods.h > mods.s)
            return false;
    }
    if(switches.y && switches.m && switches.w && switches.d && switches.h && switches.min && !switches.s) {
        // Seconds modifier not included
        if(mods.y > mods.m || mods.m > mods.w || mods.w > mods.d || mods.d > mods.h || mods.h > mods.min)
            return false;
    }
    
    // Two modifiers missing (years and another)
    if(!switches.y && !switches.m && switches.w && switches.d && switches.h && switches.min && switches.s) {
        // Years and months modifiers not included
        if(mods.w > mods.d || mods.d > mods.h || mods.h > mods.min || mods.min > mods.s)
            return false;
    }
    if(!switches.y && switches.m && !switches.w && switches.d && switches.h && switches.min && switches.s) {
        // Years and weeks modifiers not included
        if(mods.m > mods.d || mods.d > mods.h || mods.h > mods.min || mods.min > mods.s)
            return false;
    }
    if(!switches.y && switches.m && switches.w && !switches.d && switches.h && switches.min && switches.s) {
        // Years and days modifiers not included
        if(mods.m > mods.w || mods.w > mods.h || mods.h > mods.min || mods.min > mods.s)
            return false;
    }
    if(!switches.y && switches.m && switches.w && switches.d && !switches.h && switches.min && switches.s) {
        // Years and hours modifiers not included
        if(mods.m > mods.w || mods.w > mods.d || mods.d > mods.min || mods.min > mods.s)
            return false;
    }
    if(!switches.y && switches.m && switches.w && switches.d && switches.h && !switches.min && switches.s) {
        // Years and minutes modifiers not included
        if(mods.m > mods.w || mods.w > mods.d || mods.d > mods.h || mods.h > mods.s)
            return false;
    }
    if(!switches.y && switches.m && switches.w && switches.d && switches.h && switches.min && !switches.s) {
        // Years and seconds modifiers not included
        if(mods.m > mods.w || mods.w > mods.d || mods.d > mods.h || mods.h > mods.min)
            return false;
    }

    // Two modifiers missing (months and another)
    if(switches.y && !switches.m && !switches.w && switches.d && switches.h && switches.min && switches.s) {
        // Months and weeks modifiers not included (years not included already covered)
        if(mods.y > mods.d || mods.d > mods.h || mods.h > mods.min || mods.min > mods.s)
            return false;
    }
    if(switches.y && !switches.m && switches.w && !switches.d && switches.h && switches.min && switches.s) {
        // Months and days modifiers not included
        if(mods.y > mods.w || mods.w > mods.h || mods.h > mods.min || mods.min > mods.s)
            return false;
    }
    if(switches.y && !switches.m && switches.w && switches.d && !switches.h && switches.min && switches.s) {
        // Months and hours modifiers not included
        if(mods.y > mods.w || mods.w > mods.d || mods.d > mods.min || mods.min > mods.s)
            return false;
    }
    if(switches.y && !switches.m && switches.w && switches.d && switches.h && !switches.min && switches.s) {
        // Months and minutes modifiers not included
        if(mods.y > mods.w || mods.w > mods.d || mods.d > mods.h || mods.h > mods.s)
            return false;
    }
    if(switches.y && !switches.m && switches.w && switches.d && switches.h && switches.min && !switches.s) {
        // Months and seconds modifiers not included
        if(mods.y > mods.w || mods.w > mods.d || mods.d > mods.h || mods.h || mods.min)
            return false;
    }

    // Two modifiers missing (weeks and another)
    if(switches.y && switches.m && !switches.w && !switches.d && switches.h && switches.min && switches.s) {
        // Weeks and days modifiers not included (months already covered)
        if(mods.y > mods.m || mods.m > mods.h || mods.h > mods.min || mods.min > mods.s)
            return false;
    }
    if(switches.y && switches.m && !switches.w && switches.d && !switches.h && switches.min && switches.s) {
        // Weeks and hours modifiers not included
        if(mods.y > mods.m || mods.m > mods.d || mods.d > mods.min || mods.min > mods.s)
            return false;
    }
    if(switches.y && switches.m && !switches.w && switches.d && switches.h && !switches.min && switches.s) {
        // Weeks and minutes not included
        if(mods.y > mods.m || mods.m > mods.d || mods.d > mods.h || mods.h > mods.s)
            return false;
    }
    if(switches.y && switches.m && !switches.w && switches.d && switches.h && switches.min && !switches.s) {
        // Weeks and seconds not included
        if(mods.y > mods.m || mods.m > mods.d || mods.d > mods.h || mods.h > mods.min)
            return false;
    }

    // Two modifiers missing (days and another)
    if(switches.y && switches.m && switches.w && !switches.d && !switches.h && switches.min && switches.s) {
        // Days and hours not included (weeks already covered)
        if(mods.y > mods.m || mods.m > mods.w || mods.w > mods.min || mods.min > mods.s)
            return false;
    }
    if(switches.y && switches.m && switches.w && !switches.d && switches.h && !switches.min && switches.s) {
        // Days and minutes not included
        if(mods.y > mods.m || mods.m > mods.w || mods.w > mods.h || mods.h > mods.s)
            return false;
    }
    if(switches.y && switches.m && switches.w && !switches.d && switches.h && switches.min && !switches.s) {
        // Days and seconds not included
        if(mods.y > mods.m || mods.m > mods.w || mods.w > mods.h || mods.h > mods.min)
            return false;
    }

    // Two modifiers missing (hours and another)
    if(switches.y && switches.m && switches.w && switches.d && !switches.h && !switches.min && switches.s) {
        // Hours and minutes not included (days already covered)
        if(mods.y > mods.m || mods.m > mods.w || mods.w > mods.d || mods.d > mods.s)
            return false;
    }
    if(switches.y && switches.m && switches.w && switches.d && !switches.h && switches.min && !switches.s) {
        // Hours and seconds not included
        if(mods.y > mods.m || mods.m > mods.w || mods.w > mods.d || mods.d > mods.min)
            return false;
    }

    // Two modifiers missing (minutes and another)
    if(switches.y && switches.m && switches.w && switches.d && switches.h && !switches.min && !switches.s) {
        // Minutes and seconds not included (hours already covered)
        if(mods.y > mods.m || mods.m > mods.w || mods.w > mods.d || mods.d > mods.h)
            return false;
    }

    // Three modifiers missing (years, months and another)
    if(!switches.y && !switches.m && !switches.w && switches.d && switches.h && switches.min && switches.s) {
        // Years, months and weeks not included
        if(mods.d > mods.h || mods.h > mods.min || mods.min > mods.s)
            return false;
    }
    if(!switches.y && !switches.m && switches.w && !switches.d && switches.h && switches.min && switches.s) {
        // Years, months and days not included
        if(mods.w > mods.h || mods.h > mods.min || mods.min > mods.s)
            return false;
    }
    if(!switches.y && !switches.m && switches.w && switches.d && !switches.h && switches.min && switches.s) {
        // Years, months and hours not included
        if(mods.w > mods.d || mods.d > mods.min || mods.min > mods.s)
            return false;
    }
    if(!switches.y && !switches.m && switches.w && switches.d && switches.h && !switches.min && switches.s) {
        // Years, months and minutes not included
        if(mods.w > mods.d || mods.d > mods.h || mods.h > mods.s)
            return false;
    }
    if(!switches.y && !switches.m && switches.w && switches.d && switches.h && switches.min && !switches.s) {
        // Years, months and seconds not included
        if(mods.w > mods.d || mods.d > mods.h || mods.h > mods.min)
            return false;
    }

    // Three modifiers missing (years, weeks and another)
    if(!switches.y && switches.m && !switches.w && !switches.d && switches.h && switches.min && switches.s) {
        // Years, weeks and days not included (months already covered)
        if(mods.m > mods.h || mods.h > mods.min || mods.min > mods.s)
            return false;
    }
    if(!switches.y && switches.m && !switches.w && switches.d && !switches.h && switches.min && switches.s) {
        // Years, weeks and hours not included
        if(mods.m > mods.d || mods.d > mods.min || mods.min > mods.s)
            return false;
    }
    if(!switches.y && switches.m && !switches.w && switches.d && switches.h && !switches.min && switches.s) {
        // Years, weeks and minutes not included
        if(mods.m > mods.d || mods.d > mods.h || mods.h > mods.s)
            return false;
    }
    if(!switches.y && switches.m && !switches.w && switches.d && switches.h && switches.min && !switches.s) {
        // Years, weeks and seconds not included
        if(mods.m > mods.d || mods.d > mods.h || mods.h > mods.min)
            return false;
    }

    // Three modifiers missing (years, days and another)
    if(!switches.y && switches.m && switches.w && !switches.d && !switches.h && switches.min && switches.s) {
        // Years, days and hours not included (weeks alrady covered)
        if(mods.m > mods.w || mods.w > mods.min || mods.min > mods.s)
            return false;
    }
    if(!switches.y && switches.m && switches.w && !switches.d && switches.h && !switches.min && switches.s) {
        // Years, days and minutes not included
        if(mods.m > mods.w || mods.w > mods.h || mods.h > mods.s)
            return false;
    }
    if(!switches.y && switches.m && switches.w && !switches.d && switches.h && switches.min && !switches.s) {
        // Years, days and seconds not included
        if(mods.m > mods.w || mods.w > mods.h || mods.h > mods.min)
            return false;
    }

    // Three modifiers missing (years, hours and another)
    if(!switches.y && switches.m && switches.w && switches.d && !switches.h && !switches.min && switches.s) {
        // Years, hours and minutes not included
        if(mods.m > mods.w || mods.w > mods.d || mods.d > mods.s)
            return false;
    }
    if(!switches.y && switches.m && switches.w && switches.d && !switches.h && switches.min && !switches.s) {
        // Years, hours and seconds not included
        if(mods.m > mods.w || mods.w > mods.d || mods.d > mods.min)
            return false;
    }

    // Three modifiers missing (years, minutes and another)
    if(!switches.y && switches.m && switches.w && switches.d && switches.h && !switches.min && !switches.s) {
        // Years, minutes and seconds not included (hours already covered)
        if(mods.m > mods.w || mods.w > mods.d || mods.d > mods.h)
            return false;
    }

    // Three modifiers missing (months, weeks and another)
    if(switches.y && !switches.m && !switches.w && !switches.d && switches.h && switches.min && switches.s) {
        // Months, weeks and days not included (years already covered)
        if(mods.y > mods.h || mods.h > mods.min || mods.min > mods.s)
            return false;
    }
    if(switches.y && !switches.m && !switches.w && switches.d && !switches.h && switches.min && switches.s) {
        // Months, weeks and hours not included
        if(mods.y > mods.d || mods.d > mods.min || mods.min > mods.s)
            return false;
    }
    if(switches.y && !switches.m && !switches.w && switches.d && switches.h && !switches.min && switches.s) {
        // Months, weeks and minutes not included
        if(mods.y > mods.d || mods.d > mods.h || mods.h > mods.s)
            return false;
    }
    if(switches.y && !switches.m && !switches.w && switches.d && switches.h && switches.min && !switches.s) {
        // Months, weeks and seconds not included
        if(mods.y > mods.d || mods.d > mods.h || mods.h > mods.min)
            return false;
    }

    // Three modifiers missing (months, days and another)
    if(switches.y && !switches.m && switches.w && !switches.d && !switches.h && switches.min && switches.s) {
        // Months, days and hours not included (weeks already covered)
        if(mods.y > mods.w || mods.w > mods.min || mods.min > mods.s)
            return false;
    }
    if(switches.y && !switches.m && switches.w && !switches.d && switches.h && !switches.min && switches.s) {
        // Months, days and minutes not included
        if(mods.y > mods.w || mods.w > mods.h || mods.h > mods.s)
            return false;
    }
    if(switches.y && !switches.m && switches.w && !switches.d && switches.h && switches.min && !switches.s) {
        // Months, days and seconds not included
        if(mods.y > mods.w || mods.w > mods.h || mods.h > mods.min)
            return false;
    }

    // Three modifiers missing (months, hours and another)
    if(switches.y && !switches.m && switches.w && switches.d && !switches.h && !switches.min && switches.s) {
        // Months, hours and minutes not included (days already covered)
        if(mods.y > mods.w || mods.w > mods.d || mods.d > mods.s)
            return false;
    }
    if(switches.y && !switches.m && switches.w && switches.d && !switches.h && switches.min && !switches.s) {
        // Momths, hours and seconds not included
        if(mods.y > mods.w || mods.w > mods.d || mods.d > mods.min)
            return false;
    }

    // Three modifiers missing (months, minutes and another)
    if(switches.y && !switches.m && switches.w && switches.d && switches.h && !switches.min && !switches.s) {
        // Months, minutes and seconds not included (hours already covered)
        if(mods.y > mods.w || mods.w > mods.d || mods.d > mods.h)
            return false;
    }

    // Three modifiers missing (weeks, days and another)
    if(switches.y && switches.m && !switches.w && !switches.d && !switches.h && switches.min && switches.s) {
        // Weeks, days and hours not included (months already covered)
        if(mods.y > mods.m || mods.m > mods.min || mods.min > mods.s)
            return false;
    }
    if(switches.y && switches.m && !switches.w && !switches.d && switches.h && !switches.min && switches.s) {
        // Weeks, days and minutes not included
        if(mods.y > mods.m || mods.m > mods.h || mods.h > mods.s)
            return false;
    }
    if(switches.y && switches.m && !switches.w && !switches.d && switches.h && switches.min && !switches.s) {
        // Weeks, days and seconds not included
        if(mods.y > mods.m || mods.m > mods.h || mods.h > mods.min)
            return false;
    }

    // Three modifiers missing (weeks, hours and another)
    if(switches.y && switches.m && !switches.w && switches.d && !switches.h && !switches.min && switches.s) {
        // Weeks, hours and minutes not included (days already covered)
        if(mods.y > mods.m || mods.m > mods.d || mods.d > mods.s)
            return false;
    }
    if(switches.y && switches.m && !switches.w && switches.d && !switches.h && switches.min && !switches.s) {
        // Weeks, hours and seconds not included
        if(mods.y > mods.m || mods.m > mods.d || mods.d > mods.min)
            return false;
    }

    // Three modifiers missing (weeks, minutes and another)
    if(switches.y && switches.m && !switches.w && switches.d && switches.h && !switches.min && !switches.s) {
        // Weeks, minutes and seconds not included
        if(mods.y > mods.m || mods.m > mods.d || mods.d > mods.h)
            return false;
    }

    // Three modifiers missing (days, hours and another)
    if(switches.y && switches.m && switches.w && !switches.d && !switches.h && !switches.min && switches.s) {
        // Days, hours and minutes not included (weeks already covered)
        if(mods.y > mods.m || mods.m > mods.w || mods.w > mods.s)
            return false;
    }
    if(switches.y && switches.m && switches.w && !switches.d && !switches.h && switches.min && !switches.s) {
        // Days, hours and seconds not included
        if(mods.y > mods.m || mods.m > mods.w || mods.w > mods.min)
            return false;
    }

    // Three modifiers missing (days, minutes and another)
    if(switches.y && switches.m && switches.w && !switches.d && switches.h && !switches.min && !switches.s) {
        // Days, minutes and seconds not included (hours already covered)
        if(mods.y > mods.m || mods.m > mods.w || mods.w > mods.h)
            return false;
    }

    // Three modifiers missing (hours, minutes and seconds; days already covered)
    if(switches.y && switches.m && switches.w && switches.d && !switches.h && !switches.min && !switches.s) {
        if(mods.y > mods.m || mods.m > mods.w || mods.w > mods.d)
            return false;
    }

    // Four modifiers missing (years, months, weeks and another)
    // TODO: next statements

    // Four modifiers missing (years, months, days and another)
    // TODO: next statements

    // Four modifiers missing (years, months, hours and another)
    // TODO: next statements

    // Four modifiers missing (years, months, minutes and another)
    // TODO: next statements

    // Four modifiers missing (months, weeks, days and another)
    // TODO: next statements

    // Four modifiers missing (months, weeks, hours and another)
    // TODO: next statements

    // Four modifiers missing (months, weeks, minutes and another)
    // TODO: next statements

    // Four modifiers missing (weeks, days, hours and another)
    // TODO: next statements

    // Four modifiers missing (weeks, days, minutes and another)
    // TODO: next statements

    // Four modifiers missing (days, hours minutes and seconds; week already covered)
    // TODO: next statements

    // Five modifiers missing (years, months, weeks, days and another)
    // TODO: next statements

    // Fice modifiers missing (years, months, weeks, hours and another)
    // TODO: next statements

    // Five modifiers missing (years, months, weeks, minutes and another)
    // TODO: next statements

    // Five modifiers missing (months, weeks, days, hours and another)
    // TODO: next statements

    // Five modifiers missing (months, weeks, days, minutes and another)
    // TODO: next statements

    // Five modifiers missing (weeks, days, hours minutes and seconds; months already covered)
    // TODO: next statements

    // Six modifiers missing (years, months, weeks, days, hours and another)
    // TODO: next statements

    // Six modifiers missing (years, months, weeks, days, minutes and another)
    // TODO: next statements

    // Six modifiers missing (months, weeks, days, hours, minutes and seconds; years already covered)
    // TODO: next statements

    // All seven modifiers missing (years, months, weeks, days, hours, minutes and seconds) => default settings, only seconds => no error
    // No error occured, let's celebrate!
    return true;
}