export class PushNotificationsHelper {

    /**
     * Check if the app run on a device

     * @param string platform
     * @return boolean  
     */
    can(platform) :boolean {
        return platform.is("android") || platform.is("ios");
    }

}
