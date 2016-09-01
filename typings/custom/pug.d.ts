declare module "pug"{

    export interface options{
        /** Used in exceptions, and required for relative includes and extends */
        filename?:string,
        /** If the doctype is not specified as part of the template, you can specify it here.
         *  It is sometimes useful to get self-closing tags and remove mirroring of boolean attributes. 
         */
        doctype?:string,
        /** Adds whitespace to the resulting html to make it easier for a human to read using '  ' as indentation.
         *  If a string is specified, that will be used as indentation instead (e.g. '\t'). 
         */
        pretty?:boolean|string,
        /**
         * Use a self namespace to hold the locals (false by default)
         */
        self?:boolean,
        /**
         * If set to true, the tokens and function body is logged to stdout
         */
        debug?:boolean,
        /**
         * If set to true, the function source will be included in the compiled template for better error messages (sometimes useful in development). 
         * It is enabled by default unless used with express in production mode.
         */
        compileDebug?:boolean,
        /**
         * If set to true, compiled functions are cached. filename must be set as the cache key.
         */
        cache?:boolean,
        /**
         * Override the default compiler
         */
        compiler?:{},
        /**
         * Override the default parser
         */
        parser?:{},
        /**
         * Add a list of global names to make accessible in templates
         */
        globals?:string[];

    }
    export interface optionsE extends options{
        /**
         * Used as the function name for your client side template function.
         */
        name:string
    }
    export var cache:{};
    export var filters:{};
    /**
     * Compile some jade source to a function which can be rendered multiple times with different locals.
    */
    export function compile(source:string, options?:options):(locals:{})=>string;
    /**
     * Compile some jade source from a file to a function which can be rendered multiple times with different locals.
     */
    export function compileFile(path:string, options?:options): (locals:{}) =>string;
    /**
     * Compile some jade source to a string of JavaScript that can be used client side along with the jade runtime.
     */
    export function compileClient(source:string, options?:options):string;
    /**
     * Compile some jade source to a string of JavaScript that can be used client side along with the jade runtime.
     */
    export function compileClientWithDependenciesTracked(source:string, options?:options):{'body':(locals:{})=>string,'dependencies':string[]};
    /**
     * Compile a jade template file to a string of Javascript that can be used client side along with the jade runtime.
     */
    export function compileFileClient(path:string,options?:options|optionsE):string;
    export function render(source:string, options:options):string;
    export function renderFile(filename:string, options:options):string;
}