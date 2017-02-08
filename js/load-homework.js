var homeworkLoader=function(){
    var homeworkElement;//will be initialised to the jquery element in which a table will form
    var homeworkJSONFile="";
    var setup=function(hwe,file){
	homeworkElement=hwe;
	homeworkJSONFile=file;
    };
    var loadHomework=function(startDate){
	$.getJSON(homeworkJSONFile,function (hws) {
	    $.each(hws,function (i,item){
		
		var trElem = $("<tr>").append($("<td>").text(week2Date(startDate,i)),
					      $("<td>").text(item.topic),
					      $("<td>").text(item.ass));
		
		homeworkElement.append(trElem);
		
	    } )
	});
    };
    return {setup:setup,
	    loadHomework:loadHomework};

};


