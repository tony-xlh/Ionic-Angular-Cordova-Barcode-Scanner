import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner as DBR, FrameResult } from '@awesome-cordova-plugins/dynamsoft-barcode-scanner';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  continuous: boolean;
  qrcodeonly: boolean;

  constructor(private router: Router) {
    console.log(this.router);
    if (this.router.getCurrentNavigation().extras.state) {
      const routeState = this.router.getCurrentNavigation().extras.state;
      if (routeState) {
        this.continuous = routeState.continuous;
        this.qrcodeonly = routeState.qrcodeonly;
      }
    }
   }

  ngOnInit() {
    console.log("continuous scan: "+this.continuous);
    console.log("qrcodeonly: "+this.qrcodeonly);

    //this.goBack();
  }

  goBack(){
    console.log(this.router);
    this.router.navigate(['/home'],{
      state: {
        barcodeResults:["asda"]
      }
    });
  }

  onFrameRead(frameResult:FrameResult) {
    console.log(arguments);
    console.log(frameResult);
  }

}
