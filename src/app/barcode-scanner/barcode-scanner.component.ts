import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BarcodeScanner as DBR, FrameResult } from 'awesome-cordova-plugin-dynamsoft-barcode-scanner';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss'],
  outputs: ['onFrameRead']
})
export class BarcodeScannerComponent implements OnInit {
  @Input() runtimeSettings:string;
  private _zoomFactor:number;
  private _torchOn:boolean;
  private _isActive: boolean;

  @Input()
  set isActive(isActive: boolean) {
    this._isActive= isActive;
    if (isActive === true) {
      DBR.startScanning({dceLicense:this.dceLicense}).subscribe((result:FrameResult) => {
        if (this.onFrameRead) {
          this.onFrameRead.emit(result);
        }
      });
    }else{
      console.log("stop scanning");
      DBR.stopScanning();
    }
  }
  get isActive(): boolean{ return this._isActive; }

  @Input()
  set torchOn(torchOn: boolean) {
    this._torchOn= torchOn;
    if (torchOn === true) {
      DBR.switchTorch("on");
    }else{
      DBR.switchTorch("off");
    }
  }

  get torchOn(): boolean{ return this._torchOn; }

  @Input()
  set zoomFactor(factor: number) {
    if (factor) {
      this._zoomFactor= factor;
      DBR.setZoom(factor);
    }
  }

  get zoomFactor(): number{ return this._zoomFactor; }

  onFrameRead = new EventEmitter<FrameResult>();
  @Input() dbrLicense?:string
  @Input() dceLicense?:string
  constructor() {
  }

  async ngOnInit():Promise<void> {
    if (!this.dbrLicense) {
      this.dbrLicense = "DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ==";
    }else{
      console.log("use provided license");
    }
    if (!this.dceLicense) {
      this.dceLicense = "DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ==";
    }

    let result = await DBR.init(this.dbrLicense);
    if (this.runtimeSettings) {
      console.log("update runtime settings:"+this.runtimeSettings);
      DBR.initRuntimeSettingsWithString(this.runtimeSettings);
    }
  }

  async ngOnDestroy() {
    await DBR.stopScanning();
  }
}
