import document from "document";
import clock, { TickEvent } from "clock";
import { preferences } from "user-settings";
import { me as appbit } from "appbit";
import { HeartRateSensor } from "heart-rate";
import { today, goals } from "user-activity";
import { me as device } from "device";
import { battery } from "power";
import SETTINGS from './settings';
import { GetProgressBarWidth, formatTimeString } from './utils';

const STAT_RECT_MAX_WIDTH : number = device.screen.width - SETTINGS.RIGHT_PADDING;

const dateLabel : Element = document.getElementById('date-label');
const dayLabel : Element = document.getElementById('day-label');
const timeLabel : Element = document.getElementById('time-label');
const heartRateLabel : Element = document.getElementById('heart-rate-label');
const batteryIndicator : ImageElement = document.getElementById('battery-indicator') as ImageElement;
const heartRateRect : RectElement = document.getElementById('heart-rate-rect') as RectElement;
const zoneMinsLabel : Element = document.getElementById('zone-mins-label');
const zoneMinsRect : RectElement = document.getElementById('zone-mins-rect') as RectElement;
const stepsLabel : Element = document.getElementById('steps-label');
const stepsRect : RectElement = document.getElementById('steps-rect') as RectElement;
const floorsLabel : Element = document.getElementById('floors-label');
const floorsRect : RectElement = document.getElementById('floors-rect') as RectElement;
const calsLabel : Element = document.getElementById('cals-label');
const calsRect : RectElement = document.getElementById('cals-rect') as RectElement;


/**
 * Clock
 */
/**
 * 
 * @param evt 
 */
const handleTick = (evt : TickEvent) => {

  timeLabel.text = formatTimeString(evt.date, preferences.clockDisplay);
  
  let dateStr : string = evt.date.toLocaleString('en-US', {weekday: 'short', day: 'numeric',year: 'numeric',month: 'long'}).slice(0, -19).toUpperCase();
  dayLabel.text = dateStr.substring(0, 3);
  dateLabel.text = dateStr.slice(4, 10);
};

clock.granularity = "minutes"; // seconds, minutes, hours
clock.ontick = handleTick;

/**
 * Battery
 */
/**
 * 
 * @param chargeLevel 
 */
const UpdateBatteryIndicator = (chargeLevel : number) => {
  if (chargeLevel >= 75) 
    batteryIndicator.href = "icons/battery-4.png";
  else if (chargeLevel >= 50) 
    batteryIndicator.href = "icons/battery-3.png";
  else if (chargeLevel >= 25) 
    batteryIndicator.href = "icons/battery-2.png";
  else if (chargeLevel >= 5) 
    batteryIndicator.href = "icons/battery-1.png";
  else
    batteryIndicator.href = "icons/battery-0.png";
};

UpdateBatteryIndicator(battery.chargeLevel);
battery.onchange = (evt : Event) => {
  UpdateBatteryIndicator(battery.chargeLevel);
}



/**
 * Heart Rate
 */
if (appbit.permissions.granted("access_heart_rate")) {
  if (HeartRateSensor) {
    const hrm = new HeartRateSensor({ frequency: 1 });
    hrm.onreading = () => {
      heartRateLabel.text = `${hrm.heartRate}`;
      heartRateRect.width = GetProgressBarWidth(hrm.heartRate, 220, STAT_RECT_MAX_WIDTH);
    }
    hrm.start();
  }
}


/**
 * Daily Activity
 */
/**
 * 
 */
const UpdateDailyActivity = () => {
  
  stepsLabel.text = `${today.adjusted.steps}`;
  stepsRect.width = GetProgressBarWidth(today.adjusted.steps, goals.steps, STAT_RECT_MAX_WIDTH);
  
  if (today.local.elevationGain !== undefined) {
    floorsLabel.text = `${today.adjusted.elevationGain}`;
    floorsRect.width = GetProgressBarWidth(today.adjusted.elevationGain, goals.elevationGain, STAT_RECT_MAX_WIDTH);
  }
  
  calsLabel.text = `${today.adjusted.calories}`;
  calsRect.width = GetProgressBarWidth(today.adjusted.calories, goals.calories, STAT_RECT_MAX_WIDTH);

  zoneMinsLabel.text = `${today.adjusted.activeZoneMinutes.total}`;
  zoneMinsRect.width = GetProgressBarWidth(today.adjusted.activeZoneMinutes.total, goals.activeZoneMinutes.total, STAT_RECT_MAX_WIDTH);
}

if (appbit.permissions.granted("access_activity")) {
  UpdateDailyActivity();
  setInterval(function() {
    UpdateDailyActivity();
  }, 1000);
}



