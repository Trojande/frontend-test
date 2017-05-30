const app = angular.module('booksearch', ['ngRoute']);
app.config(function($httpProvider, $locationProvider, $routeProvider) {
    $httpProvider.defaults.useXDomain = true;
    //$locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');
    $routeProvider
    .when('/book/:postId', {
        templateUrl: 'views/book.html',
        controller: 'BookCtrl'
    })
    .otherwise({
        templateUrl: 'views/list.html' ,
        controller: 'BooksearchCtrl'
    });
})

app.service('searchService', function($http) {
  const searchService = {
    setToken: function(token) {
        this.token = token;
    },
    getBooks: function(searchInput) {
    const req = {
        method: "GET",
        url: "http://localhost:8080/api/v1/items/search?q="+searchInput,
        headers: {
            'Authorization' : "Token token="+this.token,
            'Content-type' : 'application/json; charset=utf8'
        },
        withCredentials: true
    }
      let promise = $http(req).then(function (response) {
        console.log(response['data']['nyplAPI']['response']['result']);
        return response.data;
      });
      return promise;
    },
    getBookInfo: function(searchInput) {
        const req = {
            method: "GET",
            url: "http://localhost:8080/api/v1/items/item_details/"+searchInput,
            headers: {
                'Authorization' : "Token token="+this.token,
                'Content-type' : 'application/json; charset=utf8'
            },
            withCredentials: true
        }
            let promise = $http(req).then(function (response) {
            console.log(response['data']);
            return response.data;
          });
          return promise;
           
    }
    
    
  };
  return searchService;
});


app.controller('BooksearchCtrl', function($scope, searchService) {
    
    const search = searchService;
    search.setToken('qqcvhrm19752modk');
    $scope.searchFunc = function() {
        search.getBooks($scope.searchText).then( (d) => $scope.books = d['nyplAPI']['response']['result']) ;
    }

});
app.controller('BookCtrl', function($scope, $routeParams, searchService) {
    const bookSearch = searchService;
    bookSearch.setToken('qqcvhrm19752modk');
    bookSearch.getBookInfo($routeParams.postId).then ( function(data) {
        $scope.book = data['nyplAPI']['response'];
    })
    
})
