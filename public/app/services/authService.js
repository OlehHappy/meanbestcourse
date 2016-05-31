 angular.module('authService', [])

 .factory('Auth', function($http, $q, AuthToken) {

   var authFactory = {};

     authFactory.login = function(username, password) {

       return $http.post('/api/login', {
         username: username,
         password: password;

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



 }) //.factory('Auth', fu...
