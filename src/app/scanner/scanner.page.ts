import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FrameResult } from '@awesome-cordova-plugins/dynamsoft-barcode-scanner';

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
  }

  onFrameRead(frameResult:FrameResult) {
    console.log(arguments);
    console.log(frameResult);
    if (frameResult.results.length>0) {
      if (this.continuous === false) {
        this.router.navigate(['/home'],{
          state: {
            barcodeResults:frameResult.results
          }
        });
      }
    }
  }

}
