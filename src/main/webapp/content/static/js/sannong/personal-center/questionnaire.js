$(function(){
    showQuestions(1);
})

function showQuestions(questionnaireNo){
	$("#buttonGroup").show();
	$("#save").removeAttr("disabled");
	$("#submit").removeAttr("disabled");
	
	if ($("#q" + questionnaireNo).parent().hasClass("disabled")) {
		$("#questionnaire").empty();
		$("#buttonGroup").hide();
		return false;
	}
	
	$("#questionnaireNo").val(questionnaireNo);
	var questionnaireNo = parseInt(questionnaireNo);
	
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
    		var latestQuestionnaireNo = parseInt(answerStatusStr.substring(0,1));
    		var saveOrSubmit = answerStatusStr.substring(1,2);
    		var currentQuestionnaireNo = questionnaireNo;
    		var radioStatus = 1;  //1:submit 0:save 默认提交状态，radio不可用
    		
    		if (currentQuestionnaireNo == latestQuestionnaireNo && saveOrSubmit == 0){
    			radioStatus = 0;
    			
    			//当前选项卡中的button enabled
    			$("#save").attr("disabled",false);
    			$("#submit").attr("disabled",false);
    			
    			//之后选项卡不可用
    			if (currentQuestionnaireNo != 5){
    				var nextQuestionnaireNo = currentQuestionnaireNo + 1;
    				for (var i=nextQuestionnaireNo;i<6;i++){
    					if ($("#q" + i).parent().hasClass("active")){
    						$("#q" + i).parent().removeClass("active").addClass("disabled");
    					}else{
    						$("#q" + i).parent().addClass("disabled");
    					}
    				}
    			}
    		}else if(currentQuestionnaireNo < latestQuestionnaireNo && saveOrSubmit == 0){
    			radioStatus = 1;
    			
    			//当前选项卡中的button disabled
    			$("#save").attr("disabled","disabled");
    			$("#submit").attr("disabled","disabled");
    			
    			//大于latestQuestionnaireNo之后的选项卡不可用
    			if (latestQuestionnaireNo != 5){
    				var nextQuestionnaireNo = latestQuestionnaireNo + 1;
    				for (var i=nextQuestionnaireNo;i<6;i++){
    					if ($("#q" + i).parent().hasClass("active")){
    						$("#q" + i).parent().removeClass("active").addClass("disabled");
    					}else{
    						$("#q" + i).parent().addClass("disabled");
    					}
    				}
    			}
    		}else if (currentQuestionnaireNo == latestQuestionnaireNo && saveOrSubmit == 1){
    			radioStatus = 1;
    			
    			//当前选项卡中的button disabled
    			$("#save").attr("disabled","disabled");
    			$("#submit").attr("disabled","disabled");
    			
    			//下一个选项卡可用
    			if ($("#q" + (currentQuestionnaireNo + 1).toString()).parent().hasClass("disabled")){
					$("#q" + (currentQuestionnaireNo + 1).toString()).parent().removeClass("disabled");
				}
    			
    			//之后第二个开始不可用
    			if (latestQuestionnaireNo < 4){
    				var nextQuestionnaireNo = parseInt(latestQuestionnaireNo) + 2;
    				for (var i=nextQuestionnaireNo;i<6;i++){
    					if ($("#q" + i).parent().hasClass("active")){
    						$("#q" + i).parent().removeClass("active").addClass("disabled");
    					}else{
    						$("#q" + i).parent().addClass("disabled");
    					}
    				}
    			}
    		}else if(currentQuestionnaireNo < latestQuestionnaireNo && saveOrSubmit == 1){
    			radioStatus = 1;
    			
    			//当前选项卡中的button disabled
    			$("#save").attr("disabled","disabled");
    			$("#submit").attr("disabled","disabled");
    			
    			//大于latestQuestionnaireNo(之后+1)的选项卡不可用
    			if (latestQuestionnaireNo != 5){
    				var nextQuestionnaireNo = latestQuestionnaireNo + 2;
    				if (nextQuestionnaireNo <= 6){
    					for (var i=nextQuestionnaireNo;i<6;i++){
    						if ($("#q" + i).parent().hasClass("active")){
    							$("#q" + i).parent().removeClass("active").addClass("disabled");
    						}else{
    							$("#q" + i).parent().addClass("disabled");
    						}
    					}
    				}
    			}
    		}
        	
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