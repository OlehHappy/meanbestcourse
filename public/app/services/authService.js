 angular.module('authService', [])

 .factory('Auth', function($http, $q, AuthToken) {

   var authFactory = {};

     authFactory.login = function(username, password) {

       return $http.post('/api/login', {
         username: username,
         password: password

       }) //return $http.po...
       .success(function (data) {
          AuthToken.setToken(data.token);
          return data;
       }) //.success(fun....
     } //authFactory.login....

authFactory.logout = function() {
AuthToken.setToken();
} //authFactory.logout...

authFactory.isLoggedIn = function() {
  if(AuthToken.getToken())
    return true;
    else
      return false;
}

  authFactory.getUser = function() {
    if(AuthToken.getToken())
    return $http.get('/api/me');
    else
      return $q.reject({ message: "User has now token" });
  }
return authFactory;

 }) //.factory('Auth', fu...


.factory('AuthToken', function($window){

  var authTokenFactory = {};

  authTokenFactory.getToken = function() {
    return $window.localStorage.getItem('token');
  }

  authTokenFactory.setToken = function(token) {

    if(token)
      $window.localStorage.setItem('token', token);
        else
          $window.localStorage.removeItem('token');

  }

return authTokenFactory;

}) //.factory('AuthToken', function($wind...

.factory('AuthInterceptor', function($q, $location, AuthToken) {

var interceptorFactory = {};

interceptorFactory.request = function(config) {

  var token = AuthToken.getToken();

    if(token) {

      config.headers['x-access-token'] = token;

    } //if(toke..

      return config;

}; //interceptorFactory.reque...

interceptorFactory.responseError = function(response) {
      if(response.status == 403)
        $location.path('/login');

          return $q.reject(response);

} //interceptoryFactory.resp..

return interceptorFactory;

}); //.factory('AuthIntercep...
