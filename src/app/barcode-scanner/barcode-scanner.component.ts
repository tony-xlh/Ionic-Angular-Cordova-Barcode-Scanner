import { Component, EventEmitter, Input, OnInit, SimpleChanges } from '@angular/core';
import { BarcodeScanner as DBR, FrameResult } from '@awesome-cordova-plugins/dynamsoft-barcode-scanner/';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss'],
  outputs: ['onFrameRead']
})
export class BarcodeScannerComponent implements OnInit {
  @Input() isActive: boolean;
  @Input() torchOn?:boolean;
  @Input() runtimeSettings?:string;
  onFrameRead = new EventEmitter<FrameResult>();
  license?:string
  constructor() {
   }

  async ngOnInit() {
    if (!this.license) {
      this.license = "DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ==";
    }
    let result = await DBR.init(this.license);
  }

  ngOnDestroy() {
    DBR.destroy();
  }

  ngOnChanges(changes: SimpleChanges){
    console.log(changes.isActive);
    if (changes.isActive) {
      if (changes.isActive.currentValue === "true") {
        DBR.startScanning({dceLicense:this.license}).subscribe((result:FrameResult) => {
          console.log(result);
          if (this.onFrameRead) {
            this.onFrameRead.emit(result);
          }
        });
      }else{
        DBR.stopScanning();
      }
    }
    if (changes.torchOn) {
      if (changes.torchOn.currentValue === "true") {
        DBR.switchTorch("on");
      }else{
        DBR.switchTorch("off");
      }
    }
    if (changes.runtimeSettings) {
      DBR.initRuntimeSettingsWithString(changes.runtimeSettings.currentValue);
    }
  }
}
