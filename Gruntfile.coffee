module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-sass'
  grunt.loadNpmTasks 'grunt-bower-task'
  grunt.loadNpmTasks 'grunt-contrib-connect'

  grunt.initConfig({
    bower: {
      dev: {
        options: {
          targetDir: "assets"
          cleanBowerDir: true
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
    connect: {
      server: {
        options: {
          port: 3000
          keepalive: true
        }
      }
    }
  })

  grunt.registerTask('default', ['bower', 'sass', 'coffee', 'connect'])