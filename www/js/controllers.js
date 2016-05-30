angular.module('starter.controllers', [])

.service('grouplist', function(){
  this.listgroup;
})

.service('CardDetails', function(){
  this.datacard;
})

.service('ImageModel', function(){
  this.imageLocation;
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller("CameraCtrl", function ($scope, $cordovaCamera) {

                  //function for take photo (camera)
                $scope.takePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };

                $cordovaCamera.getPicture(options).then(function (imageData) {
                   $scope.imgURI = "data:image/jpeg;base64," + imageData;
               }, function (err) {
                   // An error occured. Show a message to the user
               });
           }

           //function to choose photo from library
           $scope.choosePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };

                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }

           /*$scope.testOcrad = function() {
              OCRAD(document.getElementById("pic"), function(text){
                console.log(text);
                alert(text);

              });
            } */



})
.controller("editProfileCtrl", function($scope,$cordovaSQLite,$ionicPopup,$state,$ionicSlideBoxDelegate,$cordovaCamera,ImageModel,$ionicActionSheet,$timeout,$ionicModal) {

  $scope.uploadPhoto = function () {

    var hideSheet = $ionicActionSheet.show ({
      buttons: [
        { text: 'Choose Photo'},
        { text: 'Take Photo'}
      ],
      cancelText: 'Cancel',
      cancel: function(){
        console.log('CANCELLED');
      },
      buttonClicked: function(index) {
        if(index===0) {

          var options = {
            quality: 75,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
        };

            $cordovaCamera.getPicture(options).then(function (imageURI) {
                //$scope.uploadedPic = "data:image/jpeg;base64," + imageData;
                $scope.uploadedPic= imageURI;
                ImageModel.imageLocation = imageURI;
                //alert(imageURI);
            }, function (err) {
                // An error occured. Show a message to the user
            });

        }

        if (index===1){

          var options = {
            quality: 75,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
        };

            $cordovaCamera.getPicture(options).then(function (imageURI) {
                //$scope.uploadedPic = "data:image/jpeg;base64," + imageData;
                $scope.uploadedPic= imageURI;
                ImageModel.imageLocation = imageURI;
                //alert(imageURI);
            }, function (err) {
                // An error occured. Show a message to the user
            });
        }
      return true;
      }

    });

 }

 $scope.gName="Add Group";
  $scope.groupname = function(){
    var addgrup;
    $scope.datas = [];
    var que = "SELECT name FROM groupname";

    $cordovaSQLite.execute(db, que, []).then(function(res) {
      if (res.rows.length>0) {
        for (var i = 0; i < res.rows.length; i++) {
          $scope.datas.push(res.rows.item(i));
        }
      }
    },function(err) {
      console.error(err);
    });
    $scope.addGroupName = function(){

      addgrup=$ionicPopup.show({
        template:'<input type="text" ng-model="groupname.text">',
        title: 'Add Group Name',
        scope: $scope,
        buttons: [
          {text: 'Cancel'},
          {
            text: 'Save',
            type: 'button-positive',
            onTap: function(e){
              //$scope.groupname.text


              var query = "INSERT INTO groupname(name) VALUES (?)";
              $cordovaSQLite.execute(db, query, [$scope.groupname.text]).then(function() {
                $scope.datas = [];
                var que = "SELECT name FROM groupname";

                $cordovaSQLite.execute(db, que, []).then(function(res) {
                  if (res.rows.length>0) {
                    for (var i = 0; i < res.rows.length; i++) {
                      $scope.datas.push(res.rows.item(i));
                    }
                  }
                },function(err) {
                  console.error(err);
                });

              });
            }
        }
        ]
      });

      addgrup.then(function(res) {

      });
    }

    var showgrup;
    showgrup=$ionicPopup.show({
      template:'<div><button class="button button-icon icon ion-plus-round" ng-click="addGroupName()">Add Group</button><br><ion-list><ion-item ng-click="click(data)" ng-repeat="data in datas" type="item-text-wrap"><h2>{{data.name}}</h2></ion-item></ion-list></div>',
      title:"Select Group",
      scope: $scope,
      buttons: [
        {text: 'Cancel'},
        {
          text: 'Ok',
          type: 'button-positive',

          }

      ]

    });

    $scope.click=function(data) {
      $scope.gName=data.name;}

    showgrup.then(function(res) {
      //$scope.gName=
    });
  }



//save new contact
  $scope.save = function (name,position,company,mobile,officeNo,email,department,address,website) {

    var query = "INSERT INTO cardinfo(name,position,company,mobile,officeNo,email,department,address,website,grp,imge) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
    //alert("after insert");
    var profilePic = ImageModel.imageLocation;
    $cordovaSQLite.execute(db, query, [name,position,company,mobile,officeNo,email,department,address,website,$scope.gName,profilePic]).then(function() {
    //$state.go('app.viewProfile');
    //  $scope.post = {};
    }, function (err) {
      //console.log(err);
    });

      //open modal- view contact after save
    $ionicModal.fromTemplateUrl('view-modal.html', {
      scope:$scope,
      animation:'slide-in-up',
      focusFirstInput: true
    }).then(function(modal){
      $scope.modal=modal;
      $scope.modal.show();
      $scope.modal.hide();
    });
    //pass user input to view-modal.html
    $scope.name=name;
    $scope.position=position;
    $scope.company=company;
    $scope.mobile=mobile;
    $scope.officeNo=officeNo;
    $scope.email=email;
    $scope.department=department;
    $scope.address=address;
    $scope.website=website;
    $scope.proPic=profilePic;


  }

    $scope.openModal = function() {
        $scope.modal.show();
    };

    $scope.closeModal = function() {
        $scope.modal.hide();
    };

//   $scope.myActiveSlide = 1;
})

