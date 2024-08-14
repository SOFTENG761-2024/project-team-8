import Parse from "parse";

const APP_ID = import.meta.env.VITE_BACK4APP_APP_ID ?? "";
const JS_KEY = import.meta.env.VITE_BACK4APP_JS_KEY ?? "";

Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = "https://parseapi.back4app.com/";

export default Parse;
