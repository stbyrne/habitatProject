angular.module('starter.services', [])

.factory('Api', function($http, $q, ApiEndpoint) {
  console.log('ApiEndpoint', ApiEndpoint)

  var getApiData = function(accessToken, projectName) {
    var q = $q.defer();
      
  var /*projectName = 'sn_b2c2',
        accessToken = '0f710cade9cc5e747f59de22d2be5351',*/
        url = ApiEndpoint.url + "/contentbuilds?access_token=" + accessToken + "&shortname=" + projectName + "&keepEmailOptions=true";

    $http.get(url)
    .success(function(data) {
      console.log('Got some data: ', data)
      q.resolve(data);
    })
    .error(function(error){
      console.log('Had an error')
      q.reject(error);
    })

    return q.promise;
  }

  return {
    getApiData: getApiData
  };
})