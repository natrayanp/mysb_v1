export class Natdatamodel {
}


export class Signup {
    Name = '';
    Adhaar='';
    PAN = '';
    Mobile='';    
  }

  export class Registration{

    public static OCCUPATION_CODE=[
    {code:"01",valuestr:"Business"},
    {code:"02",valuestr:"Services"},
    {code:"03",valuestr:"Professional"},
    {code:"04",valuestr:"Agriculture"},
    {code:"05",valuestr:"Retired"},
    {code:"06",valuestr:"Housewife"},
    {code:"07",valuestr:"Student"},
    {code:"08",valuestr:"Others"}
    ];

      /* FATCA OCCUPATION TYPE
      S - Service; B - Business, O- Others; X - NotCategorized
      Included it against the code as below
      */

    public static FATCA_OCCUPATION_CODE=[
      {code:"01",valuestr:"Business"},               //B
      {code:"02",valuestr:"Services"},               //S
      {code:"03",valuestr:"Professional"},           //S
      {code:"04",valuestr:"Agriculture"},            //S
      {code:"05",valuestr:"Retired"},                //O
      {code:"06",valuestr:"Housewife"},              //O
      {code:"07",valuestr:"Student"},                //O
      {code:"08",valuestr:"Others"},                 //O
      {code:"09",valuestr:"Doctor"},                 //S
      {code:"41",valuestr:"Private Sector Service"}, //S
      {code:"42",valuestr:"Public Sector Service"},  //S
      {code:"43",valuestr:"Forex Dealer"},           //B
      {code:"44",valuestr:"Government Service"},     //S
      {code:"99",valuestr:"Unknown/Not Applicable"}  //O
      ];


      
      public static STATE=["Andaman & Nicobar","Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chattisgarh","Chandigarh","Dadra and Nagar","Daman & Diu","Delhi","Haveli","Goa","Gujarat","Himachal Pradesh","Haryana","Jharkhand","Jammu & Kashmir","Karnataka","Kerala","Lakshadweep","Maharashtra","Meghalaya","Manipur","Madhya Pradesh","Mizoram","Nagaland","Orissa","Punjab","Pondicherry","Rajasthan","Sikkim","Tamil Nadu","Tripura","Uttarakhand","Uttar Pradesh","West Bengal","Others"];
  
      public static COUNTRY=["Afghanistan","Aland Islands","Albania","Algeria","American Samoa"," Andorra"," Angola"," Anguilla"," Antarctica"," Antigua And Barbuda"," Argentina"," Armenia"," Aruba"," Australia"," Austria"," Azerbaijan"," Bahamas"," Bahrain"," Bangladesh"," Barbados"," Belarus"," Belgium"," Belize"," Benin"," Bermuda"," Bhutan"," Bolivia"," Bosnia And Herzegovina"," Botswana"," Bouvet Island"," Brazil"," British Indian Ocean Territory"," Brunei Darussalam"," Bulgaria"," Burkina Faso"," Burundi"," Cambodia"," Cameroon"," Canada"," Cape Verde"," Cayman Islands"," Central African Republic"," Chad"," Chile"," China"," Christmas Island"," Cocos (Keeling) Islands"," Colombia"," Comoros"," Congo"," Congo, The Democratic Republic Of The"," Cook Islands"," Costa Rica"," Cote DIvoire"," Croatia"," Cuba"," Cyprus"," Czech Republic"," Denmark"," Djibouti"," Dominica"," Dominican Republic"," Ecuador"," Egypt"," El Salvador"," Equatorial Guinea"," Eritrea"," Estonia"," Ethiopia"," Falkland Islands (Malvinas)"," Faroe Islands"," Fiji"," Finland"," France"," French Guiana"," French Polynesia"," French Southern Territories"," Gabon"," Gambia"," Georgia"," Germany"," Ghana"," Gibraltar"," Greece"," Greenland"," Grenada"," Guadeloupe"," Guam"," Guatemala"," Guernsey"," Guinea"," Guinea-Bissau"," Guyana"," Haiti"," Heard Island And Mcdonald Islands"," Holy See (Vatican City State)"," Honduras"," Hong Kong"," Hungary"," Iceland"," India"," Indonesia"," Iran, Islamic Republic Of"," Iraq"," Ireland"," Isle Of Man"," Israel"," Italy"," Jamaica"," Japan"," Jersey"," Jordan"," Kazakhstan"," Kenya"," Kiribati"," Korea, Democratic Peoples Republic Of"," Korea, Republic Of"," Kuwait"," Kyrgyzstan"," Lao Peoples Democratic Republic"," Latvia"," Lebanon"," Lesotho"," Liberia"," Libyan Arab Jamahiriya"," Liechtenstein"," Lithuania"," Luxembourg"," Macao"," Macedonia", "The Former Yugoslav Republic of"," Madagascar"," Malawi"," Malaysia"," Maldives"," Mali"," Malta"," Marshall Islands"," Martinique"," Mauritania"," Mauritius"," Mayotte"," Mexico"," Micronesia, Federated States Of"," Moldova, Republic Of"," Monaco"," Mongolia"," Montserrat"," Morocco"," Mozambique"," Myanmar"," Namibia"," Nauru"," Nepal"," Netherlands"," Netherlands Antilles"," New Caledonia"," New Zealand"," Nicaragua"," Niger"," Nigeria"," Niue"," Norfolk Island"," Northern Mariana Islands"," Norway"," Oman"," Pakistan"," Palau"," Palestinian Territory, Occupied"," Panama"," Papua New Guinea"," Paraguay"," Peru"," Philippines"," Pitcairn"," Poland"," Portugal"," Puerto Rico"," Qatar"," Reunion"," Romania"," Russian Federation"," Rwanda"," Saint Helena"," Saint Kitts And Nevis"," Saint Lucia"," Saint Pierre And Miquelon"," Saint Vincent And The Grenadines"," Samoa"," San Marino"," Sao Tome And Principe"," Saudi Arabia"," Senegal"," Serbia And Montenegro"," Seychelles"," Sierra Leone"," Singapore"," Slovakia"," Slovenia"," Solomon Islands"," Somalia"," South Africa"," South Georgia And The South Sandwich Islands"," Spain"," Sri Lanka"," Sudan"," Suriname"," Svalbard And Jan Mayen"," Swaziland"," Sweden"," Switzerland"," Syrian Arab Republic"," Taiwan, Province Of China"," Tajikistan"," Tanzania, United Republic Of"," Thailand"," Timor-Leste"," Togo"," Tokelau"," Tonga"," Trinidad And Tobago"," Tunisia"," Turkey"," Turkmenistan"," Turks And Caicos Islands"," Tuvalu"," Uganda"," Ukraine"," United Arab Emirates"," United Kingdom"," United States of America"," United States Minor Outlying Islands"," Uruguay"," Uzbekistan"," Vanuatu"," Venezuela"," Viet Nam"," Virgin Islands, British"," Virgin Islands, U.S."," Wallis And Futuna"," Western Sahara"," Yemen"," Zambia"," Zimbabwe"];
      public static FATCA_COUNTRY=["Andorra","United Arab Emirates","Afghanistan","Antigua And Barbuda","Anguilla","Albania","Armenia","Netherlands Antilles","Angola","Antarctica","Argentina","American Samoa","Austria","Australia","Aruba","Aland Islands","Azerbaijan","Bosnia And Herzegovina","Barbados","Bangladesh","Belgium","Burkina Faso","Bulgaria","Bahrain","Burundi","Benin","Saint Barthelemy","Bermuda","Brunei Darussalam","Bolivia","Bonaire, Sint Eustatius And Saba","Brazil","Bahamas","Bhutan","Bouvet Island","Botswana","Belarus","Belize","Canada","Cocos (Keeling) Islands","Congo, The Democratic Republic Of The","Central African Republic","Congo","Switzerland","Côte D'ivoire","Cook Islands","Chile","Cameroon","China","Colombia","Costa Rica","Cuba","Cape Verde","Curacao","Christmas Island","Cyprus","Czech Republic","Germany","Djibouti","Denmark","Dominica","Dominican Republic","Algeria","Ecuador","Estonia","Egypt","Western Sahara","Eritrea","Spain","Ethiopia","Finland","Fiji","Falkland Islands (Malvinas)","Micronesia, Federated States Of","Faroe Islands","France","Gabon","United Kingdom","Grenada","Georgia","French Guiana","Guernsey","Ghana","Gibraltar","Greenland","Gambia","Guinea","Guadeloupe","Equatorial Guinea","Greece","South Georgia And The South Sandwich Islands","Guatemala","Guam","Guinea-Bissau","Guyana","Hong Kong","Heard Island And McDonald Islands","Honduras","Croatia","Haiti","Hungary","Indonesia","Ireland","Israel","Isle Of Man","India","British Indian Ocean Territory","Iraq","Iran, Islamic Republic Of","Iceland","Italy","Jersey","Jamaica","Jordan","Japan","Kenya","Kyrgyzstan","Cambodia","Kiribati","Comoros","Saint Kitts And Nevis","Korea, Democratic People's Republic Of","Korea, Republic Of","Kuwait","Cayman Islands","Kazakhstan","Lao People's Democratic Republic","Lebanon","Saint Lucia","Liechtenstein","Sri Lanka","Liberia","Lesotho","Lithuania","Luxembourg","Latvia","Libyan Arab Jamahiriya","Morocco","Monaco","Moldova, Republic Of","Montenegro","Saint Martin","Madagascar","Marshall Islands","Macedonia, The Former Yugoslav Republic Of","Mali","Myanmar","Mongolia","Macao","Northern Mariana Islands","Martinique","Mauritania","Montserrat","Malta","Mauritius","Maldives","Malawi","Mexico","Malaysia","Mozambique","Namibia","New Caledonia","Niger","Norfolk Island","Nigeria","Nicaragua","Netherlands","Norway","Nepal","Nauru","Niue","New Zealand","Oman","Panama","Peru","French Polynesia","Papua New Guinea","Philippines","Pakistan","Poland","Saint Pierre And Miquelon","Pitcairn","Puerto Rico","Palestinian Territory, Occupied","Portugal","Palau","Paraguay","Qatar","Reunion Island","Romania","Serbia","Russian Federation","Rwanda","Saudi Arabia","Solomon Islands","Seychelles","Sudan","Sweden","Singapore","Saint Helena, Ascension And Tristan da Cunha","Slovenia","Svalbard And Jan Mayen Islands","Slovakia","Sierra Leone","San Marino","Senegal","Somalia","Suriname","South Sudan","Sao Tome And Principe","El Salvador","Sint Maarten (Dutch Part)","Syrian Arab Republic","Swaziland","Turks And Caicos Islands","Chad","French Southern Territories","Togo","Thailand","Tajikistan","Tokelau","Timor-Leste","Turkmenistan","Tunisia","Tonga","Turkey","Trinidad And Tobago","Tuvalu","Taiwan, Province Of China","Tanzania, United Republic Of","Ukraine","Uganda","United States Minor Outlying Islands","United States","Uruguay","Uzbekistan","Vatican City State","Saint Vincent And The Grenadines","Venezuela, Bolivarian Republic Of","Virgin Islands, British","Virgin Islands, U.S.","Viet Nam","Vanuatu","Wallis And Futuna","Samoa","Not categorised","Yemen","Mayotte","South Africa","Zambia","Zimbabwe","Others"];
  
      public static NOMINEE_RELATIONSHIP =["Father","Mother","Spouse","Brother","Sister","Child"];
 
      public static FATCA_IDTYPE=[
        {code:"A",valuestr:"Passport"},
        {code:"B",valuestr:"Election ID Card"},
        {code:"C",valuestr:"PAN Card"},
        {code:"D",valuestr:"ID Card"},
        {code:"E",valuestr:"Driving License"},
        {code:"G",valuestr:"UIDIA / Aadhar letter"},
        {code:"H",valuestr:"NREGA Job Card"},
        {code:"O",valuestr:"Others"},
        {code:"X",valuestr:"Not categorized"},
        {code:"T",valuestr:"TIN [Tax Payer Identification Number]"},
        {code:"C1",valuestr:"Company Identification Number"},
        {code:"G1",valuestr:"US GIIN"},
        {code:"E1",valuestr:"Global Entity Identification Number"}
      ];



}


