cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-locationservices/www/Coordinates.js",
        "id": "cordova-plugin-locationservices.Coordinates",
        "clobbers": [
            "Coordinates",
            "cordova.plugins.locationServices.Coordinates",
            "plugin.locationServices.Coordinates"
        ]
    },
    {
        "file": "plugins/cordova-plugin-locationservices/www/PositionError.js",
        "id": "cordova-plugin-locationservices.PositionError",
        "clobbers": [
            "PositionError",
            "cordova.plugins.locationServices.PositionError",
            "plugin.locationServices.PositionError"
        ]
    },
    {
        "file": "plugins/cordova-plugin-locationservices/www/Position.js",
        "id": "cordova-plugin-locationservices.Position",
        "clobbers": [
            "Position",
            "cordova.plugins.locationServices.PositionError",
            "plugin.locationServices.PositionError"
        ]
    },
    {
        "file": "plugins/cordova-plugin-locationservices/www/LocationServices.js",
        "id": "cordova-plugin-locationservices.LocationServices",
        "clobbers": [
            "LocationServices",
            "cordova.plugins.locationServices.geolocation",
            "plugin.locationServices.geolocation"
        ]
    },
    {
        "file": "plugins/com.synconset.imagepicker/www/imagepicker.js",
        "id": "com.synconset.imagepicker.ImagePicker",
        "clobbers": [
            "plugins.imagePicker"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
        "id": "cordova-plugin-camera.Camera",
        "clobbers": [
            "Camera"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
        "id": "cordova-plugin-camera.CameraPopoverOptions",
        "clobbers": [
            "CameraPopoverOptions"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/www/Camera.js",
        "id": "cordova-plugin-camera.camera",
        "clobbers": [
            "navigator.camera"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/www/CameraPopoverHandle.js",
        "id": "cordova-plugin-camera.CameraPopoverHandle",
        "clobbers": [
            "CameraPopoverHandle"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-locationservices": "1.1.0",
    "com.synconset.imagepicker": "1.0.6",
    "cordova-plugin-camera": "1.2.0"
}
// BOTTOM OF METADATA
});