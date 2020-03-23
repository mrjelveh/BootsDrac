// package metadata file for Meteor.js

Package.describe({
  name: 'mrjelveh:bootsdrac',
  summary: 'A front-end framework based on Bootstrap for developing responsive, mobile first projects on the web.',
  version: '1.0.0',
  git: 'https://github.com/mrjelveh/Bootsdrac.git'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.0');
  api.use('jquery', 'client');
  api.addFiles([
    'dist/css/bootstrap.css',
    'dist/js/bootstrap.js'
  ], 'client');
});
