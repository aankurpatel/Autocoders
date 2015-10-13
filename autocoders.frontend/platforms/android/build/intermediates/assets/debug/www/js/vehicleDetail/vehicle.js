/**
 * Created by singhap on 10/12/15.
 */
angular.module('starter')
  .service('vehicle', function() {
    var vehicle;
    return{
      'selectedVehicle':function(selVehicle){
        if(selVehicle){
          vehicle = selVehicle;
        }
        return vehicle;
      }
    }
  });
