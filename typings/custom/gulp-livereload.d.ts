declare module 'gulp-livereload'{
    /**
     * Creates a stream which notifies the livereload server on what changed.
     */
    function livereload(options?:livereload.Options):NodeJS.ReadWriteStream;
    namespace livereload{
        interface Options{
            /**
             * Server port
             */
            port?:string,
            /**
             * Server host
             */
            host?:string,
            /**
             * Path to prepend all given paths
             */
            basePath?:string,
            /**
             * Automatically start
             */
            start?:boolean,
            /**
             * Disable console logging
             */
            quiet?:boolean,
            /**
             * Path to the browser's current page for a full page reload
             */
            reloadPage?:string
        }
        /**
         * Starts a livereload server. 
         * It takes an optional options parameter that is the same as the one noted above. 
         * Also you dont need to worry with multiple instances as this function will end immidiately if the server is already runing.
         */
        function listen(options?:livereload.Options);
        /**
         * Alternatively, you can call this function to send changes to the livereload server. 
         * You should provide either a simple string or an object, if an object is given it expects the object to have a path property.
         */
        function changed(path:string|{path:string});
        /**
         * You can also tell the browser to refresh the entire page. 
         * This assumes the page is called index.html, you can change it by providing an optional file path or change it globally with the options reloadPage.
         */
        function reload(filePath?:string);
        /**
         * You can also directly access the middleware of the underlying server instance (mini-lr.middleware) for hookup through express, connect, or some other middleware app
         */
        var middleware;
        /**
         * gulp-livereload also reveals the underlying server instance for direct access if needed. 
         * The instance is a "mini-lr" instance that this wraps around. 
         * If the server is not running then this will be undefined.
         */
        var server;

    }
    export = livereload;
}