import { today, Today } from "user-activity";

export class DailyActivityManager {

  today : Today = today;
  updateIntervalSeconds : number;
  updateInterval : NodeJS.Timer;

  constructor(updateIntervalSeconds? : number) {
    this.today = today;
    if (updateIntervalSeconds !== undefined)
      this.updateIntervalSeconds = updateIntervalSeconds;
    else
      this.updateIntervalSeconds = 1;
  }

  start() : void {
    if (this.updateInterval === undefined) {
      this.updateInterval = setInterval(function() {
        //this.today = today;
        //console.log(this.today);
      }, 1000);
    }
  }

  stop() : void {
    if (this.updateInterval !== undefined) {
      clearInterval(this.updateInterval);
    }
  }
}