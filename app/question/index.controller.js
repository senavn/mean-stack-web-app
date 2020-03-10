(function () {
    'use strict';

    angular
        .module('app')
        .controller('Question.IndexController', Controller);

    function Controller($window, QuestionService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.saveQuestion = saveQuestion;
        vm.deleteQuestion = deleteQuestion;

        initUser();

        function initUser() {
            // get current user data in the API
            QuestionService.GetAll().then(function () {
                QuestionService.GetCurrent(userId).then(function (user) {
                        vm.user = user;
                    });
            });
            
        }

        function saveQuestion() {
            QuestionService.Create(vm.question)
                .then(function () {
                    FlashService.Success('Question Saved');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function deleteQuestion() {
            QuestionService.Delete(vm.question._id)
                .then(function () {
                    // log user out
                    FlashService.Success('Question Deleted');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();