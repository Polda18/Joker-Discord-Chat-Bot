module.exports.INVALID_FORMAT = 1;
module.exports.INTERNAL_EXCEPTION = 2;
module.exports.TOO_BIG_TIME = 3;

module.exports.time_constants = {
    year: 31556952000,
    month: 2592000000,
    week: 604800000,
    day: 86400000,
    hour: 3600000,
    minute: 60000,
    second: 1000
};

module.exports.time_parse = (duration_string, error) => {
    // Prepare the duration of the vote
    let duration = {
        y: 0,
        m: 0,
        w: 0,
        d: 0,
        h: 0,
        min: 0,
        s: 0
    };

    // Define the regex to complete:
    let timeRegex = /^(?<y>[1-9][0-9]*y)?(?<m>[1-9][0-9]*m)?(?<w>[1-9][0-9]*w)?(?<d>[1-9][0-9]*d)?(?<h>[1-9][0-9]*h)?(?<min>[1-9][0-9]*min)?(?<s>[1-9][0-9]*s?)?$/i;
    
    // Match the string with the regex:
    if(duration_string.match(timeRegex) == null) {      // Regular expression didn't match
        error.r = this.INVALID_FORMAT;    // Set error flag
        return null;        // Return null instead of duration
    }

    let matches = duration_string.match(timeRegex).groups;

    // Check error:
    if(matches === null) {      // If matches are null, call this error
        error.r = this.INTERNAL_EXCEPTION;    // Set error flag
        return null;        // Return null instead of duration
    }

    // Let's count number of successful matches and parse them into our duration structure:
    let matches_count = 0;

    for(key in matches) {
        if(!Object.prototype.hasOwnProperty.call(matches, key)) continue;      // Ignore prototype keys

        if(matches[key] !== undefined) {
            duration[key] = parseInt(matches[key]);     // Parse the matched number to the duration
            if(duration[key] === NaN || duration[key] === null) {    // Number hasn't been parsed - unlikely, but better safe than sorry
                error.r = this.INTERNAL_EXCEPTION;        // Set error flag
                return null;            // Return null instead of duration
            }
            ++matches_count;            // Increase matches count
        }
    }

    // Check if the matches count is above zero:
    if(matches_count == 0) {
        error.r = this.INVALID_FORMAT;    // Set error flag
        return null;        // Return null instead of duration
    }

    // Does any of the defined time constants contain infinity or NaN?
    if(duration.y === Infinity || duration.y === NaN) error.r = this.TOO_BIG_TIME;
    if(duration.m === Infinity || duration.m === NaN) error.r = this.TOO_BIG_TIME;
    if(duration.w === Infinity || duration.w === NaN) error.r = this.TOO_BIG_TIME;
    if(duration.d === Infinity || duration.d === NaN) error.r = this.TOO_BIG_TIME;
    if(duration.h === Infinity || duration.h === NaN) error.r = this.TOO_BIG_TIME;
    if(duration.min === Infinity || duration.min === NaN) error.r = this.TOO_BIG_TIME;
    if(duration.s === Infinity || duration.s === NaN) error.r = this.TOO_BIG_TIME;

    // If there is some too big time, end it right here:
    if(error.r === this.TOO_BIG_TIME) return duration;      // Return the duration, because it is used by the test command

    // Check the values => years can be infinite, but months should only be less than year, etc.
    if(duration.y > 0 && duration.m >= 12) {
        // Years specified and months 12 or above
        error.r = this.INVALID_FORMAT;
        return null;
    }
    if(duration.m > 0 && duration.w >= 4) {
        // Months specified and weeks 4 or above (used before 52 weks, because 4 weeks in month)
        // I know that 4 weeks in not a full month, but it is approximately this number in integer format
        error.r = this.INVALID_FORMAT;
        return null;
    }
    if(duration.y > 0 && duration.w >= 52) {
        // Years specified and weeks 52 or above
        // I know that 52 weeks is not a full year, but it's closely aproximately this number in integer format
        error.r = this.INVALID_FORMAT;
        return null;
    }
    if(duration.w > 0 && duration.d >= 7) {
        // Weeks specified and days are 7 or above (used before 30 days in month, because 7 days in a week)
        error.r = this.INVALID_FORMAT;
        return null;
    }
    if(duration.m > 0 && duration.d >= 30) {
        // Months specified and days are 30 or above (used before 365 days in year, because 30 days in month)
        error.r = this.INVALID_FORMAT;
        return null;
    }
    if(duration.y > 0 && duration.d >= 365) {
        // Years specified and days are 365 or above
        error.r = this.INVALID_FORMAT;
        return null;
    }
    if(duration.d > 0 && duration.h >= 24) {
        // Days specified and hours 24 or above
        error.r = this.INVALID_FORMAT;
        return null;
    }
    if(duration.h > 0 && duration.min >= 60) {
        // Hours specified and minutes 60 or above
        error.r = this.INVALID_FORMAT;
        return null;
    }
    if(duration.min > 0 && duration.s >= 60) {
        // Minutes specified and seconds 60 or above (before hours, because 60 seconds in a minute)
        error.r = this.INVALID_FORMAT;
        return null;
    }
    if(duration.h > 0 && duration.s >= 3600) {
        // Hours specified and seconds 3600 or above
        error.r = this.INVALID_FORMAT;
        return null;
    }

    // Return the duration
    return duration;
};

module.exports.time_str_build = (duration) => {
    // Let's prepare the individual pieces before joining them...
    let str_pieces_original = [
        (duration.y > 0) ? `${duration.y} year${(duration.y > 1) ? 's' : ''}` : null,
        (duration.m > 0) ? `${duration.m} month${(duration.m > 1) ? 's' : ''}` : null,
        (duration.w > 0) ? `${duration.w} week${(duration.w > 1) ? 's' : ''}` : null,
        (duration.d > 0) ? `${duration.d} day${(duration.d > 1) ? 's' : ''}` : null,
        (duration.h > 0) ? `${duration.h} hour${(duration.h > 1) ? 's' : ''}` : null,
        (duration.min > 0) ? `${duration.min} minute${(duration.min > 1) ? 's' : ''}` : null,
        (duration.s > 0) ? `${duration.s} second${(duration.s > 1) ? 's' : ''}` : null
    ];

    let str_pieces = [];

    // Remove empty strings
    for(i = 0; i < str_pieces_original.length; ++i) {
        if(str_pieces_original[i] != null) str_pieces.push(str_pieces_original[i]);    // If there is an empty string, remove it from the array
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
};