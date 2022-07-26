import { Component, OnInit } from '@angular/core';
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
  left: number = 0;
  top: number = 0;
  right: number = 0;
  bottom: number = 0;
  width: number = 0;
  height: number = 0;

  constructor(private router: Router) {
    console.log("constructor");
    if (this.router.getCurrentNavigation().extras.state) {
      const routeState = this.router.getCurrentNavigation().extras.state;
      if (routeState) {
        this.qrcodeonly = routeState.qrcodeonly;
      }
    }
    if (this.qrcodeonly === true) {
      this.runtimeSettings = "{\"ImageParameter\":{\"BarcodeFormatIds\":[\"BF_QR_CODE\"],\"Description\":\"\",\"Name\":\"Settings\"},\"Version\":\"3.0\"}";
    }else{
      this.runtimeSettings = "{\"ImageParameter\":{\"BarcodeFormatIds\":[\"BF_ALL\"],\"Description\":\"\",\"Name\":\"Settings\"},\"Version\":\"3.0\"}";
    }
    this.isActive = true;
    this.torchOn = false;
   }

  ngOnInit() {

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
      this.width = frameResult.frameWidth;
      this.height = frameResult.frameHeight;
      this.left = frameResult.frameWidth * 0.15;
      this.top = frameResult.frameHeight * 0.20;
      this.right = frameResult.frameWidth * 0.85;
      this.bottom = frameResult.frameHeight * 0.6;
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
