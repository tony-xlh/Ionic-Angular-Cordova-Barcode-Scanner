# Ionic-Angular-Cordova-Barcode-Scanner

An Ionic angular demo using the [cordova-plugin-dynamsoft-barcode-reader](https://github.com/xulihang/cordova-plugin-dynamsoft-barcode-reader/) plugin and the [ionic native wrapper](https://github.com/xulihang/awesome-cordova-plugins/tree/master/src/%40awesome-cordova-plugins/plugins/dynamsoft-barcode-scanner).

How to run:

1. npm install

2. You can set up your own license in the `src\app\scanner\scanner.page.html` file.

   ```html
   <app-barcode-scanner
     [isActive] = "isActive"
     [runtimeSettings] = "runtimeSettings"
     [torchOn] = "torchOn"
     dbrLicense = "DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ=="
     (onFrameRead)="onFrameRead($event)">
   </app-barcode-scanner>
   ```
   
   [Apply for a trial license](https://www.dynamsoft.com/customer/license/trialLicense/?product=dbr).

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

