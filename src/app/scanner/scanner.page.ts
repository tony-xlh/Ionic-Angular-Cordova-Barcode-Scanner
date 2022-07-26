import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FrameResult } from '@awesome-cordova-plugins/dynamsoft-barcode-scanner';

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

  constructor(private router: Router) {
    console.log("constructor");
    if (this.router.getCurrentNavigation().extras.state) {
      const routeState = this.router.getCurrentNavigation().extras.state;
      if (routeState) {
        this.qrcodeonly = routeState.qrcodeonly;
      }
    }
    if (this.qrcodeonly === true) {
      this.runtimeSettings = this.updateRuntimeSettingsWithScanRegion("{\"ImageParameter\":{\"BarcodeFormatIds\":[\"BF_QR_CODE\"],\"Description\":\"\",\"Name\":\"Settings\"},\"Version\":\"3.0\"}");
    }else{
      this.runtimeSettings = this.updateRuntimeSettingsWithScanRegion("{\"ImageParameter\":{\"BarcodeFormatIds\":[\"BF_ALL\"],\"Description\":\"\",\"Name\":\"Settings\"},\"Version\":\"3.0\"}");
    }
    this.isActive = true;
    this.torchOn = false;
   }

  ngOnInit() {
    this.width = 1081;
    this.height = 1920;
    this.left = this.width * 0.15;
    this.right = this.width * 0.85;
    this.top = this.height * 0.25;
    this.bottom = this.height * 0.6;
  }

  updateRuntimeSettingsWithScanRegion(template:string){
    const settings = JSON.parse(template);
    settings["ImageParameter"]["RegionDefinitionNameArray"] = ["Settings"];
    settings["RegionDefinition"] = {
                                    "Left": 15,
                                    "Right": 85,
                                    "Top": 25,
                                    "Bottom": 60,
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
      if (this.width != frameResult.frameWidth) {
        this.width = frameResult.frameWidth;
        this.height = frameResult.frameHeight;
        this.left = frameResult.frameWidth * 0.15;
        this.top = frameResult.frameHeight * 0.20;
        this.right = frameResult.frameWidth * 0.85;
        this.bottom = frameResult.frameHeight * 0.6;
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
}
