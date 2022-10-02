/*
 * @Author: joe.iannone 
 * @Date: 2022-10-01 21:17:01 
 * @Last Modified by:   joe.iannone 
 * @Last Modified time: 2022-10-01 21:17:01 
 */

/**
 * 
 * @param statValue 
 * @param maxValue 
 * @param maxWidth 
 * @returns 
 */
const GetProgressBarWidth = (statValue : number, maxValue : number, maxWidth : number) => {
  let percentage : number = statValue / maxValue;
  return (statValue >= maxValue) ? maxWidth : (percentage * maxWidth);
}


/**
 * 
 * @param date 
 * @param clockDisplay 
 * @returns 
 */
const formatTimeString = (date : Date, clockDisplay : string) => {

  let hours : number = date.getHours();
  let minutes : number = date.getMinutes();
  let hourStr : string = String(hours);
  let minStr : string = minutes < 10 ? `0${String(minutes)}` : String(minutes);

  if (clockDisplay === '12h') {
    hours = hours % 12;
    hours = hours ? hours : 12;
    hourStr = String(hours);
  } else {
    hourStr = hours < 10 ? `0${String(hours)}` : String(hours);
  }
  
  return `${hourStr}:${minStr}`;
};


/**
 * 
 */
export { 
  GetProgressBarWidth,
  formatTimeString
};