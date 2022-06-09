# Ionic-Angular-Cordova-Barcode-Scanner

An Ionic angular demo using the [cordova-plugin-dynamsoft-barcode-reader](https://github.com/xulihang/cordova-plugin-dynamsoft-barcode-reader/) plugin and the [ionic native wrapper](https://github.com/xulihang/awesome-cordova-plugins/tree/master/src/%40awesome-cordova-plugins/plugins/dynamsoft-barcode-scanner).

How to run:

1. npm install
2. Download the [wrapper](https://github.com/xulihang/Ionic-Angular-Cordova-Barcode-Scanner/releases/download/0.0.1/dynamsoft-barcode-scanner-for-1.4.1.zip) and unzip it to `node_modules\@awesome-cordova-plugins`
3. Add platforms: 

   ```
   ionic cordova platforms add android
   ionic cordova platforms add ios
   ```
   
4. Prepare the project for platforms:

   ```
   ionic cordova prepare android
   ionic cordova prepare ios
   ```
   
5. Use Android Studio and Xcode to open and run the project.

