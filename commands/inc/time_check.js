module.exports.time_check = (mods, switches) => {
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
    if(!switches.y && !switches.m && !switches.w && !switches.d && switches.h && switches.min && switches.s) {
        // Years, months, weeks and days not included
        if(mods.h > mods.min || mods.min > mods.s)
            return false;
    }
    if(!switches.y && !switches.m && !switches.w && switches.d && !switches.h && switches.min && switches.s) {
        // Years, months, weeks and hours not included
        if(mods.d > mods.min || mods.min > mods.s)
            return false;
    }
    if(!switches.y && !switches.m && !switches.w && switches.d && switches.h && !switches.min && switches.s) {
        // Years, months, weeks and minutes not included
        if(mods.d > mods.h || mods.h > mods.s)
            return false;
    }
    if(!switches.y && !switches.m && !switches.w && switches.d && switches.h && switches.min && !switches.s) {
        // Years, months, weeks and seconds not included
        if(mods.d > mods.h || mods.h > mods.min)
            return false;
    }

    // Four modifiers missing (years, months, days and another)
    if(!switches.y && !switches.m && switches.w && !switches.d && !switches.h && switches.min && switches.s) {
        // Years, months, days and hours not included (weeks already covered)
        if(mods.w > mods.min || mods.min > mods.s)
            return false;
    }
    if(!switches.y && !switches.m && switches.w && !switches.d && switches.h && !switches.min && switches.s) {
        // Years, months, days and minutes not included
        if(mods.w > mods.h || mods.h > mods.s)
            return false;
    }
    if(!switches.y && !switches.m && switches.w && !switches.d && switches.h && switches.min && !switches.s) {
        // Yers, months, days and seconds not included
        if(mods.w > mods.h || mods.h > mods.min)
            return false;
    }

    // Four modifiers missing (years, months, hours and another)
    if(!switches.y && !switches.m && switches.w && switches.d && !switches.h && !switches.min && switches.s) {
        // Years, months, hours and minutes not included (days already covered)
        if(mods.w > mods.d || mods.d > mods.s)
            return false;
    }
    if(!switches.y && !switches.m && switches.w && switches.d && !switches.h && switches.min && !switches.s) {
        // Years, months, hours and seconds not included
        if(mods.w > mods.d || mods.d > mods.min)
            return false;
    }

    // Four modifiers missing (years, months, minutes and another)
    if(!switches.y && !switches.m && switches.w && switches.d && switches.h && !switches.min && !switches.s) {
        // Years, months, minutes and seconds not included (hours already covered)
        if(mods.w > mods.d || mods.d > mods.h)
            return false;
    }

    // Four modifiers missing (years, weeks, days and another)
    if(!switches.y && switches.m && !switches.w && !switches.d && !switches.h && switches.min && switches.s) {
        // Years, weeks, days and hours not included (months already covered)
        if(mods.m > mods.min || mods.min > mods.s)
            return false;
    }
    if(!switches.y && switches.m && !switches.w && !switches.d && switches.h && !switches.min && switches.s) {
        // Years, weeks, days and minutes not included
        if(mods.m > mods.h || mods.h > mods.s)
            return false;
    }
    if(!switches.y && switches.m && !switches.w && !switches.d && switches.h && switches.min && !switches.s) {
        // Years, weeks, days and seconds not included
        if(mods.m > mods.h || mods.h > mods.min)
            return false;
    }

    // Four modifiers missing (years, weeks, hours and another)
    if(!switches.y && switches.m && !switches.w && switches.d && !switches.h && !switches.min && switches.s) {
        // Years, weeks, hours and minutes not included (days already covered)
        if(mods.m > mods.d || mods.d > mods.s)
            return false;
    }
    if(!switches.y && switches.m && !switches.w && switches.d && !switches.h && switches.min && !switches.s) {
        // Years, weeks, hours and seconds not included
        if(mods.m > mods.d || mods.d > mods.min)
            return false;
    }

    // Four modifiers missing (years, weeks, minutes and another)
    if(!switches.y && switches.m && !switches.w && switches.d && switches.h && !switches.min && !switches.s) {
        // Years, weeks, minutes and seconds not included (hours already covered)
        if(mods.m > mods.d || mods.d > mods.h)
            return false;
    }

    // Four modifiers missing (years, days, hours and another)
    if(!switches.y && switches.m && switches.w && !switches.d && !switches.h && !switches.min && switches.s) {
        // Years, days, hours and minutes not included (weeks already covered)
        if(mods.m > mods.w || mods.w > mods.s)
            return false;
    }
    if(!switches.y && switches.m && switches.w && !switches.d && !switches.h && switches.min && !switches.s) {
        // Years, days, hours and seconds not included
        if(mods.m > mods.w || mods.w > mods.min)
            return false;
    }

    // Four modifiers missing (years, days, minutes and another)
    if(!switches.y && switches.m && switches.w && !switches.d && switches.h && !switches.min && !switches.s) {
        // Years, days, minutes and seconds not included (hours already covered)
        if(mods.m > mods.w || mods.w > mods.h)
            return false;
    }

    // Four modifiers missing (years, hours, minutes and another)
    if(!switches.y && switches.m && switches.w && switches.d && !switches.h && !switches.min && !switches.s) {
        // Years, hours, minutes and seconds not included (days already covered)
        if(mods.m > mods.w || mods.w > mods.d)
            return false;
    }

    // Four modifiers missing (months, weeks, days and another)
    if(switches.y && !switches.m && !switches.w && !switches.d && !switches.h && switches.min && switches.s) {
        // Months, weeks, days and hours not included (years already covered)
        if(mods.y > mods.min || mods.min > mods.s)
            return false;
    }
    if(switches.y && !switches.m && !switches.w && !switches.d && switches.h && !switches.min && switches.s) {
        // Months, weeks, days and minutes not included
        if(mods.y > mods.h || mods.h > mods.s)
            return false;
    }
    if(switches.y && !switches.m && !switches.w && !switches.d && switches.h && switches.min && !switches.s) {
        // Months, weeks, days and seconds not included
        if(mods.y > mods.h || mods.h > mods.min)
            return false;
    }

    // Four modifiers missing (months, weeks, hours and another)
    if(switches.y && !switches.m && !switches.w && switches.d && !switches.h && !switches.min && switches.s) {
        // Months, weeks, hours and minutes not included (days already covered)
        if(mods.y > mods.d || mods.d > mods.s)
            return false;
    }
    if(switches.y && !switches.m && !switches.w && switches.d && !switches.h && switches.min && !switches.s) {
        // Months, weeks, hours and seconds not included
        if(mods.y > mods.d || mods.d > mods.min)
            return false;
    }

    // Four modifiers missing (months, weeks, minutes and another)
    if(switches.y && !switches.m && !switches.w && switches.d && switches.h && !switches.min && !switches.s) {
        // Months, weeks, minutes and seconds not included (hours already covered)
        if(mods.y > mods.d || mods.d > mods.h)
            return false;
    }

    // Four modifiers missing (months, days, hours and another)
    if(switches.y && !switches.m && switches.w && !switches.d && !switches.h && !switches.min && switches.s) {
        // Months, days, hours and minutes not included (weeks already covered)
        if(mods.y > mods.w || mods.w > mods.s)
            return false;
    }
    if(switches.y && !switches.m && switches.w && !switches.d && !switches.h && switches.min && !switches.s) {
        // Months, days, hours and seconds not included
        if(mods.y > mods.w || mods.w > mods.min)
            return false;
    }

    // Four modifiers missing (months, days, minutes and another)
    if(switches.y && !switches.m && switches.w && !switches.d && switches.h && !switches.min && !switches.s) {
        // Months, days, minutes and seconds not included (hours already covered)
        if(mods.y > mods.w || mods.w > mods.h)
            return false;
    }

    // Four modifiers missing (months, hours, minutes and another)
    if(switches.y && !switches.m && switches.w && switches.d && !switches.h && !switches.min && !switches.s) {
        // Months, hours, minutes and seconds not included (days already covered)
        if(mods.y > mods.w || mods.w > mods.d)
            return false;
    }

    // Four modifiers missing (weeks, days, hours and another)
    if(switches.y && switches.m && !switches.w && !switches.d && !switches.h && !switches.min && switches.s) {
        // Weeks, days, hours and minutes not included (months already covered)
        if(mods.y > mods.m || mods.m > mods.s)
            return false;
    }
    if(switches.y && switches.m && !switches.w && !switches.d && !switches.h && switches.min && !switches.s) {
        // Weeks, days, hours and seconds not included
        if(mods.y > mods.m || mods.m > mods.min)
            return false;
    }

    // Four modifiers missing (weeks, days, minutes and another)
    if(switches.y && switches.m && !switches.w && !switches.d && switches.h && !switches.min && !switches.s) {
        // Weeks, days, minutes and seconds not included (hours already covered)
        if(mods.y > mods.m || mods.m > mods.h)
            return false;
    }

    // Four modifiers missing (weeks, hours, minutes and another)
    if(switches.y && switches.m && !switches.w && switches.d && !switches.h && !switches.min && !switches.s) {
        // Weeks, hours, minutes and seconds not included (days already covered)
        if(mods.y > mods.m || mods.m > mods.d)
            return false;
    }

    // Four modifiers missing (days, hours minutes and seconds; weeks already covered)
    if(switches.y && switches.m && switches.w && !switches.d && !switches.h && !switches.min && !switches.s) {
        if(mods.y > mods.m || mods.m > mods.w)
            return false;
    }

    // Five modifiers missing (years, months, weeks, days and another)
    if(!switches.y && !switches.m && !switches.w && !switches.d && !switches.h && switches.min && switches.s) {
        // Years, months, weeks, days and hours not included
        if(mods.min > mods.s)
            return false;
    }
    if(!switches.y && !switches.m && !switches.w && !switches.d && switches.h && !switches.min && switches.s) {
        // Years, months, weeks, days and minutes not included
        if(mods.h > mods.s)
            return false;
    }
    if(!switches.y && !switches.m && !switches.w && !switches.d && switches.h && switches.min && !switches.s) {
        // Years, months, weeks, days and seconds not included
        if(mods.h > mods.min)
            return false;
    }

    // Five modifiers missing (years, months, weeks, hours and another)
    if(!switches.y && !switches.m && !switches.w && switches.d && !switches.h && !switches.min && switches.s) {
        // Years, months, weeks, hours and minutes not included (days already covered)
        if(mods.d > mods.s)
            return false;
    }
    if(!switches.y && !switches.m && !switches.w && switches.d && !switches.h && switches.min && !switches.s) {
        // Years, months, weeks, hours and seconds not included
        if(mods.d > mods.min)
            return false;
    }

    // Five modifiers missing (years, months, weeks, minutes and another)
    if(!switches.y && !switches.m && !switches.w && switches.d && switches.h && !switches.min && !switches.s) {
        // Years, months, weeks, minutes and seconds not included (hours already covered)
        if(mods.d > mods.h)
            return false;
    }

    // Five modifiers missing (years, weeks, days, hours and another)
    if(!switches.y && switches.m && !switches.w && !switches.d && !switches.h && !switches.min && switches.s) {
        // Years, weeks, days, hours and minutes not included (months already covered)
        if(mods.m > mods.s)
            return false;
    }
    if(!switches.y && switches.m && !switches.w && !switches.d && !switches.h && switches.min && !switches.s) {
        // Years, weeks, days, hours and seconds not included
        if(mods.m > mods.min)
            return false;
    }

    // Five modifiers missing (years, weeks, days, minutes and another)
    if(!switches.y && switches.m && !switches.w && !switches.d && switches.h && !switches.min && !switches.s) {
        // Years, weeks, days, minutes and seconds not included (hours already covered)
        if(mods.m > mods.h)
            return false;
    }

    // Five modifiers missing (years, days, hours, minutes and another)
    if(!switches.y && switches.m && switches.w && !switches.d && !switches.h && !switches.min && !switches.s) {
        // Years, days, hours, minutes and seconds not included (weeks already covered)
        if(mods.m > mods.w)
            return false;
    }

    // Five modifiers missing (months, weeks, days, hours and another)
    if(switches.y && !switches.m && !switches.w && !switches.d && !switches.h && !switches.min && switches.s) {
        // Months, weeks, days, hours and minutes not included (years already covered)
        if(mods.y > mods.s)
            return false;
    }
    if(switches.y && !switches.m && !switches.w && !switches.d && !switches.h && switches.min && !switches.s) {
        // Months, weeks, days, hours and seconds not included
        if(mods.y > mods.min)
            return false;
    }

    // Five modifiers missing (months, weeks, days, minutes and another)
    if(switches.y && !switches.m && !switches.w && !switches.d && switches.h && !switches.min && !switches.s) {
        // Months, weeks, days, minutes and seconds not included (hours already covered)
        if(mods.y > mods.h)
            return false;
    }

    // Five modifiers missing (months, days, hours, minutes and another)
    if(switches.y && !switches.m && switches.w && !switches.d && !switches.h && !switches.min && !switches.s) {
        // Months, days, hours, minutes and seconds not included (weeks already covered)
        if(mods.y > mods.w)
            return false;
    }

    // Five modifiers missing (weeks, days, hours, minutes and seconds; months already covered)
    if(switches.y && switches.m && !switches.w && !switches.d && !switches.h && !switches.min && !switches.s) {
        if(mods.y > mods.m)
            return false;
    }

    // Six or all seven modifiers missing (years, months, weeks, days, hours, minutes and seconds)
    // If only one modifier is present, there's nothing to compare => no error
    // If no modifier is present, it's default in seconds => no error
    // If all order is right => no error
    return true;
}

