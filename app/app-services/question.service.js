(function () {
    'use strict';

    angular
        .module('app')
        .factory('QuestionService', Service);

    function Service($http, $q) {
        var apiURL = "http://localhost:9050/api/questions";
        var service = {};

        service.GetAll = GetAll;
        service.Create = Create;
        service.Delete = Delete;
        
        return service;

        function GetAll() {
            return $http.get(apiURL + '/').then(handleSuccess, handleError);
        }

        function Create(user) {
            return $http.post(apiURL, question).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete(apiURL + '/' + _id).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
        
    }

})();
