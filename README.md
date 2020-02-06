# Joker Discord Chat Bot
<!-- [![gitlocalized ](https://gitlocalize.com/repo/3898/whole_project/badge.svg)](https://gitlocalize.com/repo/3898/whole_project?utm_source=badge) -->

Discord chat bot for automated messages guard, users management and entertainment 

_This project is currently under construction._

## Sneak preview
Please note that the first version of the bot is still in development, so many things may change.

Bot is currently in early development and testing phase. This early release is not yet out,
but here's the sneak preview of what you can expect from the bot's features. It is a short list
and may change through time being as I decide for more features, features change or features removal.

If you want to add the bot before it's released, click following link to add the bot to your server:  
https://discordapp.com/oauth2/authorize?client_id=484988029841440808&scope=bot&permissions=8

  * Server dependent settings => Each server the bot is in can hold various settings, thanks
    to use of JSON object and MySQL database for settings. Each ban and mute is also issued
    per server. Default settings are hardcoded in bot's code.
  * Welcomes and farewells => Bot is capable of setting a welcome and farewell messages system
    per server. You can also set a DM message for user who joins or leaves your server.
  * Minigames => Currently you can toss a dice or flip a coin. Dice is a standard 6-sided dice
    and bot currently doesn't support other sides of dice (command parameters are ignored).
    Coin is pretty much any money coin in any currency you can imagine (yes, even fictional).
    However, the standard U.S. "quarter" coin (the US $0.25 coin) was on my mind, so the
    default emojis that use unicode notations are approximations of what can be found on the
    standard "quarter" => heads are represented by a royal head (princess, queen), as nothing
    else I found in standard Discord emojis library, while tails are represented by a head of
    an eagle typical for Northern America (white-head) => symbol of United States. Since this
    coin is so widely known and used as base for refference of a coin used for coin flip,
    I deciced to use that refference as well.
  * Administration tools => basically most important feature of the bot. It will ban for you,
    mute users for a specified time, all from a single input of a command line, which is the
    chat text input window. You don't have to set up admin and moderator roles to use the
    administration tools. The defaults are taken as commons from the permissions settings
    typical for those roles (administrators having literally every permission and moderators
    typically permitted to manage messages, reactions, assign roles to members, kick and ban).
    However, if you have different settings for those roles (administrators may not have full
    administration powers, rather owners may have) or you have roles that are channels
    dependent, you'll want to set some of these roles.
  * Experiences and leveling => every entertainment bot shall have this feature and this is
    no exception! The formula for leveling taken from experiences may change in future.
    Currently, no formula is used. I am, however, thinking of this one:
    $$n = x^{l + 1} - x^l$$
    $n$ is the required experience value to gain, $l$ is current level value, $x$ a further
    unspecified constant (it's value is not yet determined). The cooldown for experience gain,
    leveling and command fetch may be 15 seconds by default.
  * Messaging guard => Bot guards the messages and searches up the strong words that a server
    administrator can set up. They are actually regular expressions, following JavaScript `regex`
    standards [found here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).
    All of these regular expressions are joined together into a single one using switch operator
    (`(word1|word2|word3|...)`), or if there is only one word, it is used directly. Bot then counts all
    matches and deletes the message. If the matches count does not exceed maximum of 5 strong words, the
    user is only warned for swearing. Maximum number of warnings per hour are 5, user is then muted for
    an hour. If it exceeds the amount, user is straight muted for an hour serverwide. If you want to disable
    messaging guard, just remove all regular expressions from server database, it will disable this feature.
  * Memes and jokes => Dank memes, fun facts and other jokes are just waiting to be implemented.
    You can of course expect memes lord search engine, fun facts API, and there will be also
    a fake Google search engine provided. Well, it is basically just a normal Google search,
    except not as you would expect. Since Google prohibits usage of Google API for automated
    search worldwide (Google restricts API to custom search), and search engine usage is basically
    the most basic skill on Internet, pure and priceless, Joker uses LMGTFY (which stands for
    "Let me Google that for You") API instead, which performs a graphically nice animated Google
    search and humiliates the person who asks for certain basic things that could be easily
    searched up using (yes, you guessed it) Google.
  * _Other features will be announced later_

### Important notice
Bot is an administrator and will attempt to send a welcome message for every server member
as soon as it joins the server and informs about the `$$help` command there. If it fails
to find the default channel (the central hub channel set in server settings), it tries
to find the `#general` channel. If that fails, too, it tries to find the first channel
it can contribute to, ordered from top to bottom. That will be literally the first channel
it can find, so it is wise to have one channel named `#general` for this case.
