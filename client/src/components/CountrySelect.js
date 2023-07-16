import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { getCountryInfo } from "../api/course.js";
import { useDispatch } from "react-redux";
import { countrySelector } from "../redux/countrySelect.js";

export default function CountrySelect() {
  const [countriesAPI, setCountriesAPI] = React.useState([]);
  const [country, setCountry] = React.useState(null);
  const dispatch = useDispatch();
  React.useEffect(() => {
    getCountryInfo().then((data) => {
      setCountriesAPI(data);
      // console.log(Object.keys(data));
    });
  }, []);
  const handleCountryChange = (newValue) => {
    let temp = newValue;
    temp["rate"] = countriesAPI[newValue.currency];
    //default code: "US", currency: "USD", label: "United States", rate: 1, symbol: "$"
    dispatch(countrySelector(temp));
    setCountry(newValue);
  };
  return (
    <Autocomplete
      id="country-select-demo"
      sx={{
        width: "180px",
        marginRight: "30px",
      }}
      variant="standard"
      options={countries}
      onChange={(event, newValue) => {
        if (newValue) handleCountryChange(newValue);
        else
          handleCountryChange({
            code: "US",
            currency: "USD",
            label: "United States",
            rate: 1,
            symbol: "$",
          });
      }}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label} ({option.code}) {option.symbol}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          sx={{ backgroundColor: "#eeeeee !important" }}
          variant="standard"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries = [
  { code: "AD", label: "Andorra", symbol: "€", currency: "EUR" },
  { code: "AE", label: "United Arab Emirates", symbol: "د.إ", currency: "AED" },
  { code: "AF", label: "Afghanistan", symbol: "؋", currency: "AFN" },
  { code: "AG", label: "Antigua and Barbuda", symbol: "EC$", currency: "XCD" },
  { code: "AI", label: "Anguilla", symbol: "$", currency: "XCD" },
  { code: "AL", label: "Albania", symbol: "Lek", currency: "ALL" },
  { code: "AM", label: "Armenia", symbol: "֏", currency: "AMD" },
  { code: "AO", label: "Angola", symbol: "Kz", currency: "AOA" },
  { code: "AQ", label: "Antarctica", symbol: "$", currency: "USD" },
  { code: "AR", label: "Argentina", symbol: "$", currency: "ARS" },
  { code: "AS", label: "American Samoa", symbol: "$", currency: "USD" },
  { code: "AT", label: "Austria", symbol: "€", currency: "EUR" },
  { code: "AU", label: "Australia", symbol: "$", currency: "AUD" },
  { code: "AW", label: "Aruba", symbol: "ƒ", currency: "AWG" },
  { code: "AX", label: "Alland Islands", symbol: "€", currency: "EUR" },
  { code: "AZ", label: "Azerbaijan", symbol: "₼", currency: "AZN" },
  {
    code: "BA",
    label: "Bosnia and Herzegovina",
    symbol: "KM",
    currency: "BAM",
  },
  { code: "BB", label: "Barbados", symbol: "$", currency: "BBD" },
  { code: "BD", label: "Bangladesh", symbol: "৳", currency: "BDT" },
  { code: "BE", label: "Belgium", symbol: "€", currency: "EUR" },
  { code: "BF", label: "Burkina Faso", symbol: "Fr", currency: "XOF" },
  { code: "BG", label: "Bulgaria", symbol: "лв", currency: "BGN" },
  { code: "BH", label: "Bahrain", symbol: ".د.ب", currency: "BHD" },
  { code: "BI", label: "Burundi", symbol: "Fr", currency: "BIF" },
  { code: "BJ", label: "Benin", symbol: "Fr", currency: "XOF" },
  { code: "BL", label: "Saint Barthelemy", symbol: "€", currency: "EUR" },
  { code: "BM", label: "Bermuda", symbol: "$", currency: "BMD" },
  { code: "BN", label: "Brunei", symbol: "$", currency: "BND" },
  { code: "BO", label: "Bolivia", symbol: "$b", currency: "BOB" },
  {
    code: "BQ",
    label: "Bonaire, Saint Eustatius and Saba",
    symbol: "$",
    currency: "USD",
  },
  { code: "BR", label: "Brazil", symbol: "R$", currency: "BRL" },
  { code: "BS", label: "Bahamas", symbol: "$", currency: "BSD" },
  { code: "BT", label: "Bhutan", symbol: "Nu.", currency: "BTN" },
  { code: "BV", label: "Bouvet Island", symbol: "kr", currency: "NOK" },
  { code: "BW", label: "Botswana", symbol: "P", currency: "BWP" },
  { code: "BY", label: "Belarus", symbol: "Br", currency: "BYN" },
  { code: "BZ", label: "Belize", symbol: "BZ$", currency: "BZD" },
  { code: "CA", label: "Canada", symbol: "$", currency: "CAD" },
  {
    code: "CC",
    label: "Cocos (Keeling) Islands",
    symbol: "$",
    currency: "AUD",
  },
  {
    code: "CD",
    label: "Democratic Republic of the Congo",
    symbol: "Fr",
    currency: "CDF",
  },
  {
    code: "CF",
    label: "Central African Republic",
    symbol: "Fr",
    currency: "XAF",
  },
  { code: "CG", label: "Republic of the Congo", symbol: "Fr", currency: "XAF" },
  { code: "CH", label: "Switzerland", symbol: "Fr", currency: "CHF" },
  { code: "CI", label: "Ivory Coast", symbol: "Fr", currency: "XOF" },
  { code: "CK", label: "Cook Islands", symbol: "$", currency: "NZD" },
  { code: "CL", label: "Chile", symbol: "$", currency: "CLP" },
  { code: "CM", label: "Cameroon", symbol: "Fr", currency: "XAF" },
  { code: "CN", label: "China", symbol: "¥", currency: "CNY" },
  { code: "CO", label: "Colombia", symbol: "$", currency: "COP" },
  { code: "CR", label: "Costa Rica", symbol: "₡", currency: "CRC" },
  { code: "CU", label: "Cuba", symbol: "$", currency: "CUP" },
  { code: "CV", label: "Cape Verde", symbol: "$", currency: "CVE" },
  { code: "CW", label: "Curacao", symbol: "ƒ", currency: "ANG" },
  { code: "CX", label: "Christmas Island", symbol: "$", currency: "AUD" },
  { code: "CY", label: "Cyprus", symbol: "€", currency: "EUR" },
  { code: "CZ", label: "Czech Republic", symbol: "Kč", currency: "CZK" },
  { code: "DE", label: "Germany", symbol: "€", currency: "EUR" },
  { code: "DJ", label: "Djibouti", symbol: "Fr", currency: "DJF" },
  { code: "DK", label: "Denmark", symbol: "kr", currency: "DKK" },
  { code: "DM", label: "Dominica", symbol: "EC$", currency: "XCD" },
  { code: "DO", label: "Dominican Republic", symbol: "RD$", currency: "DOP" },
  { code: "DZ", label: "Algeria", symbol: "د.ج", currency: "DZD" },
  { code: "EC", label: "Ecuador", symbol: "$", currency: "USD" },
  { code: "EE", label: "Estonia", symbol: "€", currency: "EUR" },
  { code: "EG", label: "Egypt", symbol: "£", currency: "EGP" },
  { code: "EH", label: "Western Sahara", symbol: "MAD", currency: "MAD" },
  { code: "ER", label: "Eritrea", symbol: "Nfk", currency: "ERN" },
  { code: "ES", label: "Spain", symbol: "€", currency: "EUR" },
  { code: "ET", label: "Ethiopia", symbol: "Br", currency: "ETB" },
  { code: "FI", label: "Finland", symbol: "€", currency: "EUR" },
  { code: "FJ", label: "Fiji", symbol: "$", currency: "FJD" },
  { code: "FK", label: "Falkland Islands", symbol: "£", currency: "FKP" },
  { code: "FM", label: "Micronesia", symbol: "$", currency: "USD" },
  { code: "FO", label: "Faroe Islands", symbol: "kr", currency: "DKK" },
  { code: "FR", label: "France", symbol: "€", currency: "EUR" },
  { code: "GA", label: "Gabon", symbol: "Fr", currency: "XAF" },
  { code: "GB", label: "United Kingdom", symbol: "£", currency: "GBP" },
  { code: "GD", label: "Grenada", symbol: "EC$", currency: "XCD" },
  { code: "GE", label: "Georgia", symbol: "₾", currency: "GEL" },
  { code: "GF", label: "French Guiana", symbol: "€", currency: "EUR" },
  { code: "GG", label: "Guernsey", symbol: "£", currency: "GBP" },
  { code: "GH", label: "Ghana", symbol: "₵", currency: "GHS" },
  { code: "GI", label: "Gibraltar", symbol: "£", currency: "GIP" },
  { code: "GL", label: "Greenland", symbol: "kr", currency: "DKK" },
  { code: "GM", label: "Gambia", symbol: "D", currency: "GMD" },

  { code: "GN", label: "Guinea", symbol: "Fr", currency: "GNF" },
  { code: "GP", label: "Guadeloupe", symbol: "€", currency: "EUR" },

  { code: "GQ", label: "Equatorial Guinea", symbol: "CFA", currency: "XAF" },
  { code: "GR", label: "Greece", symbol: "€", currency: "EUR" },
  {
    code: "GS",
    label: "South Georgia and the South Sandwich Islands",
    symbol: "£",
    currency: "GBP",
  },
  { code: "GT", label: "Guatemala", symbol: "Q", currency: "GTQ" },
  { code: "GU", label: "Guam", symbol: "$", currency: "USD" },

  { code: "GW", label: "Guinea-Bissau", symbol: "Fr", currency: "XOF" },
  { code: "GY", label: "Guyana", symbol: "$", currency: "GYD" },
  { code: "HK", label: "Hong Kong", symbol: "$", currency: "HKD" },
  {
    code: "HM",
    label: "Heard Island and McDonald Islands",
    symbol: "$",
    currency: "AUD",
  },
  { code: "HN", label: "Honduras", symbol: "L", currency: "HNL" },
  { code: "HR", label: "Croatia", symbol: "kn", currency: "HRK" },
  { code: "HT", label: "Haiti", symbol: "G", currency: "HTG" },
  { code: "HU", label: "Hungary", symbol: "Ft", currency: "HUF" },
  { code: "ID", label: "Indonesia", symbol: "Rp", currency: "IDR" },
  { code: "IE", label: "Ireland", symbol: "€", currency: "EUR" },
  { code: "IL", label: "Israel", symbol: "₪", currency: "ILS" },
  { code: "IM", label: "Isle of Man", symbol: "£", currency: "GBP" },
  { code: "IN", label: "India", symbol: "₹", currency: "INR" },
  {
    code: "IO",
    label: "British Indian Ocean Territory",
    symbol: "£",
    currency: "USD",
  },
  { code: "IQ", label: "Iraq", symbol: "ع.د", currency: "IQD" },
  { code: "IR", label: "Iran", symbol: "﷼", currency: "IRR" },
  { code: "IS", label: "Iceland", symbol: "kr", currency: "ISK" },
  { code: "IT", label: "Italy", symbol: "€", currency: "EUR" },
  { code: "JE", label: "Jersey", symbol: "£", currency: "GBP" },
  { code: "JM", label: "Jamaica", symbol: "J$", currency: "JMD" },
  { code: "JO", label: "Jordan", symbol: "د.ا", currency: "JOD" },
  { code: "JP", label: "Japan", symbol: "¥", currency: "JPY" },
  { code: "KE", label: "Kenya", symbol: "KSh", currency: "KES" },
  { code: "KG", label: "Kyrgyzstan", symbol: "лв", currency: "KGS" },
  { code: "KH", label: "Cambodia", symbol: "៛", currency: "KHR" },
  { code: "KI", label: "Kiribati", symbol: "$", currency: "AUD" },
  { code: "KM", label: "Comoros", symbol: "Fr", currency: "KMF" },
  {
    code: "KN",
    label: "Saint Kitts and Nevis",
    symbol: "EC$",
    currency: "XCD",
  },
  { code: "KP", label: "North Korea", symbol: "₩", currency: "KPW" },
  { code: "KR", label: "South Korea", symbol: "₩", currency: "KRW" },
  { code: "KW", label: "Kuwait", symbol: "د.ك", currency: "KWD" },
  { code: "KY", label: "Cayman Islands", symbol: "$", currency: "KYD" },
  { code: "KZ", label: "Kazakhstan", symbol: "лв", currency: "KZT" },
  { code: "LA", label: "Laos", symbol: "₭", currency: "LAK" },
  { code: "LB", label: "Lebanon", symbol: "ل.ل", currency: "LBP" },
  { code: "LC", label: "Saint Lucia", symbol: "$", currency: "XCD" },
  { code: "LI", label: "Liechtenstein", symbol: "CHF", currency: "CHF" },
  { code: "LK", label: "Sri Lanka", symbol: "₨", currency: "LKR" },
  { code: "LR", label: "Liberia", symbol: "$", currency: "LRD" },
  { code: "LS", label: "Lesotho", symbol: "L", currency: "LSL" },
  { code: "LT", label: "Lithuania", symbol: "Lt", currency: "LTL" },
  { code: "LU", label: "Luxembourg", symbol: "€", currency: "EUR" },
  { code: "LV", label: "Latvia", symbol: "Ls", currency: "LVL" },
  { code: "LY", label: "Libya", symbol: "ل.د", currency: "LYD" },
  { code: "MA", label: "Morocco", symbol: "د.م.", currency: "MAD" },
  { code: "MC", label: "Monaco", symbol: "€", currency: "EUR" },
  { code: "MD", label: "Moldova", symbol: "MDL", currency: "MDL" },
  { code: "ME", label: "Montenegro", symbol: "€", currency: "EUR" },
  { code: "MF", label: "Saint Martin", symbol: "€", currency: "EUR" },
  { code: "MG", label: "Madagascar", symbol: "Ar", currency: "MGA" },
  { code: "MH", label: "Marshall Islands", symbol: "$", currency: "USD" },
  { code: "MK", label: "Macedonia", symbol: "ден", currency: "MKD" },
  { code: "ML", label: "Mali", symbol: "Fr", currency: "XOF" },
  { code: "MM", label: "Myanmar", symbol: "K", currency: "MMK" },
  { code: "MN", label: "Mongolia", symbol: "₮", currency: "MNT" },
  { code: "MO", label: "Macao", symbol: "P", currency: "MOP" },
  {
    code: "MP",
    label: "Northern Mariana Islands",
    symbol: "$",
    currency: "USD",
  },
  { code: "MQ", label: "Martinique", symbol: "€", currency: "EUR" },
  { code: "MR", label: "Mauritania", symbol: "UM", currency: "MRO" },
  { code: "MS", label: "Montserrat", symbol: "$", currency: "XCD" },
  { code: "MT", label: "Malta", symbol: "€", currency: "EUR" },
  { code: "MU", label: "Mauritius", symbol: "₨", currency: "MUR" },
  { code: "MV", label: "Maldives", symbol: "Rf", currency: "MVR" },
  { code: "MW", label: "Malawi", symbol: "MK", currency: "MWK" },
  { code: "MX", label: "Mexico", symbol: "$", currency: "MXN" },
  { code: "MY", label: "Malaysia", symbol: "RM", currency: "MYR" },
  { code: "MZ", label: "Mozambique", symbol: "MT", currency: "MZN" },
  { code: "NA", label: "Namibia", symbol: "$", currency: "NAD" },
  { code: "NC", label: "New Caledonia", symbol: "$", currency: "XPF" },
  { code: "NE", label: "Niger", symbol: "Fr", currency: "XOF" },
  { code: "NF", label: "Norfolk Island", symbol: "$", currency: "AUD" },
  { code: "NG", label: "Nigeria", symbol: "₦", currency: "NGN" },
  { code: "NI", label: "Nicaragua", symbol: "C$", currency: "NIO" },
  { code: "NL", label: "Netherlands", symbol: "€", currency: "EUR" },
  { code: "NO", label: "Norway", symbol: "kr", currency: "NOK" },
  { code: "OM", label: "Oman", symbol: "ر.ع.", currency: "OMR" },
  { code: "PA", label: "Panama", symbol: "B/.", currency: "PAB" },
  { code: "PE", label: "Peru", symbol: "S/.", currency: "PEN" },
  { code: "PF", label: "French Polynesia", symbol: "$", currency: "XPF" },
  { code: "PG", label: "Papua New Guinea", symbol: "K", currency: "PGK" },
  { code: "PH", label: "Philippines", symbol: "₱", currency: "PHP" },
  { code: "PK", label: "Pakistan", symbol: "₨", currency: "PKR" },

  { code: "PL", label: "Poland", symbol: "zł", currency: "PLN" },
  {
    code: "PM",
    label: "Saint Pierre and Miquelon",
    symbol: "€",
    currency: "EUR",
  },
  { code: "PN", label: "Pitcairn", symbol: "$", currency: "NZD" },
  { code: "PR", label: "Puerto Rico", symbol: "$", currency: "USD" },
  { code: "PS", label: "Palestine", symbol: "₪", currency: "ILS" },
  { code: "PT", label: "Portugal", symbol: "€", currency: "EUR" },
  { code: "PW", label: "Palau", symbol: "$", currency: "USD" },
  { code: "PY", label: "Paraguay", symbol: "Gs", currency: "PYG" },
  { code: "QA", label: "Qatar", symbol: "ر.ق", currency: "QAR" },
  { code: "RE", label: "Réunion", symbol: "€", currency: "EUR" },
  { code: "RO", label: "Romania", symbol: "lei", currency: "RON" },
  { code: "RS", label: "Serbia", symbol: "Дин.", currency: "RSD" },
  { code: "RU", label: "Russia", symbol: "₽", currency: "RUB" },
  { code: "RW", label: "Rwanda", symbol: "Fr", currency: "RWF" },
  { code: "SA", label: "Saudi Arabia", symbol: "ر.س", currency: "SAR" },
  { code: "SB", label: "Solomon Islands", symbol: "$", currency: "SBD" },
  { code: "SC", label: "Seychelles", symbol: "₨", currency: "SCR" },
  { code: "SD", label: "Sudan", symbol: "ج.س.", currency: "SDG" },
  { code: "SE", label: "Sweden", symbol: "kr", currency: "SEK" },
  { code: "SG", label: "Singapore", symbol: "$", currency: "SGD" },
  { code: "SH", label: "Saint Helena", symbol: "£", currency: "SHP" },
  { code: "SI", label: "Slovenia", symbol: "€", currency: "EUR" },
  {
    code: "SJ",
    label: "Svalbard and Jan Mayen",
    symbol: "kr",
    currency: "NOK",
  },
  { code: "SK", label: "Slovakia", symbol: "€", currency: "EUR" },
  { code: "SL", label: "Sierra Leone", symbol: "Le", currency: "SLL" },
  { code: "SM", label: "San Marino", symbol: "€", currency: "EUR" },
  { code: "SN", label: "Senegal", symbol: "Fr", currency: "XOF" },
  { code: "SO", label: "Somalia", symbol: "Sh", currency: "SOS" },
  { code: "SR", label: "Suriname", symbol: "$", currency: "SRD" },
  { code: "SS", label: "South Sudan", symbol: "£", currency: "SSP" },
  { code: "ST", label: "São Tomé and Príncipe", symbol: "Db", currency: "STD" },
  { code: "SV", label: "El Salvador", symbol: "$", currency: "SVC" },
  { code: "SX", label: "Sint Maarten", symbol: "ƒ", currency: "ANG" },
  { code: "SY", label: "Syria", symbol: "ل.س", currency: "SYP" },
  { code: "SZ", label: "Swaziland", symbol: "L", currency: "SZL" },
  {
    code: "TC",
    label: "Turks and Caicos Islands",
    symbol: "$",
    currency: "USD",
  },
  { code: "TD", label: "Chad", symbol: "Fr", currency: "XAF" },
  {
    code: "TF",
    label: "French Southern Territories",
    symbol: "€",
    currency: "EUR",
  },
  { code: "TG", label: "Togo", symbol: "Fr", currency: "XOF" },
  { code: "TH", label: "Thailand", symbol: "฿", currency: "THB" },
  { code: "TJ", label: "Tajikistan", symbol: "ЅМ", currency: "TJS" },
  { code: "TK", label: "Tokelau", symbol: "$", currency: "NZD" },

  { code: "TL", label: "East Timor", symbol: "$", currency: "USD" },
  { code: "TM", label: "Turkmenistan", symbol: "m", currency: "TMT" },
  { code: "TN", label: "Tunisia", symbol: "د.ت", currency: "TND" },
  { code: "TO", label: "Tonga", symbol: "T$", currency: "TOP" },
  { code: "TR", label: "Turkey", symbol: "₺", currency: "TRY" },
  { code: "TT", label: "Trinidad and Tobago", symbol: "TT$", currency: "TTD" },
  { code: "TV", label: "Tuvalu", symbol: "$", currency: "AUD" },
  { code: "TW", label: "Taiwan", symbol: "NT$", currency: "TWD" },
  { code: "TZ", label: "Tanzania", symbol: "Sh", currency: "TZS" },
  { code: "UA", label: "Ukraine", symbol: "₴", currency: "UAH" },
  { code: "UG", label: "Uganda", symbol: "Sh", currency: "UGX" },
  {
    code: "UM",
    label: "United States Minor Outlying Islands",
    symbol: "$",
    currency: "USD",
  },
  {
    code: "US",
    label: "United States",
    symbol: "$",
    currency: "USD",
  },
  { code: "UY", label: "Uruguay", symbol: "$U", currency: "UYU" },
  { code: "UZ", label: "Uzbekistan", symbol: "лв", currency: "UZS" },
  { code: "VA", label: "Vatican City", symbol: "€", currency: "EUR" },
  {
    code: "VC",
    label: "Saint Vincent and the Grenadines",
    symbol: "$",
    currency: "XCD",
  },
  { code: "VE", label: "Venezuela", symbol: "Bs F", currency: "VEF" },
  { code: "VG", label: "British Virgin Islands", symbol: "$", currency: "USD" },
  {
    code: "VI",
    label: "United States Virgin Islands",
    symbol: "$",
    currency: "USD",
  },
  { code: "VN", label: "Vietnam", symbol: "₫", currency: "VND" },
  { code: "VU", label: "Vanuatu", symbol: "Vt", currency: "VUV" },
  { code: "WF", label: "Wallis and Futuna", symbol: "Fr", currency: "XPF" },
  { code: "WS", label: "Samoa", symbol: "T", currency: "WST" },
  { code: "XK", label: "Kosovo", symbol: "€", currency: "EUR" },
  { code: "YE", label: "Yemen", symbol: "﷼", currency: "YER" },
  { code: "YT", label: "Mayotte", symbol: "Fr", currency: "EUR" },
  { code: "ZA", label: "South Africa", symbol: "R", currency: "ZAR" },
  { code: "ZM", label: "Zambia", symbol: "ZK", currency: "ZMK" },
  { code: "ZW", label: "Zimbabwe", symbol: "Z$", currency: "ZWD" },
];
