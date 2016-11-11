var homeworkJSONFile="Spring2016_CommutativeAlgebra-homework.json";
var homeworkElement;//will be initialised to the jquery element in which a table will form
function loadHomework(startDate) {
	
	$.getJSON(homeworkJSONFile,function (hws) {
		$.each(hws,function (i,item){
			
			var trElem = $("<tr>").append($("<td>").text(week2Date(startDate,i)),
				$("<td>").text(item.topic),
				$("<td>").text(item.ass));
			
			homeworkElement.append(trElem);
				
		} )
	});
}

function week2Date(startDate,i) {
	var date1= new Date(startDate);
	date1.setDate(date1.getDate()+i*7);
	var date2=new Date(startDate);
	date2.setDate(date2.getDate()+i*7+6);
	return date2String(date1,"/")+ " -- " + date2String(date2,"/");

}


