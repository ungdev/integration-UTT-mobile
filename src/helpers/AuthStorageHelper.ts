const ACCESS_TOKEN_LOCALSTORAGE_NAME = "access_token";
const REFRESH_TOKEN_LOCALSTORAGE_NAME = "refresh_token";
const USER_NAME_LOCALSTORAGE_NAME = "username";
const USER_ROLES_LOCALSTORAGE_NAME = "roles";
const USER_TEAM_ID_LOCALSTORAGE_NAME = "team";
const USER_ID_LOCALSTORAGE_NAME = "id";

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

   /**
    * Set the user's name and user's roles in the localStorage
    */
   setUserInfo(user) {
       localStorage.setItem(USER_NAME_LOCALSTORAGE_NAME, user.first_name);
       localStorage.setItem(USER_ROLES_LOCALSTORAGE_NAME, JSON.stringify({
           orga: user.orga !== 0,
           volunteer: user.volunteer !== 0,
           newcomer: user.is_newcomer !== 0,
           admin: user.admin !== 0,
           ce: user.ce !== 0,
           secu: user.secu !== 0
       }));
       localStorage.setItem(USER_TEAM_ID_LOCALSTORAGE_NAME, user.team_id);
       localStorage.setItem(USER_ID_LOCALSTORAGE_NAME, user.id);
   }

   /**
    * Read the user's name in the localStorage
    *
    * @return string
    */
   getUserName() {
       return localStorage.getItem(USER_NAME_LOCALSTORAGE_NAME);
   }

   /**
    * Read the user's roles in the localStorage
    *
    * @return object
    */
   getUserRoles() {
       const roles = localStorage.getItem(USER_ROLES_LOCALSTORAGE_NAME);
       return roles ? JSON.parse(roles) : {};
   }

   getUserId() {
       return localStorage.getItem(USER_ID_LOCALSTORAGE_NAME);
   }

   /**
    * Read the user's team id in the localStorage
    *
    * @return string
    */
   getUserTeamId() {
       return localStorage.getItem(USER_TEAM_ID_LOCALSTORAGE_NAME);
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
