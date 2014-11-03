$(function(){
    showQuestions(1);
})

function showQuestions(questionnaireNo){
    
	if ($("#q" + questionnaireNo).parent().hasClass("disabled")) {
		$("#questionnaire").empty();
		return false;
	}
	
	$("#questionnaireNo").val(questionnaireNo);
	
	$.ajax({   
        type: "get",  
        dataType: "json",  
        url: 'questionAndAnswer',
        data: "questionnaireNo=" + questionnaireNo,           
        success: function(data) {
        	//fill out answers in questionnaire relatively
        	var answerString = "";
        	switch (questionnaireNo){
        		case 1 :
        			answerString = data.questionnaire1Answers;
        			break;
        		case 2 :
        			answerString = data.questionnaire2Answers;
        			break;
        		case 3 :
        			answerString = data.questionnaire3Answers;
        			break;
        		case 4 :
        			answerString = data.questionnaire4Answers;
        			break;
        		case 5 :
        			answerString = data.questionnaire5Answers;
        			break;
        	}
        	//判断哪些选项卡不可用
        	var answerStatus = data.answerStatus;
    		var answerStatusStr =  answerStatus.toString();
    		var latestQuestionnaireNo = answerStatusStr.substring(0,1);
    		var saveOrSubmit = answerStatusStr.substring(1,2);
    		var currentQuestionnaireNo = questionnaireNo;
    		var radioStatus = 1;  //1:avalibale 0:unavliable 默认提交状态，radio不可用
    		
    		if (currentQuestionnaireNo == latestQuestionnaireNo && saveOrSubmit == 0){
    			//之后选项卡不可用
    			if (currentQuestionnaireNo != 5){
    				var nextQuestionnaireNo = currentQuestionnaireNo+1;
    				for (var i=nextQuestionnaireNo;i<6;i++){
    					if ($("#q" + i).parent().hasClass("active")){
    						$("#q" + i).parent().removeClass("active").addClass("disabled");
    					}else{
    						$("#q" + i).parent().addClass("disabled");
    					}
    				}
    			}
    		}else if(currentQuestionnaireNo < latestQuestionnaireNo && saveOrSubmit == 0){
    			radioStatus = 0;
    			//大于latestQuestionnaireNo之后的选项卡不可用
    			if (latestQuestionnaireNo != 5){
    				var nextQuestionnaireNo = latestQuestionnaireNo+1;
    				for (var i=nextQuestionnaireNo;i<6;i++){
    					if ($("#q" + i).parent().hasClass("active")){
    						$("#q" + i).parent().removeClass("active").addClass("disabled");
    					}else{
    						$("#q" + i).parent().addClass("disabled");
    					}
    				}
    			}
    		}else if (currentQuestionnaireNo == 1){
    			//之后第二个开始不可用
    			for (var i=3;i<6;i++){
    				if ($("#q" + i).parent().hasClass("active")){
						$("#q" + i).parent().removeClass("active").addClass("disabled");
					}else{
						$("#q" + i).parent().addClass("disabled");
					}
				}
    		}
    		//else if (((currentQuestionnaireNo == latestQuestionnaireNo) $$ (saveOrSubmit == 1)) || ((currentQuestionnaireNo < latestQuestionnaireNo) $$ (saveOrSubmit == 1))){
    		//	radioStatus = 1;//当前页面不可用
        	
        	//fill out questionnaire
        	Handlebars.registerHelper("fromOne",function(index){
        		return index+1;
        	});
        	Handlebars.registerHelper("fromZero",function(index){
        		return index;
        	});
            var handle = Handlebars.compile($("#question-template").html());
        	var html = handle(data);
        	$("#questionnaire").empty();
        	$("#questionnaire").append(html);
        	
        	$("#questionnaire").find(".radio-inline").each(function(){
        		var test = $(this).text();
                if (test.trim() == ""){
                	$(this).remove();
                }
        	});
        	
        	//fill out answers in questionnaire relatively
        	if (answerString != "" && answerString != null){
        		var answer = answerString.split(";");
            	for (var i = 0;i < answer.length;i++){
            		   var $_radios=$(".J_group_radio").eq(i).find("input");
            		   $_radios.each(function(){
            			    if (radioStatus == 1){
            			    	$(this).attr("disabled","disabled");
            			    }
            			    if($(this).val()===answer[i]){
        	    			    $(this).attr("checked","checked");
            			    }
            		   });
            	}
        	}
        }  
    });  		
}

function submitForm(saveOrSubmit){
	var questionnaireNo = $("#questionnaireNo").val();
	
	var answerStatus = questionnaireNo + saveOrSubmit;
	$("#answerStatus").val(answerStatus);
	$("#answerForm").submit();
}
