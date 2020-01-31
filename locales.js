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

const { stripIndents } = require("common-tags");

// Translations
module.exports = {
    default_locale: 'en-US',
    supported_locales: {
        partially: [],
        completely: [
            'en-US',
            'cs-CZ'
        ]
    },
    locale_strings: {
        get_prefix: {
            'en-US': 'my prefix for this server is `[prefix]`',
            'cs-CZ': 'můj prefix pro tento server je `[prefix]`'
        },
        leveling: {
            level_up: {
                message: {
                    'en-US': '[user] has leveled up!',
                    'cs-CZ': 'Uživatel [user] postoupil na novou úroveň!'
                },
                embed: {
                    'en-US': 'New level',
                    'cs-CZ': 'Nová úroveň'
                }
            },
            query: {
                embed: {
                    title: {
                        'en-US': 'Level and experiences of `[user]`',
                        'cs-CZ': 'Úroveň a zkušenosti uživatele `[user]`'
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
                'en-US': 'Welcome [user] to [guild], have a great time. \ud83d\udc4d',    // \ud83d\udc4d === thumbs up unicode emoji
                'cs-CZ': 'Vítej, [user], na serveru [guild], měj se tu dobře. \ud83d\udc4d'
            }
        },
        farewells: {
            message: {
                'en-US': '[user] has left. \ud83d\ude25 Live long and prosper. \ud83d\udd96',
                            // \ud83d\ude25 === sad face with tear unicode emoji
                'cs-CZ': '[user] opustil/-a server. \ud83d\ude25 Žij dlouho a blaze. \ud83d\udd96'
                            // \ud83d\udd96 === vulcan gesture /courtesy of StarTrek franchise/ unicode emoji
            }
        },
        commands: {
            ping: {
                setup: {
                    'en-US': '\ud83c\udfd3 Pinging ...',        // \ud83c\udfd3 = Table-Tenis bat unicode emoji
                    'cs-CZ': '\ud83c\udfd3 Zjišťuji ...'
                },
                done: {
                    'en-US': stripIndents`
                    \ud83c\udfd3 Pong!
                    Latency is [message_latency] ms
                    API ping is [api_latency] ms
                    `.trim(),
                    'cs-CZ': stripIndents`
                    \ud83c\udfd3 Hotovo!
                    Zpoždění je [message_latency] ms
                    Ping bota je [api_latency] ms
                    `.trim()
                }
            },
            serverinfo: {
                query: {
                    footer: {
                        'en-US': 'Queried by [author]',
                        'cs-CZ': 'Vyžádal/-a si [author]'
                    },
                    title: {
                        'en-US': 'Server info',
                        'cs-CZ': 'Informace o serveru'
                    },
                    basic_info: {
                        caption: {
                            'en-US': 'Basic info',
                            'cs-CZ': 'Základní informace'
                        },
                        description: {
                            id: {
                                'en-US': 'Server ID',
                                'cs-CZ': 'ID serveru'
                            },
                            system_channel: {
                                'en-US': 'System channel',
                                'cs-CZ': 'Systémový kanál'
                            },
                            member_count: {
                                'en-US': 'Member count',
                                'cs-CZ': 'Počet členů'
                            },
                            region: {
                                'en-US': 'Region',
                                'cs-CZ': 'Region'
                            }
                        }
                    }
                }
            },
            whois: {
                errors: {
                    nouser: {
                        'en-US': 'That user doesn\'t exist on this server, [author].',
                        'cs-CZ': 'Tento uživatel na serveru není, [author].'
                    }
                },
                query: {
                    text_none: {
                        'en-US': '(none)',
                        'cs-CZ': '(žádné)'
                    },
                    embed: {
                        footer: {
                            'en-US': 'Queried by [author]',
                            'cs-CZ': 'Vyžádal/-a si [author]'
                        },
                        title: {
                            'en-US': 'User card',
                            'cs-CZ': 'Členská karta'
                        },
                        server_member_info: {
                            caption: {
                                'en-US': 'Server member info',
                                'cs-CZ': 'Informace člena serveru'
                            },
                            description: {
                                nick: {
                                    'en-US': 'Server nick',
                                    'cs-CZ': 'Přezdívka na serveru'
                                },
                                joined: {
                                    'en-US': 'Member joined at',
                                    'cs-CZ': 'Člen se přidal'
                                },
                                roles: {
                                    'en-US': 'Assigned roles',
                                    'cs-CZ': 'Přiřazené role'
                                }
                            }
                        },
                        user_account_info: {
                            caption: {
                                'en-US': 'User account info',
                                'cs-CZ': 'Informace uživatelského účtu'
                            },
                            description: {
                                id: {
                                    'en-US': 'User ID',
                                    'cs-CZ': 'Uživatelské ID'
                                },
                                username: {
                                    'en-US': 'Username',
                                    'cs-CZ': 'Uživatelské jméno'
                                },
                                tag: {
                                    'en-US': 'Discord TAG',
                                    'cs-CZ': 'Štítek na Discordu'
                                },
                                created: {
                                    'en-US': 'Account created at',
                                    'cs-CZ': 'Účet vytvořen'
                                }
                            }
                        },
                        activity: {
                            caption: {
                                playing: {
                                    'en-US': 'Currently playing',
                                    'cs-CZ': 'Právě hraje'
                                },
                                watching: {
                                    'en-US': 'Currently watching',
                                    'cs-CZ': 'Právě sleduje'
                                },
                                streaming: {
                                    'en-US': 'Currently streaming',
                                    'cs-CZ': 'Právě vysílá'
                                },
                                listening: {
                                    'en-US': 'Currently listening',
                                    'cs-CZ': 'Právě poslouchá'
                                },
                                doing: {
                                    'en-US': 'Currently doing',
                                    'cs-CZ': 'Právě dělá'
                                }
                            },
                            description: {
                                'en-US': 'Name',
                                'cs-CZ': 'Název'
                            }
                        },
                        moderation: {
                            warning: {
                                caption: {
                                    'en-US': 'Moderation informations',
                                    'cs-CZ': 'Informace pro moderátory'
                                },
                                description: {
                                    'en-US': '***WARNING!*** These informations are meant for moderators and administrators only, but due to limitations, they are displayed publicily. Are you sure you want to display these informations here?',
                                    'cs-CZ': '***VAROVÁNÍ!*** Tyto informace jsou určeny pouze moderátorům a administrátorům, ale kvůli jistým omezením jsou zobrazovány veřejně. Jste si jist/-a, že zde tyto informace chcete zobrazit?'
                                }
                            },
                            speaking: {
                                caption: {
                                    'en-US': 'Speaking abilities',
                                    'cs-CZ': 'Možnost projevu'
                                },
                                description: {
                                    muted_in: {
                                        'en-US': 'Muted in',
                                        'cs-CZ': 'Má roubík v'
                                    },
                                    time_left: {
                                        'en-US': 'Time left',
                                        'cs-CZ': 'Zbývá ještě'
                                    }
                                }
                            },
                            violations: {
                                caption: {
                                    'en-US': 'Member violations',
                                    'cs-CZ': 'Prohřešky člena'
                                },
                                description: {
                                    warned: {
                                        'en-US': 'Has been warned',
                                        'cs-CZ': 'Celkem varován'
                                    },
                                    banned: {
                                        'en-US': 'Has been banned',
                                        'cs-CZ': 'Celkem zabanován'
                                    },
                                    kicked: {
                                        'en-US': 'Has been kicked',
                                        'cs-CZ': 'Celkem vyhozen'
                                    },
                                    muted: {
                                        'en-US': 'Has been muted',
                                        'cs-CZ': 'Celkem měl roubík'
                                    },
                                    number: {
                                        'en-US': '[number] time(s)',
                                        'cs-CZ': '[number]x'
                                    }
                                }
                            }
                        }
                    }
                }
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
            embed: {
                title: {
                    'en-US': 'Help file for `[command]`',
                    'cs-CZ': 'Nápověda pro příkaz `[command]`'
                },
                attribute: {
                    required: {
                        'en-US': 'Required parameter',
                        'cs-CZ': 'Vyžadovaný parametr'
                    },
                    empty: {
                        'en-US': 'No arguments',
                        'cs-CZ': 'Bez argumentů'
                    }
                },
                arguments: {
                    'en-US': 'Arguments',
                    'cs-CZ': 'Argumenty'
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
                },
                serverinfo: {
                    description: {
                        'en-US': 'Returns server information',
                        'cs-CZ': 'Vrátí informace o serveru'
                    }
                }
            }
        }
    }
}
