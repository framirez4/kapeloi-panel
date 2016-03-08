(function() {
  'use strict';

  angular.module( 'controller.home', [
    'angular-storage',
    'angular-jwt'
  ])
  .controller( 'HomeCtrl', HomeController);


  function HomeController( $scope, $http, store, jwtHelper ) {

    $scope.jwt = store.get('jwt');
    //$scope.decodedJwt = $scope.jwt && jwtHelper.decodeToken($scope.jwt);

    $scope.getUsers = function(){
      $http({
        method: 'GET',
        url: 'https://localhost:8000/api/users',
        headers: { 'x-access-token': $scope.jwt }
      }).then(function(data) {
        console.log(data.data);
        $scope.users = data.data;
      });
    }
    $scope.deleteUser = function(id) {
      var url = 'https://localhost:8000/api/users/'+id;
      console.log(url);
      $http({
        method: 'DELETE',
        url: url,
        headers: {'x-access-token': $scope.jwt }
      }).then(function(data) {
        $scope.getUsers();
        console.log(data);
      })
    }



    $scope.getComms = function() {
      $http({
        method: 'GET',
        url: 'https://localhost:8000/api/comms',
        headers: { 'x-access-token': $scope.jwt }
      }).then(function(data) {
        console.log(data.data);
        $scope.comms = data.data;
      });
    }
    $scope.deleteComm = function(id) {
      var url = 'https://localhost:8000/api/comms/'+id;
      console.log(url);
      $http({
        method: 'DELETE',
        url: url,
        headers: {'x-access-token': $scope.jwt }
      }).then(function(data) {
        $scope.getUsers();
        console.log(data);
      })
    }

    $scope.getUsers();
    $scope.getComms();

  /*
    $scope.callAnonymousApi = function() {
      // Just call the API as you'd do using $http
      callApi('Anonymous', 'http://localhost:3001/api/random-quote');
    }

    $scope.callSecuredApi = function() {
      callApi('Secured', 'http://localhost:3001/api/protected/random-quote');
    }

    function callApi(type, url) {
      $scope.response = null;
      $scope.api = type;
      $http({
        url: url,
        method: 'GET'
      }).then(function(quote) {
        $scope.response = quote.data;
      }, function(error) {
        $scope.response = error.data;
      });
    }
  */
  };
  
})();
