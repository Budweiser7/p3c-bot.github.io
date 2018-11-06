if(localStorage.getItem('masternode')){
    $(".dashboard-link").attr("href", "/interact.html?masternode=" + localStorage.getItem('masternode'))
}

// var opts = {
//     clockFace: 'DailyCounter',
//     countdown: true,
//     language: 'Custom'
// };
// var countdown = 1475924400 - ((new Date().getTime())/1000); // from: 10/08/2016 12:00 pm +0100
// countdown = Math.max(1, countdown);
// $('.your-clock').FlipClock(countdown, opts);
// FlipClock.Lang.Custom = { days:'Dagar', hours:'Tim', minutes:'Min', seconds:'Sek' };
// var opts = {
//     clockFace: 'DailyCounter',
//     // countdown: true,
// };
var startDate = new Date('2018-07-01 19:02:42 -0400'); //What date to start counting from
var now = Math.floor(Date.now()/1000); //Current timestamp in seconds
var clockStart = now - startDate.getTime()/1000; //What to set the clock at when page loads

// var clock2 = $('.your-clock').FlipClock(opts).setTime(clockStart); //Start clock

	var clock = $('.your-clock').FlipClock(clockStart, {
		clockFace: 'DailyCounter',
	});