module.exports.time_constants = {
    year: 3.1556926e10,
    month: 2.62974383e9,
    week: 604800000,
    day: 86400000,
    hour: 3600000,
    minute: 60000,
    second: 1000
}

module.exports.time_parse = (duration_string, error) => {
    // Prepare the constants of the duration time translation for milliseconds:
    let constants = this.time_constants;

    // Prepare the duration of the vote
    let duration = {
        years: 0,
        months: 0,
        weeks: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    };
    
    // Get the timestamp modifiers' positions (correct format is y < m < w < d < h < min < s, since string is read LTR)
    let mods = {
        y: duration_string.search(/y/i),
        m: duration_string.search(/m/i),
        w: duration_string.search(/w/i),
        d: duration_string.search(/d/i),
        h: duration_string.search(/h/i),
        min: duration_string.search(/min/i),
        s: duration_string.search(/s/i)
    };

    // Prepare switches for timestamp modifiers, basic all true;
    let switches = {
        y: true,
        m: true,
        w: true,
        d: true,
        h: true,
        min: true,
        s: true
    };

    // Check not found timestamp modifiers
    if(mods.y == -1)
        switches.y = false;
    if(mods.m == -1)
        switches.m = false;
    if(mods.w == -1)
        switches.w = false;
    if(mods.d == -1)
        switches.d = false;
    if(mods.h == -1)
        switches.h = false;
    if(mods.min == -1)
        switches.min = false;
    if(mods.s == -1)
        switches.s = false;
    
    // Since 'm' and 'min' start to same letter, 'm' might as well be found in 'min' => months are disabled
    if(mods.m == mods.min)
    switches.m = false;

    // Check the correct format: 1y2m3w4d5h6min7s [seconds do not need to end with 's'; no milliseconds]
    let error = !time_check(mods, switches);  // Negated, since the 'time_check()' function returns true for success, not failure

    // If an error occured, let's iterrupt right here and return null:
    if(error) return null;

    // Order modifiers positions from furthest to nearest and remove -1 positions (no positions)
    let modifiers_ordered = [];

    for(var key in mods) {
        if(!mods.hasOwnProperty(key)) continue;     // Ignore prototype keys

        if(mods[key] > -1) modifiers_ordered.push(mods[key]);
    }

    modifiers_ordered.sort((a, b) => {return a - b});

    // Get last modifier's position
    let last_modifier = modifiers_ordered[modifiers_ordered.length - 1];

    // Check last modifier (without seconds and data after)
    let last = {
        y: switches.y && duration_string.substring(last_modifier).length > 1,
        m: switches.m && duration_string.substring(last_modifier).length > 1,
        w: switches.w && duration_string.substring(last_modifier).length > 1,
        d: switches.d && duration_string.substring(last_modifier).length > 1,
        h: switches.h && duration_string.substring(last_modifier).length > 1,
        min: switches.min && duration_string.substring(last_modifier + 2).length > 1,   // Because 'min' has 3 letters, not 1
    };
    if(!switches.s && (last.y || last.m || last.w || last.d || last.h || last.min)) {
        // There's something after the last modifier: seconds defined
        switches.s = true;
    }

    // Count enabled switches
    let sw_count = 0;
    for(var key in switches) {
        if(!switches.hasOwnProperty(key)) continue;     // Ignore prototype keys

        if(switches[key]) ++sw_count;       // If true, increase counter
    }

    // Check number of switches against number of valid positions => remove unnecessary
    if(sw_count < modifiers_positions.length) {
        for(i = 0; i < modifiers_positions.length; ++i) {
            if(i > 0 && modifiers_positions[i] == modifier_position[i - 1]);
                modifiers_positions.splice(i, 1);
        }
    }

    // Fill in modified time string parsed to numbers
    let number = 0;
    let substr_position = 0;
        
    switch(modifiers_positions.length) {
        case 0:
            // Try to get a number and return error when not a number
            number = Number(duration_string);
            if(number == NaN) {
                error = true;
                return null;
            }

            // Place the number in correct field (seconds in this case)
            duration.s = number;
            break;
        case 1:
            // Determine the substring position by ... TODO
            // Try to get a number and return error when not a number
            number = Number(duration_string.substring(0, modifiers_positions[0]));
            if(number == NaN) {
                error = true;
                return null;
            }

            // Place the number in correct field
            if(switches.y) duration.y = number;
            if(switches.m) duration.m = number;
            if(switches.w) duration.w = number;
            if(switches.d) duration.d = number;
            if(switches.h) duration.h = number;
            if(switches.min) duration.min = number;
            if(switches.s) duration.s = number;
            break;
        case 2:
            
    }
    // TODO

    // Return the duration of the parsed time string
    return duration;
}

