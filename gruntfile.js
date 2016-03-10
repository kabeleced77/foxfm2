module.exports = function(grunt) {
    grunt.initConfig({
        ts: {
            default: {
                src: ["src/**/*.ts"],  //, "!node_modules/**/*.ts", "!typings/**/*.ts"]
                outDir: ["app"],
                options: {
                    "target": "es5",
                    "noImplicitAny": true,
                    "removeComments": true,
                    "preserveConstEnums": true,
                    "outDir": "app",
                    "sourceMap": true
                }
            }
        },
        "merge-json": {
            "i18n": {
                files: {
                    "app/_locales/de/messages.json": ["src/**/*-de.json"],
                    "app/_locales/en/messages.json": ["src/**/*-en.json"]
                }
            },
            "manifest-chrome": {
                files: {
                    "app/manifest.json": ["configurations/manifest-base.json"]
                }
            },
            "manifest-firefox": {
                files: {
                    "app/manifest.json": ["configurations/manifest-base.json", "configurations/manifest-firefox.json"]
                }
            }
        },
        processhtml: {
            dist: {
                files: {
                    'app/UI/Settings/options.html': ['src/UI/Settings/options.html']
                }
            }
        }
    });
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-merge-json");
    grunt.loadNpmTasks("grunt-processhtml");

    grunt.registerTask("chrome", ["ts", "merge-json:i18n", "merge-json:manifest-chrome", "processhtml"]);
    grunt.registerTask("firefox", ["ts", "merge-json:i18n", "merge-json:manifest-firefox", "processhtml"]);
};