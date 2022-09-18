
const GetProgressBarWidth = (statValue : number, maxValue : number, maxWidth : number) => {
  let percentage : number = statValue / maxValue;
  return (statValue >= maxValue) ? maxWidth : (percentage * maxWidth);
}


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

export { 
  GetProgressBarWidth,
  formatTimeString
};