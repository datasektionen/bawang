# Module definition incl. dependencies
app = angular.module 'bawang', ['ngRoute', 'ngResource', 'ngProgress', 'ngAnimate']

# Template base URL
app.base = "/bawang/templates/"


# Routes
app.config ['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) ->

  # Use HTML5 mode (no #!/urls)
  $locationProvider.html5Mode true

  # Bind routes to controllers
  $routeProvider
  .when '/content/:slug',
    templateUrl: app.base.concat 'page.html'
    controller: 'PageController'
  .otherwise
    redirectTo: '/content/home'

  return
]


# Directives
app.directive "application", () ->

  directive = {}
  directive.restrict = "E"
  directive.templateUrl = app.base.concat "application.html"
  directive.controller = "ApplicationController"
  return directive


# Controllers
app.controller 'ApplicationController', ['$scope', ($scope) ->

  $scope.swag = 9001 # over 9000

]

app.controller 'TopnavController', ['$scope', '$http', ($scope, $http) ->

  $scope.loading = true

  $http
  .get("/bawang/api/topnav.json")
  .success (data) ->
    $scope.topnav = data
    $scope.loading = false

  return
]

# Controller for <nav>
app.controller 'NavigationController', ['$scope', '$location', ($scope, $location) ->

  # Function to determine currently active page
  $scope.isActive = (route) ->
    return route is $location.path()

  return
]

# Controller for ng-view
app.controller 'PageController', ['$scope', '$routeParams', 'ngProgress', ($scope, $routeParams, ngProgress) ->

  ngProgress.height('4px')
  ngProgress.color('#e2007f')
  ngProgress.complete()

  return
]