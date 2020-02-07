/*****************************************
 * Joker Discord Bot
 * Made by CZghost/Polda18, 2019
 * ALPHA v0.0.1
 * 
 * File: literals.js
 *****************************************/

module.exports = {
    region_colors: {
        // This maps embed colors to specified regions
        'brazil': '#49bf41',        // Green
        'eu-central': '#2632bd',    // Blue
        'europe': '#2632bd',
        'hongkong': '#b32e2e',      // Red
        'india': '#ada134',         // Yellow
        'japan': '#cf0e0e',         // Red
        'russia': '#287fd1',        // Teal
        'singapore': '#6b2323',     // Dark red
        'southafrica': '#2e2929',   // Dark
        'sydney': '#121575',        // Navy blue
        'us-central': '#db3535',    // Red
        'us-east': '#db3535',
        'us-south': '#db3535',
        'us-west': '#db3535'
    },
    region_flags: {
        // This maps country flags to specified regions
        'brazil': '\ud83c\udde7\ud83c\uddf7',       // Brazil flag
        'eu-central': '\ud83c\uddea\ud83c\uddfa',   // Europe flag
        'europe': '\ud83c\uddea\ud83c\uddfa',
        'hongkong': '\ud83c\udded\ud83c\uddf0',     // Hong Kong flag
        'india': '\ud83c\uddee\ud83c\uddf3',        // Flag of India
        'japan': '\ud83c\uddef\ud83c\uddf5',        // Japan flag
        'russia': '\ud83c\uddf7\ud83c\uddfa',       // Flag of Russia
        'singapore': '\ud83c\uddf8\ud83c\uddec',    // Flag of Singapore
        'southafrica': '\ud83c\uddff\ud83c\udde6',  // South Africa flag
        'sydney': '\ud83c\udde6\ud83c\uddfa',       // Flag of Australia
        'us-central': '\ud83c\uddfa\ud83c\uddf8',   // Flag of USA
        'us-east': '\ud83c\uddfa\ud83c\uddf8',
        'us-south': '\ud83c\uddfa\ud83c\uddf8',
        'us-west': '\ud83c\uddfa\ud83c\uddf8'
    },
    locales_map: {
        // This is mapping of default countries to default language ISO 639-1 or 639-2 code without any country defined
        'af': 'af-ZA',
        'ar': 'ar-AE',
        'az': 'az-AZ',
        'be': 'be-BY',
        'bg': 'bg-BG',
        'ca': 'ca-ES',
        'cs': 'cs-CZ',
        'cy': 'cy-GB',
        'da': 'da-DK',
        'de': 'de-DE',
        'dv': 'dv-MV',
        'el': 'el-GR',
        'en': 'en-US',
        'es': 'es-ES',
        'et': 'et-EE',
        'eu': 'eu-ES',
        'fa': 'fa-IR',
        'fi': 'fi-FI',
        'fo': 'fo-FO',
        'fr': 'fr-FR',
        'gl': 'gl-ES',
        'gu': 'gu-IN',
        'he': 'he-IL',
        'hi': 'hi-IN',
        'hr': 'hr-HR',
        'hu': 'hu-HU',
        'hy': 'hy-AM',
        'id': 'id-ID',
        'is': 'is-IS',
        'it': 'it-IT',
        'ja': 'ja-JP',
        'ka': 'ka-GE',
        'kk': 'kk-KZ',
        'kn': 'kn-IN',
        'ko': 'ko-KR',
        'kok': 'kok-IN',
        'ky': 'ky-KG',
        'lt': 'lt-LT',
        'lv': 'lv-LV',
        'mi': 'mi-NZ',
        'mk': 'mk-MK',
        'mn': 'mn-MN',
        'mr': 'mr-IN',
        'ms': 'ms-MY',
        'mt': 'mt-MT',
        'nb': 'nb-NO',
        'nl': 'nl-NL',
        'ns': 'ns-ZA',
        'pa': 'pa-IN',
        'pl': 'pl-PL',
        'ps': 'ps-AF',
        'pt': 'pt-PT',
        'qu': 'qu-PE',
        'ro': 'ro-RO',
        'ru': 'ru-RU',
        'sa': 'sa-IN',
        'se': 'se-SE',
        'sk': 'sk-SK',
        'sl': 'sl-SI',
        'sq': 'sq-AL',
        'sv': 'sv-SE',
        'sw': 'sw-KE',
        'syr': 'syr-SY',
        'ta': 'ta-IN',
        'te': 'te-IN',
        'th': 'th-TH',
        'tl': 'tl-PH',
        'tn': 'tn-ZA',
        'tr': 'tr-TR',
        'tt': 'tt-RU',
        'uk': 'uk-UA',
        'ur': 'ur-PK',
        'uz': 'uz-UZ',
        'vi': 'vi-VN',
        'xh': 'xh-ZA',
        'zh': 'zh-CN',
        'zu': 'zu-ZA'
    },
    locales: [
        // List of all ISO 639-1 or 639-2 codes for languages, including their country codes designated
        'af',
        'af-ZA',
        'ar',
        'ar-AE',
        'ar-BH',
        'ar-DZ',
        'ar-EG',
        'ar-IQ',
        'ar-JO',
        'ar-KW',
        'ar-LB',
        'ar-LY',
        'ar-MA',
        'ar-OM',
        'ar-QA',
        'ar-SA',
        'ar-SY',
        'ar-TN',
        'ar-YE',
        'az',
        'az-AZ',
        'be',
        'be-BY',
        'bg',
        'bg-BG',
        'bs-BA',
        'ca',
        'ca-ES',
        'cs',
        'cs-CZ',
        'cy',
        'cy-GB',
        'da',
        'da-DK',
        'de',
        'de-AT',
        'de-BE',
        'de-CH',
        'de-DE',
        'de-LI',
        'de-LU',
        'dv',
        'dv-MV',
        'el',
        'el-GR',
        'en',
        'en-AU',
        'en-BZ',
        'en-CA',
        'en-GB',
        'en-IE',
        'en-JM',
        'en-KH',
        'en-NZ',
        'en-PH',
        'en-TT',
        'en-US',
        'en-ZA',
        'en-ZW',
        'eo',
        'es',
        'es-AR',
        'es-BO',
        'es-CL',
        'es-CO',
        'es-CR',
        'es-DO',
        'es-EC',
        'es-ES',
        'es-GT',
        'es-HN',
        'es-MX',
        'es-NI',
        'es-PA',
        'es-PE',
        'es-PR',
        'es-PY',
        'es-SV',
        'es-UY',
        'es-VE',
        'et',
        'et-EE',
        'eu',
        'eu-ES',
        'fa',
        'fa-IR',
        'fi',
        'fi-FI',
        'fo',
        'fo-FO',
        'fr',
        'fr-BE',
        'fr-CA',
        'fr-CH',
        'fr-FR',
        'fr-LU',
        'fr-MC',
        'gl',
        'gl-ES',
        'gu',
        'gu-IN',
        'he',
        'he-IL',
        'hi',
        'hi-IN',
        'hr',
        'hr-BA',
        'hr-HR',
        'hu',
        'hu-HU',
        'hy',
        'hy-AM',
        'id',
        'id-ID',
        'is',
        'is-IS',
        'it',
        'it-CH',
        'it-IT',
        'it-MC',
        'ja',
        'ja-JP',
        'ka',
        'ka-GE',
        'kk',
        'kk-KZ',
        'kn',
        'kn-IN',
        'ko',
        'ko-KR',
        'kok',
        'kok-IN',
        'ky',
        'ky-KG',
        'lt',
        'lt-LT',
        'lv',
        'lv-LV',
        'mi',
        'mi-NZ',
        'mk',
        'mk-MK',
        'mn',
        'mn-MN',
        'mr',
        'mr-IN',
        'ms',
        'ms-BN',
        'ms-MY',
        'mt',
        'mt-MT',
        'nb',
        'nb-NO',
        'nl',
        'nl-BE',
        'nl-NL',
        'nn-NO',
        'ns',
        'ns-ZA',
        'pa',
        'pa-IN',
        'pl',
        'pl-PL',
        'ps',
        'ps-AF',
        'pt',
        'pt-BR',
        'pt-PT',
        'qu',
        'qu-BO',
        'qu-EC',
        'qu-PE',
        'ro',
        'ro-RO',
        'ru',
        'ru-RU',
        'sa',
        'sa-IN',
        'se',
        'se-FI',
        'se-NO',
        'se-SE',
        'sk',
        'sk-SK',
        'sl',
        'sl-SI',
        'sq',
        'sq-AL',
        'sr-BA',
        'sr-RS',
        'sv',
        'sv-FI',
        'sv-SE',
        'sw',
        'sw-KE',
        'syr',
        'syr-SY',
        'ta',
        'ta-IN',
        'te',
        'te-IN',
        'th',
        'th-TH',
        'tl',
        'tl-PH',
        'tn',
        'tn-ZA',
        'tr',
        'tr-TR',
        'tt',
        'tt-RU',
        'ts',
        'uk',
        'uk-UA',
        'ur',
        'ur-PK',
        'uz',
        'uz-UZ',
        'vi',
        'vi-VN',
        'xh',
        'xh-ZA',
        'zh',
        'zh-CN',
        'zh-HK',
        'zh-MO',
        'zh-SG',
        'zh-TW',
        'zu',
        'zu-ZA'
    ]
}
