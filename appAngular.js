 var app=angular.module("myapp", ['ngRoute']);
         app.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
            $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix('');
            $routeProvider.when('/registrar',{
                  templateUrl: 'formRegistro.html',
                  controller: 'FormController'
            });

            $routeProvider.when('/verUsuarios',{
                  templateUrl: 'verUsuarios.html',
                  controller: 'VerController'
            });

            $routeProvider.when('/buscarUsuario',{
                  templateUrl: 'buscarUsuario.html',
                  controller: 'VerController'
            });
         }]);

         app.service("DatosService",function(){
            var queue=[];
            return {
               getQueue:function(){
                  return queue;
               },
               setQueue:function(cola){
                  queue = cola;
               }
            }
         });

         app.filter("BusquedaUsuario",function(){
            return function(usuarios,busqueda){
               var filtro = [];
               if(!busqueda){
                  return usuarios;
               }
               angular.forEach(usuarios,function(usuario){
                  if(usuario.nombre.toLowerCase().indexOf(busqueda.toLowerCase())!=-1){
                     filtro.push(usuario);
                  }
               });
               return filtro;
            }
         });

         
         app.controller("FormController", function($scope,DatosService,$window) {
            $scope.nombre = "";
            $scope.edad=0;
            $scope.correo="";
            $scope.queue=[];
            $scope.registrar = function(){
               var user = {nombre:$scope.nombre,edad:$scope.edad,correo:$scope.correo};
               $scope.queue.push(user);
               DatosService.setQueue($scope.queue);
               alert("Se ha registrado el usuario");
               $window.location.href = '/index.html';
            }
         });

         app.controller("VerController",function($scope,DatosService){
            $scope.usuarios = [];
            $scope.usuarios[0] = {nombre:'Luis Ponce',edad:'25',correo:'luis.ponce@softtek.com'}
            $scope.usuarios[1] = {nombre:'Ana Morales',edad:'28',correo:'anam.morales@softtek.com'}
            $scope.usuarios[2] = {nombre:'Ramon Lopez',edad:'27',correo:'ramonl.lopez@softtek.com'}
            $scope.usuarios[3] = {nombre:'Viridiana Hernandez',edad:'26',correo:'viridiana.hernandez@softtek.com'}
            $scope.queue = DatosService.getQueue();
            if($scope.queue.length>0){
               for(var cont=0;cont<$scope.queue.length;cont++){
                  $scope.usuarios.push($scope.queue[cont]);
               }
            }
         });