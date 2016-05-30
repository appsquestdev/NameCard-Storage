// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js


var db = null;
var app = angular.module('starter', ['ionic','ngCordova','starter.controllers','jett.ionic.filter.bar']);

app.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    //db = $cordovaSQLite.openDB({name: 'namecard.db', location: 0});
    //chrome development only
    db = window.openDatabase("namecard.db", "1.0", "Cordova Demo", 200000);

    $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS cardinfo (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,position TEXT,company TEXT,mobile TEXT,officeNo TEXT,email TEXT,department TEXT,address TEXT,website TEXT,grp TEXT, imge TEXT)');
    //$cordovaSQLite.execute(db, 'ALTER TABLE cardinfo ADD COLUMN imge TEXT');
    $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS groupname (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
    //alert("yes");
    //$cordovaSQLite.execute(db,'DROP TABLE groupname');
    //$cordovaSQLite.execute(db,'DROP TABLE cardinfo');
    });
});

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html'
      }
    }
  })

  .state('app.camera', {
    url: '/camera',
    views: {
      'menuContent': {
        templateUrl: 'templates/camera.html',
        controller: 'CameraCtrl'
      }
    }
  })

  .state('app.profiledetails', {
    url: '/profiledetails',
    views: {
      'menuContent': {
        templateUrl: 'templates/profiledetails.html',
        controller:'editProfileCtrl'
      }
    }
  })

  .state('app.viewProfile', {
    url: '/viewProfile',
    views: {
      'menuContent': {
        templateUrl: 'templates/viewProfile.html',
        controller:'detailsCtrl'
      }
    }
  })

  .state('app.listcard-model', {
    url: '/listcard-model',
    views: {
      'menuContent': {
        templateUrl: 'listcard-model.html',
        controller:'listcardCtrl'
      }
    }
  })
  .state('app.cardsdetails', {
    url: '/cardsdetails',
    views: {
      'menuContent': {
        templateUrl: 'templates/cardsdetails.html',
        controller:'cardsdetailsCtrl'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
  .state('app.viewSearch', {
      url: '/viewSearch',
      views: {
        'menuContent': {
          templateUrl: 'templates/viewSearch.html',
          controller: 'viewSearchCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
