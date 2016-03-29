'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function() {
    this.pkg = require('../../package.json');
  },

  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user
    this.log(yosay(
      'Welcome to the ' + chalk.red('Material Lite') + ' generator!'
    ));

    var prompts = [{
      name: 'appName',
      message: 'What is your project name?',
      default: 'app-name'
    },
    {
      type: 'confirm',
      name: 'jade',
      message: 'Do you want to use Jade templating?',
      default: false
    }];

    this.prompt(prompts, function(props) {
      this.props = props;

      done();
    }.bind(this));
  },

  writing: function() {
    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('_gulpfile.js', 'gulpfile.js');
    this.copy('_README.md', 'README.md');
    this.copy('_.gitignore', '.gitignore');

    // html / jade templates
    if (this.props.jade)
      this.copy('_index.jade', 'assets/jade/index.jade');
    else
      this.copy('_index.html', 'public/views/index.html');

    // sass files

    this.copy('_app.scss', 'assets/sass/app.scss');
    this.copy('_variables.scss', 'assets/sass/_variables.scss');

  },

  install: function() {
    this.installDependencies();
  }
});
