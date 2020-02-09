/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: events/disconnect.js
 *****************************************/

const literals = require("../literals.js");

module.exports = {
    name: 'disconnect',
    run: (client, event) => {
        let exit_string = "Connection lost: "
        let exit_code = 0;

        switch(event.code) {
            case literals.disconnect_codes.NORMAL_CLOSURE:
                exit_string += "Process ended by user.";
                break;
            case literals.disconnect_codes.GOING_AWAY:
                exit_string += "Endpoint interrupted.";
                exit_code = 1;
                break;
            case literals.disconnect_codes.PROTOCOL_ERROR:
                exit_string += "Protocol error.";
                exit_code = 2;
                break;
            case literals.disconnect_codes.UNSUPPORTED_DATA:
                exit_string += "Encountered unsupported data.";
                exit_code = 3;
                break;
            case literals.disconnect_codes.NO_STATUS:
                exit_string += "No status received";
                exit_code = 4;
                break;
            case literals.disconnect_codes.ABNORMAL_CLOSURE:
                exit_string += "Process ended abnormally.";
                exit_code = 5;
                break;
            case literals.disconnect_codes.INVALID_PLAYER_PAYLOAD:
                exit_string += "Encountered invalid player payload data.";
                exit_code = 6;
                break;
            case literals.disconnect_codes.POLICY_VIOLATION:
                exit_string += "Bot violated Discord policies.";
                exit_code = 7;
                break;
            case literals.disconnect_codes.MESSAGE_TOO_BIG:
                exit_string += "Message is too big.";
                exit_code = 8;
                break;
            case literals.disconnect_codes.MISSING_EXTENSION:
                exit_string += "Missing extension. Please install any missing parts.";
                exit_code = 9;
                break;
            case literals.disconnect_codes.INTERNAL_ERROR:
                exit_string += "Internal error.";
                exit_code = 10;
                break;
            case literals.disconnect_codes.SERVICE_RESTART:
                exit_string += "Service restart.";
                exit_code = 11;
                break;
            case literals.disconnect_codes.TRY_AGAIN_LATER:
                exit_string += "An error occured. Try again later.";
                exit_code = 12;
                break;
            case literals.disconnect_codes.BAD_GATEWAY:
                exit_string += "Bad gateway.";
                exit_code = 13;
                break;
            case literals.disconnect_codes.TLS_HANDSHAKE_FAIL:
                exit_string += "TLS handshake failed.";
                exit_code = 14;
                break;
                // Any other in future development may go here
            default:
                exit_string += "Unspecified error.";
                exit_code = 999;
        }

        console.log(exit_string);
        process.exit(exit_code);
    }
}