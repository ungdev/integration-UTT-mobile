export class PlatformHelper {

    /**
     * Check if the app run on a mobile

     * @param string platform
     * @return boolean
     */
    isMobile(platform) :boolean {
        return platform.is("android") || platform.is("ios");
    }

}