.controller("detailsCtrl", function($scope,$state,$cordovaSQLite,$ionicFilterBar,$ionicModal,$state,grouplist) {

  /*$scope.showFilterBar = function () {
          filterBarInstance = $ionicFilterBar.show({
              items: $scope.grps,
              update: function (filteredItems) {
                  $scope.grps = filteredItems;
              }
          });
      };*/

    /*  $scope.grps=[];
  for(var i=0; i<10;i++){
    $scope.grps[i] = {
      'color': ('#'+Math.floor(Math.random()*16777215).toString(16))
    };
  } */


      $scope.grps = [];

      var query = "SELECT name FROM groupname";

      $cordovaSQLite.execute(db, query, []).then(function(res) {
        if (res.rows.length>0) {
          for (var i = 0; i < res.rows.length; i++) {
            $scope.grps.push(res.rows.item(i));
          }
        }
      },function(err) {
        console.error(err);
      });

      $scope.showContacts= function(ObjectData) {
      //  $state.go('app.listcard-model');
      grouplist.listgroup=ObjectData.name;


      }


})

.controller("listcardCtrl", function($scope,$cordovaSQLite,$ionicPopup,grouplist,CardDetails) {

  //$scope.grouplist=grouplist;
  var grpname = grouplist.listgroup;
  $scope.datas = [];
  var qry = "SELECT id,name,position,company,mobile,officeNo,email,department,address,website,grp,imge FROM cardinfo WHERE grp=?";

  $cordovaSQLite.execute(db, qry, [grpname]).then(function(result) {
    if(result.rows.length>0) {


      for (var i = 0; i < result.rows.length; i++) {
        $scope.datas.push(result.rows.item(i));
      }
    }
  },function(err) {
    console.error(err);
  });

        $scope.viewdetails= function(ObjData) {
        //  $state.go('app.listcard-model');
        CardDetails.datacard=ObjData.id;


        }


})

.controller("cardsdetailsCtrl", function($scope,$cordovaSQLite,CardDetails) {

  var cId= CardDetails.datacard;
  $scope.cards= [];
  var query = "SELECT id,name,position,company,mobile,officeNo,email,department,address,website,grp,imge FROM cardinfo where id=?";

  $cordovaSQLite.execute(db, query, [cId]).then(function(result) {
    if(result.rows.length>0) {


      for (var i = 0; i < result.rows.length; i++) {
        $scope.cards.push(result.rows.item(i));
      }
    }
  },function(err) {
    console.error(err);
  });

})

.controller('viewSearchCtrl', function($scope,$cordovaSQLite,$ionicFilterBar) {

  $scope.searchs=[];
  $scope.showFilterBar = function () {
          filterBarInstance = $ionicFilterBar.show({
              items: $scope.searchs,
              update: function (filteredItems) {
                  $scope.searchs = filteredItems;
              }
          });
      }

      //$scope.cards= [];
      var query = "SELECT id,name,position,company,mobile,officeNo,email,department,address,website,grp,imge FROM cardinfo";

      $cordovaSQLite.execute(db, query, []).then(function(result) {
        if(result.rows.length>0) {


          for (var i = 0; i < result.rows.length; i++) {
            $scope.searchs.push(result.rows.item(i));
          }
        }
      },function(err) {
        console.error(err);
      });

      $scope.viewdetails= function(ObjData) {
      //  $state.go('app.listcard-model');
      CardDetails.datacard=ObjData.id;


      }

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
});
