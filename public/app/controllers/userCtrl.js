angular.module('userCtrl', ['userService'])

.controller('UserController', function(User){

var vm = this;

vm.processing = true;

User.all()
  .success(function (data) {
    vm.users = data;

  });

})

.controller('UserCreateController', function(User, $location, $window){

var vm = this;

vm.signupUser = function () {
  vm.message = '';
  console.log(vm.userData);
  User.create(vm.userData)
  .then(function () {
    vm.userData = {};
    vm.message = response.data.message;

    $window.localStorage.setItem('token', response.data.token);
    $location.path('/');
  });
}


});
