function skillsMember() {
    return {
        restrict: 'E',
        termplateUrl: 'modules/skills/views/member.html',
        controller: 'skillsMemberController',
        controllerAs: 'vm',
        bindToController: true,
        scope: {
            member: '='
        }
    };
}