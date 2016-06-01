angular.module('MyApp', ['appRoutes', 'mainCtrl', 'authService', 'userCtrl', 'userService', 'storyService', 'storyCrtl'])

.config(function ($httpProvider) {

  $httpProvider.interceptors.push('AuthInterceptor');

});
