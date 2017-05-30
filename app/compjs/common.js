"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Search = function () {
    function Search(token) {
        _classCallCheck(this, Search);

        this.token = token;
    }

    _createClass(Search, [{
        key: "getbooks",
        value: function getbooks(searchInput) {
            $.ajax({
                type: "POST",
                url: "http://api.repo.nypl.org/api/v1/items/search?q=" + searchInput + "&publicDomainOnly=true",
                dataType: "json",
                headers: {
                    'Authorization': 'Token token=' + this.token
                },
                beforeSend: function beforeSend(xhr) {
                    xhr.setRequestHeader("Authorization", "Token token=" + this.token);
                },
                success: function success() {
                    return 'yes';
                }
            });
        }
    }]);

    return Search;
}();

var app = angular.module('booksearch', []);

app.controller('booksearchCtrl', function ($scope) {
    $scope.counter = 0;
    $scope.searchFunc = function () {
        $scope.counter++;
    };
    var search = new Search('qqcvhrm19752modk');
    $scope.res = search.getbooks('cat');
});