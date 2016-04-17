module.exports = function (grunt) {
    var outDirectoryFirefox = "app-firefox";
    var outDirectoryChrome = "app-chrome";

    grunt.initConfig({
        cleanempty: {
            options: {
                // Task-specific options go here. 
            },
            chrome: {
                src: [outDirectoryChrome + "/*"]
            },
            firefox: {
                src: [outDirectoryFirefox + "/*"]
            },
        },
        ts: {
            options: {
                "target": "es6",
                "module": "es6",
                "noImplicitAny": true,
                "removeComments": true,
                "preserveConstEnums": true,
                "sourceMap": true
            },
            firefox: {
                src: ["src/**/*.ts", "!src/UI/Settings/**/*.ts", "!node_modules/**/*.ts", "!typings/**/*.ts"],
                outDir: [outDirectoryFirefox]
            },
            chrome: {
                src: ["src/**/*.ts", "!src/UI/Settings/**/*.ts", "!node_modules/**/*.ts", "!typings/**/*.ts"],
                outDir: [outDirectoryChrome]
            }
        },
        "merge-json": {
            "en-firefox": {
                src: ["src/**/*-en.json"],
                dest: outDirectoryFirefox + "/_locales/en/messages.json"
            },
            "de-firefox": {
                src: ["src/**/*-de.json"],
                dest: outDirectoryFirefox + "/_locales/de/messages.json"
            },
            "en-chrome": {
                src: ["src/**/*-en.json"],
                dest: outDirectoryChrome + "/_locales/en/messages.json"
            },
            "de-chrome": {
                src: ["src/**/*-de.json"],
                dest: outDirectoryChrome + "/_locales/de/messages.json"
            },
            "manifest-chrome": {
                src: ["configurations/manifest-base.json"],
                dest: outDirectoryChrome + "/manifest.json"
            },
            "manifest-firefox": {
                src: ["configurations/manifest-base.json", "configurations/manifest-firefox.json"],
                dest: outDirectoryFirefox + "/manifest.json"
            }
        },
        processhtml: {
            chrome: {
                src: ['src/UI/Settings/index.html'],
                dest: outDirectoryChrome + '/UI/Settings/index.html'
            },
            firefox: {
                src: ['src/UI/Settings/index.html'],
                dest: outDirectoryFirefox + '/UI/Settings/index.html'
            }
        },
        bowercopy: {
            options: {
                srcPrefix: 'bower_components'
            },
            "scripts-chrome": {
                options: {
                    destPrefix: outDirectoryChrome + '/scripts'
                },
                files: {
                    'angular.js': 'angular/angular.js',
                    'angular-route.js': 'angular-route/angular-route.js',
                    'jquery.js': 'jquery/dist/jquery.js',
                    'require.js': 'requirejs/require.js'
                }
            },
            "styles-chrome": {
                options: {
                    destPrefix: outDirectoryChrome + '/styles'
                },
                files: {
                    'semantic.css': 'semantic/dist/semantic.css',
                    'bootstrap.min.css': 'bootstrap/dist/css/bootstrap.min.css'
                }
            },
            "scripts-firefox": {
                options: {
                    destPrefix: outDirectoryFirefox + '/scripts'
                },
                files: {
                    'angular.js': 'angular/angular.js',
                    'angular-route.js': 'angular-route/angular-route.js',
                    'jquery.js': 'jquery/dist/jquery.js',
                    'require.js': 'requirejs/require.js'
                }
            },
            "styles-firefox": {
                options: {
                    destPrefix: outDirectoryFirefox + '/styles'
                },
                files: {
                    'semantic.css': 'semantic/dist/semantic.css',
                    'bootstrap.min.css': 'bootstrap/dist/css/bootstrap.min.css'
                }
            }
        }
    });
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-merge-json");
    grunt.loadNpmTasks("grunt-processhtml");
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-cleanempty');

    grunt.registerTask("chrome", [
        "ts:chrome",
        "cleanempty:chrome",
        "merge-json:en-chrome",
        "merge-json:de-chrome",
        "merge-json:manifest-chrome",
        "processhtml:chrome",
        "bowercopy:scripts-chrome",
        "bowercopy:styles-chrome"]);
    grunt.registerTask("firefox", [
        "ts:firefox",
        "cleanempty:firefox",
        "merge-json:en-firefox",
        "merge-json:de-firefox",
        "merge-json:manifest-firefox",
        "processhtml:firefox",
        "bowercopy:scripts-firefox",
        "bowercopy:styles-firefox"]);
    grunt.registerTask("default", [
        "chrome",
        "firefox"]);
};