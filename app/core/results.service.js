(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('resultsService', resultsService);

    resultsService.$inject = ['$http'];

    function resultsService($http) {
        return {
            getResults: getResults,
        };

        function getResults(searchTerm) {
            return wikipedia();

            function wikipedia(data) {
                return $http.get('/search', {params: {searchQuery: searchTerm}})
                    .then(getWikipediaComplete)
                    .catch(getWikipediaFailed);

                function getWikipediaComplete(response) {
                    return response.data.body;
                }

                function getWikipediaFailed(err) {
                    console.log(err);
                    throw err;
                }
            }
        }
    }
})();
