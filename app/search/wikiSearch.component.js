(function() {
    'use strict';

    angular
        .module('app.wikiSearch')
        .component('wikiSearch', {
            templateUrl: '/search/wikiSearch.html',
            bindings: {},
            controller: WikiSearchController,
        });

    WikiSearchController.$inject = ['resultsService', 'openService'];

    function WikiSearchController(resultsService, openService) {
        var ctrl = this;

        var articleLink;
        var articleText;
        var articleTitle;
        var searchTerm;

        ctrl.openArticles = openArticles;
        ctrl.openRandom = openRandom;
        ctrl.openService = openService;
        ctrl.results = [];
        ctrl.search = search;
        ctrl.searchAlign = 'vhCenter';
        ctrl.searchQuery;

        function search() {
            if (ctrl.searchAlign === 'vhCenter') {
                ctrl.searchAlign = 'hCenter';
            }

            searchTerm = ctrl.searchQuery;
            ctrl.results = [];

            return resultsService.getResults(searchTerm).then(function(data) {
                wikiResults(data);
            });;
        }

        function wikiResults(data) {
            articleTitle = data[1];
            articleText = data[2];
            articleLink = data[3];

            for (var i = 0; i < articleTitle.length; i++) {
                ctrl.results.push({
                    title: articleTitle[i],
                    text: articleText[i],
                    link: articleLink[i]
                });
            }
        };

        function openArticles(link) {
            ctrl.openService.openArticles(link);
        }

        function openRandom() {
            ctrl.openService.openRandom();
        }
    }
})();
