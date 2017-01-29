'use strict';

(function() {
  var shell = require("shelljs");
  
  const APPS_DIR = "/usr/share/applications/"; 

  var getExec = function(file) {
    shell.exec("grep '^Exec=' " + APPS_DIR + file + " | head -1 | sed 's/^Exec=//' | sed 's/%.//'", {silent: true}, function(code, stdout, stderr) {
      return stdout.trim("\n");
    });
  };

  var getName = function(file) {
    shell.exec("grep '^Name=' " + APPS_DIR + file + " | head -1 | sed 's/^Name=//' | sed 's/%.//'", {silent: true}, function(code, stdout, stderr) {
      return stdout.trim("\n");
    });
  };

  var getIcon = function(file) {
    shell.exec("grep '^Icon=' " + APPS_DIR + file + " | head -1 | sed 's/^Icon=//' | sed 's/%.//'", {silent: true}, function(code, stdout, stderr) {
      return stdout.trim("\n");
    });
  };

  var all = function() {
    var programs = {};

    shell.ls(APPS_DIR + "*.desktop").forEach(function(file) {
      programs[getName()] = getIcon();
    });

    return programs;
  };

  module.exports = {
    'all': all
  };
})();

