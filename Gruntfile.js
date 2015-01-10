'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Inject Bower packages into your source code with Grunt.
  grunt.loadNpmTasks('grunt-wiredep');

  // Add, remove and rebuild AngularJS dependency injection annotations.
  grunt.loadNpmTasks('grunt-ng-annotate');

  grunt.loadNpmTasks('grunt-protractor-runner');

  grunt.loadNpmTasks('grunt-protractor-webdriver');

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    path: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= path.app %>/scripts/**/*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: [
          'test/*.js',
          'test/tdd/{,*/}*.js',
          'test/bdd/{,*/}*.js',
          'test/e2e/{,*/}*.js'
          ],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['<%= path.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= path.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= path.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

  // The actual grunt server settings
  connect: {
    options: {
      port: 9000,
      // Change this to '0.0.0.0' to access the server from outside.
      hostname: '*',
      livereload: 35729
    },
    livereload: {
      options: {
        open: true,
        base: [
          '.tmp',
          '<%= path.app %>'
        ]
      }
    },
    test: {
      options: {
        port: 9001,
        base: [
          '.tmp',
          'test',
          '<%= path.app %>'
        ]
      }
    },
    dist: {
      options: {
        open: true,
        base: '<%= path.dist %>'
      }
    }
  },


    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= path.app %>/scripts/**/*.js'
        ]
      },
      test: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: [
          'test/*.js',
          'test/tdd/{,*/}*.js',
          'test/bdd/{,*/}*.js',
          'test/e2e/{,*/}*.js'
        ]
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= path.dist %>/{,*/}*',
            '!<%= path.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= path.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      sass: {
        src: ['<%= path.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= path.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= path.app %>/images',
        javascriptsDir: '<%= path.app %>/scripts',
        fontsDir: '<%= path.app %>/styles/fonts',
        importPath: 'app/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= path.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= path.dist %>/scripts/{,*/}*.js',
          '<%= path.dist %>/styles/{,*/}*.css',
          '<%= path.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= path.dist %>/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= path.app %>/index.html',
      options: {
        dest: '<%= path.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= path.dist %>/{,*/}*.html'],
      css: ['<%= path.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= path.dist %>','<%= path.dist %>/images']
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= path.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= path.dist %>/scripts/scripts.js': [
    //         '<%= path.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= path.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= path.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= path.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= path.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= path.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= path.dist %>'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: ['*.js', '!oldieshim.js'],
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= path.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= path.app %>',
          dest: '<%= path.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'fonts/{,*/}*.*',
            'config.xml',
            'res/**',
            'cordova.js'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= path.dist %>/images',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= path.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings

    karma: {
      options: {
        singleRun: true,
        files: []
      },
      bdd: {
        configFile: 'test/bdd.conf.js'
      },
      tdd: {
        configFile: 'test/tdd.conf.js'
      }
    },

    protractor_webdriver: { // jshint ignore:line
      options: {
        keepAlive : true 
      },
      e2eStart: {
        options: {
          path: './node_modules/.bin/',
          command: 'webdriver-manager start --standalone'
        },  
      },              
    },

    protractor: {
      e2e: {
        // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
        options: {
          keepAlive: true, // If false, the grunt process stops when the test fails.
          noColor: false, // If true, protractor will not use colors in its output.
          configFile: 'test/e2e.conf.js', // Target-specific config file
          args: {} // Target-specific arguments
        }
      },
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run([
        'build', 
        'connect:dist:keepalive'
        ]);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', 'Run tests on the app', function (target, fileType, testName) {
    var targetExecution;
    var loadFiles = [
      '../app/bower_components/angular/angular.js',
      '../app/bower_components/angular-mocks/angular-mocks.js',
      '../app/bower_components/angular-resource/angular-resource.js',
      '../app/bower_components/angular-cookies/angular-cookies.js',
      '../app/bower_components/angular-animate/angular-animate.js',
      '../app/bower_components/angular-sanitize/angular-sanitize.js',
      '../app/bower_components/angular-route/angular-route.js',
      '../app/bower_components/ionic/release/js/ionic.js',
      '../app/bower_components/ionic/release/js/ionic-angular.js',
      '../app/bower_components/angular-ui-router/release/angular-ui-router.js',
      '../app/scripts/**/*.js'
    ];

    var test;
    if (target !== undefined && fileType !== undefined && testName !== undefined) { 
       test = target + '/' + fileType + '/' + testName + '_test.js';
    }

    if (test === undefined) {
      switch(target) {
        case 'tdd': 
          targetExecution = ['karma:tdd'];
          loadFiles.push('tdd/**/*_test.js');
          break;
        case 'bdd':
          targetExecution = ['karma:bdd'];
          loadFiles.push('tdd/**/*_test.js');
          break;
        case 'unit':
          targetExecution = ['karma:bdd', 'karma:tdd'];
          loadFiles = loadFiles.concat(['tdd/**/*_test.js', 'bdd/**/*_test.js']);
          break;
        default:
          targetExecution = [
            'karma:bdd', 
            'karma:tdd',
            'protractor_webdriver:e2eStart', 
            'protractor:e2e'
          ];
          loadFiles = loadFiles.concat(['tdd/**/*_test.js', 'bdd/**/*_test.js']);
      }

      if (target !== 'e2e'){
        grunt.config('karma.options.files', loadFiles);
      }
      else {
        targetExecution = [
          'protractor_webdriver:e2eStart', 
          'protractor:e2e'
        ];
      }
    }
    else {
      var targetName = 'karma:' + target;
      targetExecution = [targetName];
      loadFiles.push(test);
      grunt.config('karma.options.files', loadFiles);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:test',
      'autoprefixer',
      'connect:test'
      ].concat(targetExecution)
    );
  });

  grunt.registerTask('build', [
    'clean:dist',
    'jshint',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);
};