YUI.add('demo', function(Y) {
  'use strict';

  var iot = Y.namespace('iot');

  var showHome = function(req, res, next) {
    this.showView('home');
  };

  var search = function(req, res, next) {
    var query = req.query.q || '';
    var list = new Y.iot.models.SnapList({
      url: YUI.Env.iot.search + '?q=' + query
    });

    list.load(function() {
      Y.iot.app.showView('search', {
        modelList: list
      });
    });
  };

  var showStore = function(req, res, next) {
    iot.core.store.show();
  };

  var showApp = function(req, res, next) {
    var name = req.params.name;
    var snap = new Y.iot.models.Snap({id: name});

    snap.load(function() {
      Y.iot.app.showView('snap', {
        model: snap
      });
    });
  };

  var showAppDetails = function(req, res, next) {
    var name = req.params.name;
    var snap = new Y.iot.models.Snap({id: name});

    snap.load(function() {
      Y.iot.app.showView('snap', {
        model: snap
      }, function(view) {
        view.get('container').one('.snap-nav-detail').scrollIntoView(true);
      });
    });
  };

  var showAppReviews = function(req, res, next) {
    var name = req.params.name;
    var snap = new Y.iot.models.Snap({id: name});

    snap.load(function() {
      Y.iot.app.showView('snap', {
        model: snap,
        // get as model, wrap loads in promise, promise all -> showView
        reviews: true
      }, function(view) {
        view.get('container').one('.snap-nav-detail').scrollIntoView(true);
      });
    });
  };

  var showAppSettings = function(req, res, next) {
    var name = req.params.name;
    var snap = new Y.iot.models.Snap({id: name});

    snap.load(function() {
      Y.iot.app.showView('snap', {
        model: snap,
        // get as model, wrap loads in promise, promise all -> showView
        settings: true
      }, function(view) {
        view.get('container').one('.snap-nav-detail').scrollIntoView(true);
      });
    });
  };

  var hideSearch = function(req, res, next) {
    Y.one('.search-results').setHTML();
    next();
  };

  var showSettings = function(req, res, next) {
    iot.core.settings.show();
  };

  var app = Y.namespace('iot').app = new Y.App({
    viewContainer: '.layout-app-container',
    serverRouting: true,
    transitions: false,
    views: {
      home: {
        preserve: true,
        type: 'iot.views.home'
      },
      store: {
        preserve: false,
        type: 'iot.views.store.Index'
      },
      snap: {
        preserve: false,
        type: 'iot.views.snap.snap'
      },
      search: {
        preserve: false,
        type: 'iot.views.search'
      },
      settings: {
        preserve: false,
        type: 'iot.views.settings'
      }
    },

    routes: [
      {path: '/', callbacks: [hideSearch, showHome]},
      {path: '/store', callbacks: [hideSearch, showStore]},
      {path: '/search', callbacks: [search]},
      {path: '/apps/:name', callbacks: [hideSearch, showApp]},
      {path: '/apps/:name/details', callbacks: [hideSearch, showAppDetails]},
      {path: '/apps/:name/reviews', callbacks: [hideSearch, showAppReviews]},
      {path: '/apps/:name/settings', callbacks: [hideSearch, showAppSettings]},
      {path: '/system-settings', callbacks: [hideSearch, showSettings]}
    ],

    events: {
      '.search-form button': {
        'click': function(e) {
          e.preventDefault();

          var query = e.target.ancestor().one('input').get('value');
          var list = new Y.iot.models.SnapList({
            url: YUI.Env.iot.search + '?q=' + query
          });

          list.load(function() {
            Y.iot.app.createView('search', {
              modelList: list,
              queryString: query
            }).render();
          });
        }
      }
    }
  });

  app.render().dispatch();

}, '0.0.1', {
  requires: [
    'node',
    'app',
    'template',
    'iot-config',
    'iot-views-home',
    'iot-views-snap',
    'iot-views-search',
    'iot-store',
    'iot-settings',
    'iot-models-snap',
    'iot-models-snap-list'
  ]
});
