angular.module('buildingManager', [
  'appRoutes',
  'mainCtrl',
  'userCtrl',
  'storyCtrl',
  'authService',
  'userService',
  'storyService'
])

.config(function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});
