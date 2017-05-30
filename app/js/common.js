

const app = angular.module('booksearch', []);
app.config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
})
app.controller('booksearchCtrl', function($scope, $http) {

class Search {
    constructor(token) {
        this.token = token;
    }
    getbooks(searchInput) {   
        let req = {
            method: "GET",
            url: "http://localhost:8080/api/v1/items/search?q="+searchInput,
            headers: {
                'Authorization' : "Token token="+this.token,
                'Content-type' : 'application/json; charset=utf8'
            },
            withCredentials: true
        }
        $http(req).then(
            function successCallback(response) {
                $scope.res = "URA";
            })
        /*
        let response = $.ajax({
            type: "GET",
            dataType: "JSON",
            //dataType: "jsonp",
            //jsonp: "callback",
            crossDomain: true,
            async: false,
            url: "http://localhost:8080/api/v1/items/search",
            data: {
                "q" : searchInput
            },
            beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Token token="+this.token),
            success: (data) => {alert("URA");},
            fail: () => resp = 'fail',
        }).responseText;
        */
        //return response;
        
    }
}    
    
    $scope.counter = 0;
    $scope.searchFunc = function() {
        $scope.counter++;
    }
    const search = new Search('qqcvhrm19752modk');
    $scope.res = search.getbooks('cat');
});
