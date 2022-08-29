import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FrameResult } from 'awesome-cordova-plugin-dynamsoft-barcode-scanner';

const predefinedRegion = {
  left: 15,
  top: 25,
  right: 85,
  bottom: 60
}

/**
 * default scan region in portrait mode without rotating the frame
 */
let scanRegionForRuntimeSettings = {
  left: 25,
  top: 15,
  right: 60,
  bottom: 85
}


@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  isActive: boolean;
  qrcodeonly: boolean;
  torchOn: boolean;
  runtimeSettings: string;
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
  zoomFactor: number;
  rotation: number;

  constructor(private router: Router) {
    console.log("constructor");
    if (this.router.getCurrentNavigation().extras.state) {
      const routeState = this.router.getCurrentNavigation().extras.state;
      if (routeState) {
        this.qrcodeonly = routeState.qrcodeonly;
      }
    }
    this.updateRuntimeSettings();
    this.isActive = true;
    this.torchOn = false;
    this.rotation = 0;
   }

  updateRuntimeSettings(){
    if (this.qrcodeonly === true) {
      this.runtimeSettings = this.updateRuntimeSettingsWithScanRegion("{\"ImageParameter\":{\"BarcodeFormatIds\":[\"BF_QR_CODE\"],\"Description\":\"\",\"Name\":\"Settings\"},\"Version\":\"3.0\"}");
    }else{
      this.runtimeSettings = this.updateRuntimeSettingsWithScanRegion("{\"ImageParameter\":{\"BarcodeFormatIds\":[\"BF_ALL\"],\"Description\":\"\",\"Name\":\"Settings\"},\"Version\":\"3.0\"}");
    }
    console.log("update runtime settings: "+this.runtimeSettings);
  }

  ngOnInit() {
    // scan region for portrait.
    this.width = 1080;
    this.height = 1920;
    this.left = this.width * predefinedRegion.left / 100;
    this.right = this.width * predefinedRegion.right / 100;
    this.top = this.height * predefinedRegion.top / 100;
    this.bottom = this.height * predefinedRegion.bottom / 100;
  }

  updateRuntimeSettingsWithScanRegion(template:string){
    const settings = JSON.parse(template);
    settings["ImageParameter"]["RegionDefinitionNameArray"] = ["Settings"];
    settings["RegionDefinition"] = {
                                    "Left": scanRegionForRuntimeSettings.left,
                                    "Right": scanRegionForRuntimeSettings.right,
                                    "Top": scanRegionForRuntimeSettings.top,
                                    "Bottom": scanRegionForRuntimeSettings.bottom,
                                    "MeasuredByPercentage": 1,
                                    "Name": "Settings",
                                  };
    if (settings["ImageParameter"]["BarcodeFormatIds"]) {
      settings["RegionDefinition"]["BarcodeFormatIds"] = settings["ImageParameter"]["BarcodeFormatIds"];
    }
    
    const settingsAsString = JSON.stringify(settings);
    return settingsAsString;
  }

  onFrameRead(frameResult:FrameResult) {
    console.log("on frame read in scanner page");
    console.log(frameResult);
    if (frameResult.results.length>0) {
      this.isActive = false;
      this.torchOn = false;
      this.router.navigate(['/home'],{
        state: {
          barcodeResults:frameResult.results
        }
      });
    }else{
      console.log(frameResult.frameRotation);
      console.log(this.rotation);
      console.log(frameResult.frameRotation === 90);
      if (frameResult.frameRotation != this.rotation) {
        this.rotation = frameResult.frameRotation;
        if (frameResult.frameRotation === 90) {
          console.log("switch height and width");
          scanRegionForRuntimeSettings.top = predefinedRegion.left;
          scanRegionForRuntimeSettings.bottom = predefinedRegion.right;
          scanRegionForRuntimeSettings.left = predefinedRegion.top;
          scanRegionForRuntimeSettings.right = predefinedRegion.bottom;
        }else{
          console.log("no need switching height and width");
          scanRegionForRuntimeSettings.left = predefinedRegion.left;
          scanRegionForRuntimeSettings.right = predefinedRegion.right;
          scanRegionForRuntimeSettings.top = predefinedRegion.top;
          scanRegionForRuntimeSettings.bottom = predefinedRegion.bottom;
        }
        this.updateRuntimeSettings();
      }
    }
  }

  close(){
    this.isActive = false;
    this.torchOn = false;
    this.router.navigate(['/home'],{
      state: {
        barcodeResults:[]
      }
    });
  }

  toggleTorch(){
    this.torchOn = !this.torchOn;
  }

  zoomIn(){
    this.zoomFactor = 2.5;
  }

  zoomOut(){
    this.zoomFactor = 1.0;
  }
}
