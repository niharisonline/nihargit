'use strict';

class TagHelper {

    getBrowserSpecificTags(browserName) {
        const currentBrowserName = browserName.toUpperCase();
        const desktopBrowserList = ['FIREFOX', 'SAFARI', 'IE', 'PHANTOMJS', 'CHROME'];
        const mobileBrowserList = ['IPHONE'];
        const tabletBrowserList = ['IPAD'];

        if (desktopBrowserList.includes(currentBrowserName)) {
            return '@all,@desktop';
        }
        else if (mobileBrowserList.includes(currentBrowserName)) {
            return '@all,@mobile';
        }
        else if (tabletBrowserList.includes(currentBrowserName)) {
            return '@all,@tablet';
        } else {
            return '@all';
        }
    }
}
module.exports = new TagHelper();