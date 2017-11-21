// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ui.mask'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller("desafioController", function($scope,$ionicModal, $ionicPopup){
    $scope.textoErro = '';
    $scope.valorMeia = 1.40;
    $scope.valorInteira = 3.20;
    $scope.qtdMeia = 0;
    $scope.qtdInteira= 0;
    $scope.custoTotal;
    $scope.troco;
    $scope.valorRecebido;
    $scope.MIN = 0;
    $scope.MAX = 5;
    
     $scope.showAlert = function(){
        var alertPopup = $ionicPopup.alert({
            title: 'Erro',
            template: $scope.textoErro
        });
    };
    
    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope,
        animation: 'slide-in-up',
    }).then(function(modal) {
            $scope.modal = modal;
            });
    
    $scope.openModal = function(){
        $scope.modal.show();
    };
    
    $scope.closeModal = function(){
        $scope.modal.hide();
    }
    
    $scope.Calcular = function(qtdMeia, qtdInteira, valorRecebido){
        if (valorRecebido > 20){
            $scope.textoErro = 'Valor excede o permitido para pagamento!';
            $scope.showAlert();
        }
        if (qtdMeia < 0 || qtdInteira < 0){
            $scope.textoErro = 'Indique um valor de passagens válido!';
            $scope.showAlert();
            $scope.troco = '';
            $scope.custoTotal = '';
        }
        if (qtdMeia > 5 || qtdInteira > 5){
            $scope.textoErro = 'Número máximo de passagens atingido!';
            $scope.showAlert();
            $scope.troco = '';
            $scope.custoTotal = '';            
        }
        if (qtdMeia == 0 && qtdInteira == 0){
            $scope.textoErro = 'Indique um número de passagens válido!';
            $scope.showAlert();
            $scope.troco = '';
            $scope.custoTotal = '';

        }
        if (qtdInteira > 0 && qtdInteira < 6){
            $scope.custoTotal = qtdInteira * $scope.valorInteira;
            $scope.troco = valorRecebido - $scope.custoTotal;
        }
        if (qtdMeia > 0 && qtdMeia < 6){
            $scope.custoTotal = qtdMeia * $scope.valorMeia;
            $scope.troco = valorRecebido - $scope.custoTotal;
        }
        if(qtdMeia > 0 && qtdInteira > 0 && qtdMeia < 6 && qtdInteira < 6){
            $scope.custoTotal = (qtdMeia * $scope.valorMeia) + (qtdInteira * $scope.valorInteira);
            $scope.troco = valorRecebido - $scope.custoTotal;
        }
        if (valorRecebido < $scope.custoTotal){
            $scope.textoErro = 'Valor dado insuficiente para pagamento!';
            $scope.showAlert();
            $scope.troco = '';
        }
        
    };
    
    $scope.Salvar = function(valorMeia, valorInteira){
        $scope.valorMeia = valorMeia;
        $scope.valorInteira = valorInteira;
        $scope.closeModal();
    };
        
})