export class regisuccfatcadetail{
      //createdetailfrm
      clientname: string; 
      clientpan: string;
      clientcode:string;
      clientgender:string;
      clientdob:Date;
      clientemail:string;
      clientmobile:number;
      clientcommode:string;
      clientholding:string;
      clientpepflg:string;
      clientisnri:boolean;
      clienttaxstatusres: string;
      clienttaxstatusnri: string;
      clientocupation:string;
      clientocutyp:string;
      clienthasnominee:boolean;
      clientnomineename:string;
      clientnomineerel:string;
      clientnomineedob:Date;
      clientnomineeaddres:string;
      clientfndhldtype:string;
      //createclientaddfrm
      clientaddress1:string;
      clientaddress2:string;
      clientaddress3:string;
      clientcity: string;
      clientstate:string;
      clientcountry: string;
      clientpincode: number;
      clientforinadd1:string;
      clientforinadd2:string;
      clientforinadd3:string;
      clientforcity:string;
      clientforstate: string;
      clientforcountry:string;
      clientforpin:number;
      //createclientbankfrm
      clientactype:string;
      clientacnumb :number;
      clientmicrno:string;
      clientifsc:string;
      //createclientfatcafrm
      clientsrcwealth:string;
      clientincslb :string;
      clientpobir:string;
      clientcobir:string;
      clienttaxrescntry1:string;
      clienttaxid1: string;
      clienttaxidtype1:string;
      clienttaxrescntry2:string;
      clienttaxid2:string;
      clienttaxidtype2:string;
      clienttaxrescntry3:string;
      clienttaxid3:string;
      clienttaxidtype3:string;
      clienttaxrescntry4:string;
      clienttaxid4:string;
      clienttaxidtype4:string;
}



    export class bankifscdetail{
      bank: string; 
      ifsc: string; 
      micr: string; 
      branch: string; 
      address: string; 
      contact: string; 
      city: string; 
      district: string; 
      state: string;
      failed:boolean;
      errormsg:string;
    }

  