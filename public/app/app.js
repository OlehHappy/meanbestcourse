angular.module('buildingManager', [
  'appRoutes',
  'mainCtrl',
  'userCtrl',
  'storyCtrl',
  'authService',
  'userService',
  'storyService',
  'reverseDirective'
])

.config(function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});
