angular.module('starter.controllers', [])

.factory('buildFactory', function(url, $http) {
    
    return $.ajax({
        
        /*url: "https://habitat.inkling.com/api/contentbuilds/?access_token=0f75124f0c9e5384a7fb675e648dff75&shortname=sn_b2c2&keepEmailOptions=true",*/
        /*url: "https://habitat.inkling.com/api/contentbuilds/?access_token=0f75124f0c9e5384a7fb675e648dff75&shortname=sn_1469&keepEmailOptions=true",*/
        url: url,
        dataType: 'json',
        /*cache: false,*/
        timeout: 10000,
        success: function(data) {
            return data;
        }   
    });
})

.controller('ProjectCtrl', function($scope, $ionicModal, $http, $timeout, $ionicLoading, $ionicPopover, $ionicNavBarDelegate, $ionicHistory) {
    

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.projectData = {};
  $scope.projectData.name = '';

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/fetch.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeProjectFetch = function() {
      $scope.modal.hide();
      $scope.projectData.name = '';
  };

  // Open the login modal
  $scope.fetch = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.getProject = function() {
      
      $ionicLoading.show({
    template: '<p>Getting Habitat Projects</p><i class="icon ion-loading-c"></i>',
    showBackdrop: true
    });
      
    var projectName = $scope.projectData.name,
        accessToken = '0f710cade9cc5e747f59de22d2be5351',
        url = "https://habitat.inkling.com/api/contentbuilds/?access_token=" + accessToken + "&shortname=" + projectName + "&keepEmailOptions=true";
        /*url = projectName + ".json";*/
      
    $http.get(url).then(function(data){
        
        console.log(data.data);
        $scope.results = data.data.result;
        
        $ionicLoading.hide();
        
        $timeout(function() {
        $scope.closeProjectFetch();
        }, 500);
        
        console.log($scope.projectData.name);
        
        $scope.projectDetails = [];
        
        angular.forEach($scope.results, function(project){

                    /*var key = value['id'];*/
                    var shortname = project.shortname,
                        revision = project.revision,
                        initiator = project.initiator,
                        created = project.createdAt,
                        date = new Date(created),
                        dateCreated = date.toUTCString().slice(0, -4),
                        downloadLink = project.downloadLink;
            
                      
            this.push({shortname: shortname, revision: revision, initiator:initiator, dateCreated:dateCreated, downloadLink:downloadLink})

                    /*this[key] = value['content'];*/

                }, $scope.projectDetails);
        
        console.log($scope.projectDetails);
        
        
    }, function(data){
        
        console.log("Error, please check the project name");
        $ionicLoading.hide();
        $scope.openPopover();
    });
      
      //Set and Get index number to pass to view
      
      $scope.setIndex = function(number){
           $scope.indexNumber = number;
          console.log($scope.indexNumber);
      }
      
      $scope.getIndex = function(number){
           return $scope.indexNumber;
      }
      
     

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    
  };
    
    //Build a new project 
    
    $scope.buildProject = function() {
        
        $ionicLoading.show({
            template: '<p>Building new Habitat Project</p><i class="icon ion-loading-c"></i>',
            showBackdrop: true
        });
        
        console.log('Trying to Build');
        
        var url = 'https://habitat.inkling.com/api/contentbuilds?access_token=p-970d21fbdd8540e99bd7b23ffb9e0af1',
            parameter = {"shortname":"sn_b2c2","userParameters":{"track":"epub","autoDownload":false,"targets":["epub"]}};
        
        $http({
            url: url,
            method: "POST",
            /*data: {"shortname":"sn_b2c2","userParameters":{"track":"epub","autoDownload":false,"targets":["epub"]}}*/
            data: {"shortname":"sn_b2c2","type": "epub"}
        }).then(function(data){
            
            console.log(data);
            $ionicLoading.hide();
            
        }, function(data, status, headers, config, statusText){
            
            console.log('Data: ' + data);
            console.log('Status: ' + status);
            console.log('Headers: ' + headers);
            console.log('Config: ' + config);
            console.log('Status Text: ' + statusText);
            $ionicLoading.hide();
        })
        
        /*$.ajax({
            url: 'https://habitat.inkling.com/api/contentbuilds/',
            type: "POST",
            dataType: "json",
            data: {"shortname":"sn_b2c2","type":"epub"},
            success: function(data){
                $ionicLoading.hide();
                console.log(data);
            },
            error: function(data, status, config){
                $ionicLoading.hide();
                console.log('Error 1' + data);
                console.log('Error 2' + status);
                console.log('Error 3' + config);
            }
        });*/
        
    }
    
    //Popover validation for invalid/Un-entitled Habitat projects
    
      var template = '<ion-popover-view style="height:60px;"><ion-content><p style="height:60px;margin:5px 10px;">Hmm are you sure the Habitat Project Name is correct?</p></div></ion-content></ion-popover-view>';

      $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope,
      });

      // .fromTemplateUrl() method
      $ionicPopover.fromTemplateUrl('my-popover.html', {
        scope: $scope,
      }).then(function(popover) {
        $scope.popover = popover;
      });

      $scope.openPopover = function() {
        $scope.popover.show(".project");
      };
      $scope.closePopover = function() {
        $scope.popover.hide();
        
      };
      //Cleanup the popover when we're done with it!
      $scope.$on('$destroy', function() {
        $scope.popover.remove();
      });
      // Execute action on hide popover
      $scope.$on('popover.hidden', function() {
        // Execute action
      });
      // Execute action on remove popover
      $scope.$on('popover.removed', function() {
        // Execute action
      });
    
})

/*.controller('ProjectCtrl', function($scope) {
  $scope.projects = [];
})*/

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
 