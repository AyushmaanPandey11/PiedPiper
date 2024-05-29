export const LOGO_URL = "https://banner2.cleanpng.com/20180622/rjc/kisspng-pied-piper-of-hamelin-gilfoyle-computer-icons-5b2d71323e6e76.4254386115297047542557.jpg";
export const BACKEND_URL = "http://localhost:8000/api/v1";
export const SUPPORTED_LANG = [
    {
      identifier: "eng", name : "English",
    }, 
    {
      identifier: "hindi", name: "Hindi"
    }, 
    {
      identifier: "tamil", name: "Tamil"
    }, 
    {
      identifier: "esp", name: "Espanol"
    }, 
    {
      identifier: "jpn", name: "Japanese"
    }
  ];

export const CURRENCY_API_URL = `https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_CURRENCY_API_KEY}/pair`;

export const CurrencyPairs = [
  {
    identifier: "EUR",
    name: "Euro",
    symbol: "€"
  },
  {
    identifier: "AED",
    name: "United Arab Emirates Dirham",
    symbol: "د.إ"
  },
  {
    identifier: "AFN",
    name: "Afghan Afghani",
    symbol: "؋"
  },
  {
    identifier: "ALL",
    name: "Albanian Lek",
    symbol: "L"
  },
  {
    identifier: "AMD",
    name: "Armenian Dram",
    symbol: "֏"
  },
  {
    identifier: "ANG",
    name: "Netherlands Antillean Guilder",
    symbol: "ƒ"
  },
  {
    identifier: "AOA",
    name: "Angolan Kwanza",
    symbol: "Kz"
  },
  {
    identifier: "ARS",
    name: "Argentine Peso",
    symbol: "$"
  },
  {
    identifier: "AUD",
    name: "Australian Dollar",
    symbol: "A$"
  },
  {
    identifier: "AWG",
    name: "Aruban Florin",
    symbol: "ƒ"
  },
  {
    identifier: "AZN",
    name: "Azerbaijani Manat",
    symbol: "₼"
  },
  {
    identifier: "BAM",
    name: "Bosnia-Herzegovina Convertible Mark",
    symbol: "KM"
  },
  {
    identifier: "BBD",
    name: "Barbadian Dollar",
    symbol: "Bds$"
  },
  {
    identifier: "BDT",
    name: "Bangladeshi Taka",
    symbol: "৳"
  },
  {
    identifier: "BGN",
    name: "Bulgarian Lev",
    symbol: "лв"
  },
  {
    identifier: "BHD",
    name: "Bahraini Dinar",
    symbol: ".د.ب"
  },
  {
    identifier: "BIF",
    name: "Burundian Franc",
    symbol: "FBu"
  },
  {
    identifier: "BMD",
    name: "Bermudian Dollar",
    symbol: "$"
  },
  {
    identifier: "BND",
    name: "Brunei Dollar",
    symbol: "B$"
  },
  {
    identifier: "BOB",
    name: "Bolivian Boliviano",
    symbol: "Bs."
  },
  {
    identifier: "BRL",
    name: "Brazilian Real",
    symbol: "R$"
  },
  {
    identifier: "BSD",
    name: "Bahamian Dollar",
    symbol: "B$"
  },
  {
    identifier: "BTN",
    name: "Bhutanese Ngultrum",
    symbol: "Nu."
  },
  {
    identifier: "BWP",
    name: "Botswana Pula",
    symbol: "P"
  },
  {
    identifier: "BYN",
    name: "Belarusian Ruble",
    symbol: "Br"
  },
  {
    identifier: "BZD",
    name: "Belize Dollar",
    symbol: "BZ$"
  },
  {
    identifier: "CAD",
    name: "Canadian Dollar",
    symbol: "C$"
  },
  {
    identifier: "CDF",
    name: "Congolese Franc",
    symbol: "FC"
  },
  {
    identifier: "CHF",
    name: "Swiss Franc",
    symbol: "CHF"
  },
  {
    identifier: "CLP",
    name: "Chilean Peso",
    symbol: "$"
  },
  {
    identifier: "CNY",
    name: "Chinese Yuan",
    symbol: "¥"
  },
  {
    identifier: "COP",
    name: "Colombian Peso",
    symbol: "$"
  },
  {
    identifier: "CRC",
    name: "Costa Rican Colón",
    symbol: "₡"
  },
  {
    identifier: "CUP",
    name: "Cuban Peso",
    symbol: "$"
  },
  {
    identifier: "CVE",
    name: "Cape Verdean Escudo",
    symbol: "$"
  },
  {
    identifier: "CZK",
    name: "Czech Koruna",
    symbol: "Kč"
  },
  {
    identifier: "DJF",
    name: "Djiboutian Franc",
    symbol: "Fdj"
  },
  {
    identifier: "DKK",
    name: "Danish Krone",
    symbol: "kr"
  },
  {
    identifier: "DOP",
    name: "Dominican Peso",
    symbol: "RD$"
  },
  {
    identifier: "DZD",
    name: "Algerian Dinar",
    symbol: "د.ج"
  },
  {
    identifier: "EGP",
    name: "Egyptian Pound",
    symbol: "£"
  },
  {
    identifier: "ERN",
    name: "Eritrean Nakfa",
    symbol: "Nfk"
  },
  {
    identifier: "ETB",
    name: "Ethiopian Birr",
    symbol: "Br"
  },
  {
    identifier: "FJD",
    name: "Fijian Dollar",
    symbol: "FJ$"
  },
  {
    identifier: "FKP",
    name: "Falkland Islands Pound",
    symbol: "£"
  },
  {
    identifier: "FOK",
    name: "Faroese Króna",
    symbol: "kr"
  },
  {
    identifier: "GBP",
    name: "British Pound Sterling",
    symbol: "£"
  },
  {
    identifier: "GEL",
    name: "Georgian Lari",
    symbol: "₾"
  },
  {
    identifier: "GGP",
    name: "Guernsey Pound",
    symbol: "£"
  },
  {
    identifier: "GHS",
    name: "Ghanaian Cedi",
    symbol: "₵"
  },
  {
    identifier: "GIP",
    name: "Gibraltar Pound",
    symbol: "£"
  },
  {
    identifier: "GMD",
    name: "Gambian Dalasi",
    symbol: "D"
  },
  {
    identifier: "GNF",
    name: "Guinean Franc",
    symbol: "FG"
  },
  {
    identifier: "GTQ",
    name: "Guatemalan Quetzal",
    symbol: "Q"
  },
  {
    identifier: "GYD",
    name: "Guyanaese Dollar",
    symbol: "G$"
  },
  {
    identifier: "HKD",
    name: "Hong Kong Dollar",
    symbol: "HK$"
  },
  {
    identifier: "HNL",
    name: "Honduran Lempira",
    symbol: "L"
  },
  {
    identifier: "HRK",
    name: "Croatian Kuna",
    symbol: "kn"
  },
  {
    identifier: "HTG",
    name: "Haitian Gourde",
    symbol: "G"
  },
  {
    identifier: "HUF",
    name: "Hungarian Forint",
    symbol: "Ft"
  },
  {
    identifier: "IDR",
    name: "Indonesian Rupiah",
    symbol: "Rp"
  },
  {
    identifier: "ILS",
    name: "Israeli New Shekel",
    symbol: "₪"
  },
  {
    identifier: "IMP",
    name: "Isle of Man Pound",
    symbol: "£"
  },
  {
    identifier: "INR",
    name: "Indian Rupee",
    symbol: "₹"
  },
  {
    identifier: "IQD",
    name: "Iraqi Dinar",
    symbol: "ع.د"
  },
  {
    identifier: "IRR",
    name: "Iranian Rial",
    symbol: "﷼"
  },
  {
    identifier: "ISK",
    name: "Icelandic Króna",
    symbol: "kr"
  },
  {
    identifier: "JEP",
    name: "Jersey Pound",
    symbol: "£"
  },
  {
    identifier: "JMD",
    name: "Jamaican Dollar",
    symbol: "J$"
  },
  {
    identifier: "JOD",
    name: "Jordanian Dinar",
    symbol: "د.ا"
  },
  {
    identifier: "JPY",
    name: "Japanese Yen",
    symbol: "¥"
  },
  {
    identifier: "KES",
    name: "Kenyan Shilling",
    symbol: "KSh"
  },
  {
    identifier: "KGS",
    name: "Kyrgystani Som",
    symbol: "сом"
  },
  {
    identifier: "KHR",
    name: "Cambodian Riel",
    symbol: "៛"
  },
  {
    identifier: "KID",
    name: "Kiribati Dollar",
    symbol: "$"
  },
  {
    identifier: "KMF",
    name: "Comorian Franc",
    symbol: "CF"
  },
  {
    identifier: "KRW",
    name: "South Korean Won",
    symbol: "₩"
  },
  {
    identifier: "KWD",
    name: "Kuwaiti Dinar",
    symbol: "د.ك"
  },
  {
    identifier: "KYD",
    name: "Cayman Islands Dollar",
    symbol: "$"
  },
  {
    identifier: "KZT",
    name: "Kazakhstani Tenge",
    symbol: "₸"
  },
  {
    identifier: "LAK",
    name: "Laotian Kip",
    symbol: "₭"
  },
  {
    identifier: "LBP",
    name: "Lebanese Pound",
    symbol: "ل.ل"
  },
  {
    identifier: "LKR",
    name: "Sri Lankan Rupee",
    symbol: "Rs"
  },
  {
    identifier: "LRD",
    name: "Liberian Dollar",
    symbol: "$"
  },
  {
    identifier: "LSL",
    name: "Lesotho Loti",
    symbol: "L"
  },
  {
    identifier: "LYD",
    name: "Libyan Dinar",
    symbol: "ل.د"
  },
  {
    identifier: "MAD",
    name: "Moroccan Dirham",
    symbol: "د.م."
  },
  {
    identifier: "MDL",
    name: "Moldovan Leu",
    symbol: "L"
  },
  {
    identifier: "MGA",
    name: "Malagasy Ariary",
    symbol: "Ar"
  },
  {
    identifier: "MKD",
    name: "Macedonian Denar",
    symbol: "ден"
  },
  {
    identifier: "MMK",
    name: "Myanmar Kyat",
    symbol: "K"
  },
  {
    identifier: "MNT",
    name: "Mongolian Tugrik",
    symbol: "₮"
  },
  {
    identifier: "MOP",
    name: "Macanese Pataca",
    symbol: "P"
  },
  {
    identifier: "MRU",
    name: "Mauritanian Ouguiya",
    symbol: "UM"
  },
  {
    identifier: "MUR",
    name: "Mauritian Rupee",
    symbol: "₨"
  },
  {
    identifier: "MVR",
    name: "Maldivian Rufiyaa",
    symbol: "Rf"
  },
  {
    identifier: "MWK",
    name: "Malawian Kwacha",
    symbol: "MK"
  },
  {
    identifier: "MXN",
    name: "Mexican Peso",
    symbol: "$"
  },
  {
    identifier: "MYR",
    name: "Malaysian Ringgit",
    symbol: "RM"
  },
  {
    identifier: "MZN",
    name: "Mozambican Metical",
    symbol: "MT"
  },
  {
    identifier: "NAD",
    name: "Namibian Dollar",
    symbol: "N$"
  },
  {
    identifier: "NGN",
    name: "Nigerian Naira",
    symbol: "₦"
  },
  {
    identifier: "NIO",
    name: "Nicaraguan Córdoba",
    symbol: "C$"
  },
  {
    identifier: "NOK",
    name: "Norwegian Krone",
    symbol: "kr"
  },
  {
    identifier: "NPR",
    name: "Nepalese Rupee",
    symbol: "₨"
  },
  {
    identifier: "NZD",
    name: "New Zealand Dollar",
    symbol: "NZ$"
  },
  {
    identifier: "OMR",
    name: "Omani Rial",
    symbol: "ر.ع."
  },
  {
    identifier: "PAB",
    name: "Panamanian Balboa",
    symbol: "B/."
  },
  {
    identifier: "PEN",
    name: "Peruvian Nuevo Sol",
    symbol: "S/."
  },
  {
    identifier: "PGK",
    name: "Papua New Guinean Kina",
    symbol: "K"
  },
  {
    identifier: "PHP",
    name: "Philippine Peso",
    symbol: "₱"
  },
  {
    identifier: "PKR",
    name: "Pakistani Rupee",
    symbol: "₨"
  },
  {
    identifier: "PLN",
    name: "Polish Zloty",
    symbol: "zł"
  },
  {
    identifier: "PYG",
    name: "Paraguayan Guarani",
    symbol: "₲"
  },
  {
    identifier: "QAR",
    name: "Qatari Rial",
    symbol: "ر.ق"
  },
  {
    identifier: "RON",
    name: "Romanian Leu",
    symbol: "lei"
  },
  {
    identifier: "RSD",
    name: "Serbian Dinar",
    symbol: "дин"
  },
  {
    identifier: "RUB",
    name: "Russian Ruble",
    symbol: "₽"
  },
  {
    identifier: "RWF",
    name: "Rwandan Franc",
    symbol: "FRw"
  },
  {
    identifier: "SAR",
    name: "Saudi Riyal",
    symbol: "ر.س"
  },
  {
    identifier: "SBD",
    name: "Solomon Islands Dollar",
    symbol: "SI$"
  },
  {
    identifier: "SCR",
    name: "Seychellois Rupee",
    symbol: "₨"
  },
  {
    identifier: "SDG",
    name: "Sudanese Pound",
    symbol: "ج.س."
  },
  {
    identifier: "SEK",
    name: "Swedish Krona",
    symbol: "kr"
  },
  {
    identifier: "SGD",
    name: "Singapore Dollar",
    symbol: "S$"
  },
  {
    identifier: "SHP",
    name: "Saint Helena Pound",
    symbol: "£"
  },
  {
    identifier: "SLE",
    name: "Sierra Leonean Leone",
    symbol: "Le"
  },
  {
    identifier: "SLL",
    name: "Sierra Leonean Leone",
    symbol: "Le"
  },
  {
    identifier: "SOS",
    name: "Somali Shilling",
    symbol: "Sh.So."
  },
  {
    identifier: "SRD",
    name: "Surinamese Dollar",
    symbol: "$"
  },
  {
    identifier: "SSP",
    name: "South Sudanese Pound",
    symbol: "£"
  },
  {
    identifier: "STN",
    name: "São Tomé and Príncipe Dobra",
    symbol: "Db"
  },
  {
    identifier: "SYP",
    name: "Syrian Pound",
    symbol: "£S"
  },
  {
    identifier: "SZL",
    name: "Swazi Lilangeni",
    symbol: "E"
  },
  {
    identifier: "THB",
    name: "Thai Baht",
    symbol: "฿"
  },
  {
    identifier: "TJS",
    name: "Tajikistani Somoni",
    symbol: "ЅМ"
  },
  {
    identifier: "TMT",
    name: "Turkmenistani Manat",
    symbol: "m"
  },
  {
    identifier: "TND",
    name: "Tunisian Dinar",
    symbol: "د.ت"
  },
  {
    identifier: "TOP",
    name: "Tongan Pa'anga",
    symbol: "T$"
  },
  {
    identifier: "TRY",
    name: "Turkish Lira",
    symbol: "₺"
  },
  {
    identifier: "TTD",
    name: "Trinidad and Tobago Dollar",
    symbol: "TT$"
  },
  {
    identifier: "TVD",
    name: "Tuvaluan Dollar",
    symbol: "$"
  },
  {
    identifier: "TWD",
    name: "New Taiwan Dollar",
    symbol: "NT$"
  },
  {
    identifier: "TZS",
    name: "Tanzanian Shilling",
    symbol: "TSh"
  },
  {
    identifier: "UAH",
    name: "Ukrainian Hryvnia",
    symbol: "₴"
  },
  {
    identifier: "UGX",
    name: "Ugandan Shilling",
    symbol: "USh"
  },
  {
    identifier: "USD",
    name: "United States Dollar",
    symbol: "$"
  },
  {
    identifier: "UYU",
    name: "Uruguayan Peso",
    symbol: "$U"
  },
  {
    identifier: "UZS",
    name: "Uzbekistan Som",
    symbol: "сўм"
  },
  {
    identifier: "VES",
    name: "Venezuelan Bolívar",
    symbol: "Bs.S"
  },
  {
    identifier: "VND",
    name: "Vietnamese Dong",
    symbol: "₫"
  },
  {
    identifier: "VUV",
    name: "Vanuatu Vatu",
    symbol: "VT"
  },
  {
    identifier: "WST",
    name: "Samoan Tala",
    symbol: "T"
  },
  {
    identifier: "XAF",
    name: "Central African CFA Franc",
    symbol: "FCFA"
  },
  {
    identifier: "XCD",
    name: "East Caribbean Dollar",
    symbol: "$"
  },
  {
    identifier: "XDR",
    name: "Special Drawing Rights",
    symbol: "SDR"
  },
  {
    identifier: "XOF",
    name: "West African CFA Franc",
    symbol: "CFA"
  },
  {
    identifier: "XPF",
    name: "CFP Franc",
    symbol: "₣"
  },
  {
    identifier: "YER",
    name: "Yemeni Rial",
    symbol: "﷼"
  },
  {
    identifier: "ZAR",
    name: "South African Rand",
    symbol: "R"
  },
  {
    identifier: "ZMW",
    name: "Zambian Kwacha",
    symbol: "ZK"
  },
  {
    identifier: "ZWL",
    name: "Zimbabwean Dollar",
    symbol: "Z$"
  }
];