module.exports.time_str_build = (duration) => {
    // Let's prepare the individual pieces before joining them...
    let str_pieces = [
        (duration.y > 0) ? `${duration.y} year${(duration.y > 1) ? 's' : ''}` : '',
        (duration.m > 0) ? `${duration.m} month${(duration.m > 1) ? 's' : ''}` : '',
        (duration.w > 0) ? `${duration.w} week${(duration.w > 1) ? 's' : ''}` : '',
        (duration.d > 0) ? `${duration.d} day${(duration.d > 1) ? 's' : ''}` : '',
        (duration.h > 0) ? `${duration.h} hour${(duration.h > 1) ? 's' : ''}` : '',
        (duration.min > 0) ? `${duration.min} minute${(duration.min > 1) ? 's' : ''}` : '',
        (duration.s > 0) ? `${duration.s} second${(duration.s > 1) ? 's' : ''}` : ''
    ];

    // Remove empty strings
    for(i = 0; i < str_pieces.length; ++i) {
        if(str_pieces[i] == '') str_pieces.splice(i, 1);    // If there is an empty string, remove it from the array
    }

    // Build up the concatenated string: '1 year, 2 months, 3 weeks, 4 days, 5 hours, 6 minutes and 7 seconds'
    let time_string = '';

    for(i = 0; i < str_pieces.length; ++i) {
        switch(i) {
            case 0:
                time_string += str_pieces[i];
                break;
            case (str_pieces.length - 1):
                time_string += ` and ${str_pieces[i]}`;
                break;
            default:
                time_string += `, ${str_pieces[i]}`;
        }
    }

    // Return the built concatenated string:
    return time_string;
}