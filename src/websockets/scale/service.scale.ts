
import { Injectable } from '@nestjs/common';

@Injectable()
export class ScaleService {
  private isDeviceConnected = false;

  setIsDeviceConnected(connected: boolean) {
    this.isDeviceConnected = connected;
  }

  getIsDeviceConnected() {
    return this.isDeviceConnected;
  }
}
