# Module definition incl. dependencies
app = angular.module 'bawang', ['ngRoute', 'ngResource', 'ngProgress', 'ngAnimate']

# Template base URL
app.base = '/bawang/templates/'
app.api = '/bawang/'


# Routes
app.config ['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) ->

  # Use HTML5 mode (no #!/urls)
  $locationProvider.html5Mode true

  # Bind routes to controllers
  $routeProvider
  .when '/',
    templateUrl: app.base.concat 'home.html'
    controller: 'HomeController'
  .when '/:slug',
    templateUrl: app.base.concat 'page.html'
    controller: 'PageController'
  .otherwise
    redirectTo: '/'
]


# Factories
app.factory 'DSekt', ['$resource', ($resource) ->

  # Universal factory to fetch API data from services
  return $resource app.api.concat 'api/:service/:lang/:object.json'

]

# Directives
app.directive "application", () ->

  # Application controller initializes the app in <application> tag
  directive = {}
  directive.restrict = "E"
  directive.templateUrl = app.base.concat "application.html"
  directive.controller = "ApplicationController"
  return directive


# Controllers
app.controller 'ApplicationController', ['$scope', '$window', '$route', '$rootScope', ($scope, $route, $window, $rootScope) ->

  # Publish route to child controllers
  $scope.$route = $route
  $rootScope.lang = $window.lang

]

# Controller for start pages
app.controller 'HomeController', ['$rootScope', '$scope', '$routeParams', () ->

]

# Controller for top navigation, also called shortcut bar
app.controller 'TopnavController', ['$scope', '$window', 'DSekt', ($scope, $window, DSekt) ->

  $scope.loading = true
  $scope.langTogglerHref = $window.langTogglerHref
  $scope.langTogglerLabel = $window.langTogglerLabel

  # Fetch data from factory and populate scope
  DSekt.get {service: 'shortcut', lang: $window.lang, object: 'topnav'}, (data) ->
    $scope.topnav = data
    $scope.loading = false

]

# Controller for <nav>
app.controller 'NavigationController', ['$scope', '$window', 'DSekt', ($scope, $window, DSekt) ->

  $scope.loading = true

  # Fetch data from factory and populate scope
  DSekt.get {service: 'navigation', lang: $window.lang, object: 'primary'}, (data) ->
    $scope.primarynav = data
    $scope.loading = false

]

# Controller for ng-view
app.controller 'PageController', ['$scope', '$routeParams', 'ngProgress', ($scope, $routeParams, ngProgress) ->

  ngProgress.height('4px')
  ngProgress.color('#e2007f')
  ngProgress.complete()

]