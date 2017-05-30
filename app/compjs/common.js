'use strict';

var app = angular.module('booksearch', []);
app.config(function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
});
app.service('searchService', function ($http) {
    var searchService = {
        setToken: function setToken(token) {
            this.token = token;
        },
        getBooks: function getBooks(searchInput) {
            var req = {
                method: "GET",
                url: "http://localhost:8080/api/v1/items/search?q=" + searchInput,
                headers: {
                    'Authorization': "Token token=" + this.token,
                    'Content-type': 'application/json; charset=utf8'
                },
                withCredentials: true
            };
            var promise = $http(req).then(function (response) {
                console.log(response['data']['nyplAPI']['response']['result']);
                return response.data;
            });
            return promise;
        }

    };
    return searchService;
});

app.controller('booksearchCtrl', function ($scope, searchService) {

    var search = searchService;
    search.setToken('qqcvhrm19752modk');
    $scope.searchFunc = function () {
        search.getBooks($scope.searchText).then(function (d) {
            return $scope.books = d['nyplAPI']['response']['result'];
        });
    };
    /*
    search.getBooks('cat').then(function(d) {
        $scope.res = d['nyplAPI']['response']['result']['0']['imageID'];    
    });
    */
});