const ACCESS_TOKEN_LOCALSTORAGE_NAME = "access_token";
const REFRESH_TOKEN_LOCALSTORAGE_NAME = "refresh_token";
const USER_NAME_LOCALSTORAGE_NAME = "username";
const USER_ROLES_LOCALSTORAGE_NAME = "roles";

export class AuthStorageHelper {

   constructor() {}

   /**
    * Read the access token's value in the localStorage
    *
    * @return (String|null)
    */
   getAccessToken() {
       return localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_NAME);
   }

   /**
    * Set the access token's value in the localStorage
    *
    * @param String newAccessToken
    */
   setAccessToken(newAccessToken) {
       localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_NAME, newAccessToken);
   }

   /**
    * Read the refresh token's value in the localStorage
    *
    * @return (String|null)
    */
   getRefreshToken() {
       return localStorage.getItem(REFRESH_TOKEN_LOCALSTORAGE_NAME);
   }

   /**
    * Set the refresh token's value in the localStorage
    *
    * @param String newRefreshToken
    */
   setRefreshToken(newRefreshToken) {
       localStorage.setItem(REFRESH_TOKEN_LOCALSTORAGE_NAME, newRefreshToken);
   }

   setUserInfo(info) {
       console.log("set");
       localStorage.setItem(USER_NAME_LOCALSTORAGE_NAME, info.first_name);
       delete info.first_name;
       localStorage.setItem(USER_ROLES_LOCALSTORAGE_NAME, JSON.stringify(info));
   }

   /**
    * Remove the tokens and user info from the localStorage
    */
   clear() {
       localStorage.removeItem(REFRESH_TOKEN_LOCALSTORAGE_NAME);
       localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE_NAME);
       localStorage.removeItem(USER_NAME_LOCALSTORAGE_NAME);
       localStorage.removeItem(USER_ROLES_LOCALSTORAGE_NAME);
   }

}
