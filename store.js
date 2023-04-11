
import { Store, registerInDevtools } from "pullstate";


export const AuthStore = new Store({
  isLoggedIn: true,
});

registerInDevtools({AuthStore});