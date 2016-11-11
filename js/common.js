//getting rid of jquery mobile. Stick to jquery.
var minDepth = 0;//minDepth should be 0 for my current host online. 2 for UMN host
//if (window.location.protocol === "file:") 
//minDepth = 6; //home
//minDepth=5;//campus
var depth = (window.location.pathname.match(/\//g) || []).length - minDepth;
//console.log(depth);
//depth=0 then at root dir. change minDepth when changing to other server.
var dirPrefix = Array(depth + 1).join("../");
//to get to the `root' dir

//to test just set today to specific date. Remember to clear it before updating remote version 
var today = new Date();
//console.log(today);
var thisYear = today.getFullYear();
var holidayList = {
	newYear1: new HolidaySpan("new-year", new Date(thisYear, 0, 1), 0, 3),
	newYear2: new HolidaySpan("new-year", new Date(thisYear + 1, 0, 1), 3, 0),
	//ad hoc patch for chinese new year. 
	springfestival: new HolidaySpan("spring-festival", new Date(2017, 0, 28), 0, 6),
	valentine: new HolidaySpan("214", new Date(thisYear, 1, 14), 0, 1),
	apr1: new HolidaySpan("apr1", new Date(thisYear, 3, 1), 0, 1),
	halloween: new HolidaySpan("halloween", new Date(thisYear, 9, 31), 15, 1),
	thanksgiving: new HolidaySpan("thanksgiving", getDateNthDay(new Date(thisYear,10,1),4,4), 15, 4),
	xmas: new HolidaySpan("xmas", new Date(thisYear, 11, 25), 15, 4)
};

function HolidaySpan(name, date, fore, aft) {
	this.name = name;
	this.date = new Date(date);
	this.start = new Date(date);
	this.start.setDate(this.start.getDate() - fore);
	this.end = new Date(date);
	this.end.setDate(this.end.getDate() + aft);
	
}

function init() {
	setupTheme();
}

function setupTheme() {
	//setup the theme according to the date
	var src = dirPrefix + "css/style1.css";
	for (h in holidayList) {
		if (today >= holidayList[h].start && today < holidayList[h].end) {
			src = dirPrefix + "css/style-" + holidayList[h].name + ".css";
			break;
		}
	}
    var c = $("#custom-ss");
    c.attr("href",src);
}

function getDateNthDay(date, i, d) {
	// get date of i-th d-day of the month specified in date
	var date1 = new Date(date);
	date1.setDate(1); //first day of the month
	var dayDate1 = date1.getDay();
	//find i-th d-day
	var dd = d - dayDate1 + 1 + i * 7;
	if (dayDate1 <= d) {
		dd = dd - 7;
	}
	//compute the total number of days in the given month
	var lastDate = new Date(date1);
	lastDate.setMonth(lastDate.getMonth() + 1, 0);
	//test if dd is out of range
	if (dd < 1 || dd > lastDate.getDate()) {
		return null;
	} else {
		date1.setDate(dd)
		return date1;
	}
}

//stole some functions from friend...
function date2String(dd,z) {
    z = z|| ""; 
    return pad(dd.getFullYear(),4,'0') + z + pad((dd.getMonth()+1),2,'0') + z + pad(dd.getDate(),2,'0'); 
}

function pad(n, width, z) {
    //function copied from http://stackoverflow.com/a/10073788
    //pads a number to specified width with given character z.
    //number not trimmed if length larger than width.
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
