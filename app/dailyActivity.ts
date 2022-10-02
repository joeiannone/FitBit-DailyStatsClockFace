/*
 * @Author: joe.iannone 
 * @Date: 2022-10-01 21:16:24 
 * @Last Modified by:   joe.iannone 
 * @Last Modified time: 2022-10-01 21:16:24 
 */

import { today, Today } from "user-activity";

/**
 * A class to manage update interval and callback for fitbit daily activity data (today : Today)
 */
class DailyActivityManager {

  updateIntervalSeconds : number;
  updateInterval : NodeJS.Timer;
  onupdate? : Function;

  constructor(updateIntervalSeconds? : number) {

    this.onupdate = null;

    if (updateIntervalSeconds !== undefined)
      this.updateIntervalSeconds = updateIntervalSeconds;
    else
      this.updateIntervalSeconds = 1;

  }

  start() : void {

    if (this.updateInterval === undefined) {

      var that = this;
      var _today : Today = today;
      
      this.updateInterval = setInterval(function() {
        if (that.onupdate) {
          that.onupdate(today);
          _today = today;
        } 
      }, this.updateIntervalSeconds * 1000);
    }

    if (this.onupdate) this.onupdate(today);
  }

  stop() : void {
    if (this.updateInterval !== undefined) {
      clearInterval(this.updateInterval);
    }
  }

  restart() : void {
    this.stop();
    this.start();
  }

}


export { 
  DailyActivityManager 
};