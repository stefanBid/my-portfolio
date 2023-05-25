/**
 * # Utility Service ⚙️
 * @author stefanBid
 * @description Service for utility functions
 */
export default{
    /**
     * @name openLink
     * @description Open link in new tab
     * @param {string | undefined} url - Url to open
     * @throws {Error} - If url is undefined
     * @returns {void}
     */
    openLink(url:string | undefined): void{
        if(url === undefined){
            throw new Error("url is undefined!");
        } else{
            console.log("opening url: " + url)
            window.open(url);
        }
    }
}