// decouple this function
function week2Date(startDate,i) {
    //Given startDate and an integer i
    //return a string indicating the range of dates of the i-th week since startDate.
    //Example format 2017/02/08 -- 2017/02/14
    var date1= new Date(startDate);
    date1.setDate(date1.getDate()+i*7);
    var date2=new Date(startDate);
    date2.setDate(date2.getDate()+i*7+6);
    return date2String(date1,"/")+ " -- " + date2String(date2,"/");

}
