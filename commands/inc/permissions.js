/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: permissions.js
 *****************************************/

module.exports.MODERATOR = 1;
module.exports.ADMINISTRATOR = 2;
module.exports.OWNER = 4;
module.exports.DEVELOPER = 8;

module.exports.insufficient_perms = (client, message, permissions) => {
    // \u274C => Red cross mark
    let msg = `\u274C I'm afraid you have insuficient permissions, ${message.author}! You must be at least `;
    
    let perms_array = [];

    if(permissions & this.MODERATOR != 0) perms_array.push("Moderator");
    if(permissions & this.ADMINISTRATOR != 0) perms_array.push("Administrator");
    if(permissions & this.OWNER != 0) perms_array.push("Owner");
    if(permissions & this.DEVELOPER != 0) perms_array.push("my developer");

    if(perms_array.length == 0) return null;

    for(i = 0; i < perms_array.length; ++i) {
        switch(i) {
            case 0:
                msg += perms_array[i];
                break;
            case perms_array.length - 1:
                msg += ` or ${perms_array[i]}`;
                break;
            default:
                msg += `, ${perms_array[i]}`;
        }
    }

    msg += ".";

    return msg;
}

module.exports.check_permissions = (client, message, channel, permissions) => {
    const mod_perms = [
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MOVE_MEMBERS",
        "MANAGE_NICKNAMES",
        "MANAGE_MESSAGES",
        "KICK_MEMBERS",
        "BAN_MEMBERS"
    ];

    const admin_perms = [
        "VIEW_AUDIT_LOG",
        "MANAGE_CHANNELS",
        "MANAGE_ROLES",
        "MANAGE_EMOJIS"
    ].concat(mod_perms);

    const owner_perms = [
        "ADMINISTRATOR"
    ];

    // Has permissions will be replaced by the roles settings
    switch(permissions) {
        case this.DEVELOPER:
            return client.settings.developers.channel === message.author.id
                || client.settings.developers.helping.includes(message.author.id);
        case this.OWNER:
            return message.member.hasPermission(owner_perms);
        case this.ADMINISTRATOR:
            return message.member.hasPermission(admin_perms);
        case this.MODERATOR:
            return message.member.hasPermission(mod_perms);
        default:
            return false;
    }
}