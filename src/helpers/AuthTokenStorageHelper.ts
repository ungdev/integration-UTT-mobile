const ACCESS_TOKEN_LOCALSTORAGE_NAME = "access_token";
const REFRESH_TOKEN_LOCALSTORAGE_NAME = "refresh_token";

export class AuthTokenStorageHelper {

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

   clearTokens() {
       localStorage.removeItem(REFRESH_TOKEN_LOCALSTORAGE_NAME);
       localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE_NAME);
   }

}
