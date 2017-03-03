module.exports = function (grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "src/Jaxis-Break-It/wwwroot/css/screen.css": "src/Jaxis-Break-It/wwwroot/css/screen.less" // destination file and source file
                }
            }
        },
        watch: {
            styles: {
                files: ['src/Jaxis-Break-It/wwwroot/**/*.less'], // which files to watch
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    grunt.registerTask('default', ['less', 'watch']);
};