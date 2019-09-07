/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: locales.js
 * Description:
 * This file contains locale settings
 * for supported languages using ISO 639-1
 * language codes with country locale code
 * 
 * Please send me a feature request for
 * adding another locale code
 *****************************************/

// Translations
module.exports = {
    default_locale: 'en-US',
    locale_strings: {
        leveling: {
            level_up: {
                message: {
                    'en-US': '@user has leveled up!',
                    'cs-CZ': 'Uživatel @user postoupil na novou úroveň!'
                },
                embed: {
                    'en-US': 'New level',
                    'cs-CZ': 'Nová úroveň'
                }
            },
            query: {
                embed: {
                    title: {
                        'en-US': 'Level and experiences of `@user`',
                        'cs-CZ': 'Úroveň a zkušenosti uživatele `@user`'
                    },
                    level: {
                        'en-US': 'Level',
                        'cs-CZ': 'Úroveň'
                    },
                    experiences: {
                        'en-US': 'Experiences',
                        'cs-CZ': 'Zkušenosti'
                    }
                }
            },
            config: {
                command: {
                    levelup_message: {
                        set: {
                            success: {
                                'en-US': 'Level up message changed successfully',
                                'cs-CZ': 'Zpráva o postupu úrovně úspěšně změněna'
                            },
                            fail: {
                                'en-US': 'Level up message failed to change',
                                'cs-CZ': 'Zprávu o postupu úrovně se nepodařilo změnit'
                            }
                        },
                        reset: {
                            success: {
                                'en-US': 'Default level up message was reset successfully',
                                'cs-CZ': 'Výchozí zpráva o postupu úrovně úspěšně obnovena'
                            },
                            fail: {
                                'en-US': 'Default level up message failed to reset',
                                'cs-CZ': 'Výchozí zprávu o postupu úrovně se nepodařilo obnovit'
                            }
                        }
                    }
                }
            }
        },
        welcomes: {
            message: {
                'en-US': 'Welcome @user to @guild, have a great time. \ud83d\udc4d',    // \ud83d\udc4d === thumbs up unicode emoji
                'cs-CZ': 'Vítej, @user, na serveru @guild, měj se tu dobře. \ud83d\udc4d'
            }
        },
        farewells: {
            message: {
                'en-US': '@user has left. \ud83d\ude25 Live long and prosper. \ud83d\udd96',
                            // \ud83d\ude25 === sad face with tear unicode emoji
                'cs-CZ': '@user opustil/-a server. \ud83d\ude25 Žij dlouho a blaze. \ud83d\udd96'
                            // \ud83d\udd96 === vulcan gesture /courtesy of StarTrek franchise/ unicode emoji
            }
        },
        help: {
            type: {
                mention: {
                    'en-US': 'mention',
                    'cs-CZ': 'zmínka'
                },
                id: {
                    'en-US': 'id',
                    'cs-CZ': 'id'
                },
                fragment: {
                    'en-US': 'fragment',
                    'cs-CZ': 'úryvek'
                },
                number: {
                    'en-US': 'number',
                    'cs-CZ': 'číslo'
                },
                time: {
                    'en-US': 'time',
                    'cs-CZ': 'čas'
                },
                string: {
                    'en-US': 'string',
                    'cs-CZ': 'text'
                }
            },
            attribute: {
                required: {
                    'en-US': 'Required parameter',
                    'cs-CZ': 'Vyžadovaný parametr'
                }
            },
            command: {
                ping: {
                    description: {
                        'en-US': 'Returns latency and API ping',
                        'cs-CZ': 'Vrátí zpoždění a ping bota'
                    }
                },
                whois: {
                    description: {
                        'en-US': 'Returns user information',
                        'cs-CZ': 'Vrátí informace o uživateli'
                    },
                    args: {
                        user_reference: {
                            description: {
                                'en-US': 'Reference to user whose informations you wish to display',
                                'cs-CZ': 'Reference na uživatele, jehož informace si přeješ zobrazit'
                            }
                        }
                    }
                }
            }
        }
    }
}
