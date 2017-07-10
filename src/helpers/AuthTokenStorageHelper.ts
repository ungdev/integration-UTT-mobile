const AUTH_TOKEN_LOCALSTORAGE_NAME = "auth_token";

export class AuthTokenStorageHelper {

   constructor() {}

   /**
    * Read the token's value in the localStorage
    *
    * @return (String|null)
    */
   getToken() {
       return localStorage.getItem(AUTH_TOKEN_LOCALSTORAGE_NAME);
   }

   /**
    * Set the token's value in the localStorage
    *
    * @param String newToken
    */
   setToken(newToken) {
       localStorage.setItem(AUTH_TOKEN_LOCALSTORAGE_NAME, newToken);
   }

}
