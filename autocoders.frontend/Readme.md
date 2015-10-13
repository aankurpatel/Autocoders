# Autocoders 
CDK Hackathon 2015 - Autocoders Project

# pre-reqs
Install Java JDK (http://www.oracle.com/technetwork/java/javase/downloads/index.html)
Install ant (http://ant.apache.org/)
Install Android SDK (http://developer.android.com/sdk/index.html)

Open SDK Manager.exe, and update/install android 22 and 23.

# Run following commends to make it work
npm install ionic -g
npm install cordova -g

cordova plugin add https://github.com/phonegap-build/PushPlugin.git
cordova plugin add https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git

ionic serve  (to open in browser)  Use Chrome Canary

ionic run android   (to install on phone)

// GP
ionic plugin add https://github.com/apache/cordova-plugin-whitelist.git

cordova plugin add cordova-plugin-camera
cordova plugin add https://github.com/wymsee/cordova-imagePicker.git

// for notification
ionic add ionic-platform-web-client
ionic plugin add phonegap-plugin-push

ionic io init
ionic config set dev_push true

ionic push --google-api-key AIzaSyDhO1kckiYgD7ZoygDwradomZbJzkTzx14
ionic config set gcm_key api-project-405931835723
