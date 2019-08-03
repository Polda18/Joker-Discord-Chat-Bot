grammar time;

fragment INT:
    [1-9] [0-9]*
    ;

fragment Y: [yY];
fragment M: [mM];
fragment W: [wW];
fragment D: [dD];
fragment H: [hH];
fragment I: [iI];
fragment N: [nN];
fragment S: [sS];

time:
    years? months? weeks? days? hours? minutes? seconds?
    // #y#m#w#d#h#min#s
    ;

years: (INT Y)?;
months: (INT M)?;
weeks: (INT W)?;
days: (INT D)?;
hours: (INT H)?;
minutes: (INT M I N)?;
seconds: (INT S?)?;