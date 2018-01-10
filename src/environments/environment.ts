// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  TknAddSites: ["http://127.0.0.1:8001/","http://127.0.0.1:8000/"],
  //Fund Allocation screen
  FundAllocapiUrl: "http://127.0.0.1:8000",
  FundAllocfetch: "getfundaloc",
  FundAllocSave:"savefundaloc",
  bsecustUrl:"http://127.0.0.1:8000",
  bseCustcreate:"custcreation",
  bsemandatetUrl:"http://127.0.0.1:8000",
  bseMandataecreate:"mandatecreation",
  SetJwtapiUrl:"http://127.0.0.1:8000",
  SetJwtapiSave:"natkeyss",
  firebase: {
    apiKey: "AIzaSyAU9KLFWZ0YuHXuG8tLBLAg9ax3gJPKxck",
    authDomain: "rare-origin-161911.firebaseapp.com",
    databaseURL: "https://rare-origin-161911.firebaseio.com",
    projectId: "rare-origin-161911",
    storageBucket: "rare-origin-161911.appspot.com",
    messagingSenderId: "474890725243"
  },
  RecordSignupapiUrl:"http://127.0.0.1:8000",
  RecordSignupapiSave:"signup",
  IFSCfetchapiUrl:"http://127.0.0.1:8000",
  IFSCapifetch:"bankdet",
  notifiapiUrl :"http://127.0.0.1:8000",
  notififetch:"notification",
  registapiUrl:"http://127.0.0.1:8000",
  registfetch:"registdetfetch",
  registfrmapiUrl:"http://127.0.0.1:8000",
  detailsfrmsave:"dtlfrmsave",
 /* detailsfrmsave:"/dtlfrmsave"
  detailsfrmsave:"/dtlfrmsave"
  detailsfrmsave:"/dtlfrmsave"
  detailsfrmsave:"/dtlfrmsave"*/
  regisfrmsubmit:"regisandfatcsubmit"  

};
