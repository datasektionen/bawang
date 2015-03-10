module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-sass'
  grunt.loadNpmTasks 'grunt-bower-task'

  grunt.initConfig({
    bower: {
      dev: {
        options: {
          targetDir: "assets"
          layout: "byType"
        }
      }
    }
    sass: {
      options: {
        sourceMap: false
      }
      dist: {
        files: {
          "assets/css/main.css" : "bawang/css/main.sass"
        }
      }
    }
    coffee: {
      compile: {
        files: {
          "assets/js/app.js" : ["bawang/js/*.coffee"]
        }
      }
    }
  })

  grunt.registerTask('default', ['bower', 'sass', 'coffee'])