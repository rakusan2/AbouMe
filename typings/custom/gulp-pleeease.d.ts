declare module 'gulp-pleeease'{
    function pleeease(params?:pleeease.Params):NodeJS.ReadWriteStream;
    namespace pleeease{
        interface Params{
            /**
             * Defies input files
             * ` `
             * Default: "*.css"
             */
            in?:string|string[],
            /**
             * Defines output file
             * ` `
             * Default: "app.min.css"
             */
            out?:string,
            /**
             * Allows you to override many options in one go. 
             * Accept same value as `autoprefixer.browsers` and override it, based on CanIUse database (exactly as Autoprefixer)
             */
            browsers?:string[],
            /**
             * Preprocesses your CSS using Sass. It uses libsass.
             * ` `
             * Default: false
             */
            sass?:Object|boolean,
            /**
             * Preprocesses your CSS using LESS.
             * ` `
             * Default: false
             */
            less?:Object|boolean,
            /**
             * Preprocesses your CSS using Stylus.
             * ` `
             * Default: false
             */
            stylus?:Object|boolean,
            /**
             * Adds vendor prefixes to CSS, using Autoprefixer. 
             * From Autoprefixer options, you can specify the browsers you want to target in your project
             * ` `
             * Default: {browsers: ["> 1%", "last 2 versions", "Firefox ESR", "Opera 12.1"], cascade: true}
             */
            autoprefixer?:autoprefixerParams,
            /**
             * Converts CSS shorthand filters to SVG equivalent, using pleeease-filters
             * ` `
             * Default: {oldIE: false}
             */
            filters?:filtersParams,
            /**
             * Generates pixel fallbacks for rem units, using pixrem
             * ` `
             * Default: ["16px", {replace: false, atrules: false}]
             */
            rem?:[string,remParams],
            /**
             * Converts pseudo-elements using CSS3 syntax (two-colons notation like ::after, ::before, ::first-line and ::first-letter) with the old one, using only one colon (useful for IE8 support).
             */
            pseudoElements?:boolean,
            /**
             * Adds opacity filter for IE8 when using opacity property.
             */
            opacity?:boolean,
            /**
             * Inlines @import styles, using postcss-import and rebases URLs if needed
             * ` `
             * Default: {path: process.cwd(), encoding: "utf8", transform: null}
             */
            import?:importParams,
            /**
             * Rebases URLs on @imported files, using postcss-url. 
             * Set to false to disable.
             */
            rebaseUrls?:boolean,
            /**
             * Minifies, using CSS Wring.
             * ` `
             * Default: {preserveHacks: true, removeAllComments: false}
             */
            minifier?:minifierParams,
            /**
             * Packs same CSS media-queries into one media-query rule, using MQ Packer. 
             * There are no options.
             */
            mqpacker?:boolean,
            /**
             * Pleeease.NEXT goes even further and allows you to use some of the future CSS's features today.
             * ***
             * Be careful! All these features are at-risk. 
             * You can read these great advices from Rodney Rehm about Myth. 
             * Same conclusion goes here with Pleeease.NEXT. 
             * Make responsible use of it.
             */
            next?:nextParams
        }
        interface autoprefixerParams{
            /**
             * list of browsers, which are supported in your project. 
             * You can directly specify browser version (like IE 7) or use selections (like last 2 version or > 5%)
             */
            browsers?:string[],
            /**
             * should Autoprefixer use Visual Cascade, if CSS is uncompressed. 
             * Default: true
             */
            cascade?:boolean,
            /**
             * should Autoprefixer add prefixes. 
             * Default is true
             */
            add?:boolean,
            /**
             * should Autoprefixer [remove outdated] prefixes. 
             * Default is true
             */
            remove?:boolean,
            /**
             * should Autoprefixer add prefixes for @supports parameters. 
             * Default is true
             */
            suports?:boolean,
            /**
             *  should Autoprefixer add prefixes for flexbox properties. 
             * With "no-2009" value Autoprefixer will add prefixes only for final and IE versions of specification. 
             * Default is true
             */
            flexbox?:boolean|string,
            /**
             * should Autoprefixer add IE prefixes for Grid Layout properties. 
             * Default is true
             */
            grid?:boolean,
            /**
             * custom usage statistics for > 10% in my stats browsers query
             */
            stats?:Object
        }
        interface filtersParams{
            oldIE:boolean
        }
        interface remParams{
            /**
             * the root element font size. 
             * Can be px, rem, em, %, or unitless pixel value. 
             * Pixrem also tries to get the root font-size from CSS (html or :root) and overrides this option. 
             * Use html option to disable this behaviour
             */
            rootValue?:number|string
            /**
             * replaces rules containing rems instead of adding fallbacks
             */
            replace?:boolean,
            /**
             * generates fallback in at-rules too (media-queries)
             */
            atrules?:boolean,
            /**
             * overrides root font-size from CSS html {} or :root {}
             */
            html?:boolean,
            /**
             * sets browser's range you want to target, based on browserslist
             */
            browsers?:string[],
            /**
             * control the significant digits after the decimal point
             */
            unitPrecision?:number
        }
        interface importParams{
            /**
             * Define the root where to resolve path (eg: place where node_modules are).
             * Should not be used that much.
             */
            root?:string,
            /**
             * A string or an array of paths in where to look for files.
             */
            path?:string|string[],
            /**
             * A function to transform the content of imported files. 
             * Take one argument (file content) and should return the modified content or a resolved promise with it. 
             * undefined result will be skipped.
             */
            transform?:(css)=>any,
            /**
             * An array of plugins to be applied on each imported files.
             */
            plugins?:any[],
            /**
             * Function called after the import process. 
             * Take one argument (array of imported files).
             */
            onImport?:(css)=>any,
            /**
             * You can overwrite the default path resolving way by setting this option. 
             * This function gets (id, basedir, importOptions) arguments and returns full path, array of paths or promise resolving paths. 
             * You can use resolve for that.
             */
            resolve:(id, basedir:string, importOptions:importParams)=>string|string[],
            /**
             * You can overwrite the default loading way by setting this option. 
             * This function gets (filename, importOptions) arguments and returns content or promised content.
             */
            load?:(fileName:string,importOptions:importParams)=>any,
            /**
             * By default, similar files (based on the same content) are being skipped. 
             * It's to optimize output and skip similar files like normalize.css for example. 
             * If this behavior is not what you want, just set this option to false to disable it.
             */
            skipDuplicates?:boolean,
            /**
             * An object with addDependency() method, taking file path as an argument. 
             * Called whenever a file is imported. 
             * You can use it for hot-reloading in webpack postcss-loader like this:
             */
            addDependenyTo?:{
                addDependency(filePath:string)
            }
        }
        interface minifierParams{
            /**
             * By default, CSSWring removes all unknown portion of CSS declaration that includes some CSS hacks (e.g., underscore hacks and star hacks). 
             * If you want to preserve these hacks, pass preserveHacks: true to this module.
             */
            preserveHacks?:boolean,
            /**
             * By default, CSSWring keeps a comment that start with /*!. 
             * If you want to remove all comments, pass removeAllComments: true to this module.
             */
            removeAllComments?:boolean
        }
        interface nextParams{
            /**
             * Transforms CSS custom properties into more compatible CSS. 
             * Custom properties are basically CSS variables.
             * ***
             * CSS variables begins with -- and have to be declared in a :root rule (this is a limitation from real CSS spec). 
             * Then, they can be used with the var(--variable) notation.
             * ` `
             * Default: {preserve: false}
             */
            customProperties?:customPropertiesParams,
            /**
             * Transforms custom media-queries into more compatible CSS.
             * ***
             * CSS custom media-queries have to be declared in an @custom-media rule and can be used in @media statements, with the -- syntax.
             */
            customMedia?:boolean,
            /**
             * Resolves calc() references whenever possible.
             */
            calc:boolean,
            /**
             * Transforms CSS4 color functions to more compatible CSS.
             * ` `
             * Default: {color: true, hexAlpha: true, hwb: true, rebbecapurple: true}
             */
            colors:{
                color?:boolean,
                hexAlpha?:boolean,
                hwb?:boolean,
                rebbecapurple?:boolean
            }

        }
        interface customPropertiesParams{
            /**
             * Per specifications, all fallbacks should be added since we can't verify if a computed value is valid or not. 
             * This option allows you to avoid adding too many fallback values in your CSS.
             */
            strict?:boolean,
            /**
             * Allows you to preserve custom properties & var() usage in output.
             */
            preserve?:boolean|"computed",
            /**
             * Allows you to pass an object of variables for :root. 
             * These definitions will override any that exist in the CSS. 
             * The keys are automatically prefixed with the CSS -- to make it easier to share variables in your codebase.
             */
            variabes?:Object,
            /**
             * If preserve is set to true (or "computed"), allows you to append your variables at the end of your CSS.
             */
            appendVariables:boolean,
            /**
             * Allows you to enable/disable warnings. 
             * If true, will enable all warnings. 
             * For now, it only allow to disable messages about custom properties definition not scoped in a :root selector.
             */
            warnings:boolean|Object
        }
    }
    export = pleeease;
}