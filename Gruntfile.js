/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '  2012-<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '  <%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '  * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>.' + "\n" +
      '  * Licensed under the <%= _.pluck(pkg.licenses, "type").join(", ") %>.' + "\n" +
      '  */' + "\n\n",
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
        tasks: ['test']
      }
    },
    bower: {
      install: {
        options: {
          cleanTargetDir: true,
          cleanBowerDir: true
        }
      }
    },
    clean: ["./node_modules", "./lib"]
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bower-task');

  // Install dependencies via bower
  grunt.registerTask('dependencies', ['bower:install']);
  // Test task
  grunt.registerTask('test', ['jshint', 'qunit']);
  // Create distribution files
  grunt.registerTask('dist', ['concat', 'uglify']);
  // Default task.
  grunt.registerTask('default', ['dependencies', 'test', 'dist']);

};
