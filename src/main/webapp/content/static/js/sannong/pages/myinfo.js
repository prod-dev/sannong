/**
 * Created by Bright Huang on 11/1/14.
 */

require(['../main'], function () {
    require(['jquery', 'bootstrap', 'sannong', 'validate', 'ajaxHandler', 'jqueryForm', 'formValidator', 'region', 'additionalMethods'],
        function($, bootstrap, sannong, validate, ajaxHandler, jqueryForm, formValidator, region, additionalMethods) {

            "use strict";

            var myInfo = {};	
            myInfo.Model = {};
            myInfo.View = {};
               var showError = function($obj, txt) {
                var $td = $obj.parent();
                $td.find("#errorDiv").removeAttr("style").text(txt);    
            };
            function disableSubmitButton(){
	      		 if($("#register-btn").attr("disabled")==undefined){		
			    $("#register-btn").attr({disabled: "disabled"});
		            $("#register-btn").removeClass().addClass("btn btn-default");
			}

		}

            myInfo.Controller = {
            	    timeRemained:0,
       updateTimeLabel:function(duration) {
                 if(myInfo.Controller.timeRemained>0)return;;
                 myInfo.Controller.timeRemained = duration;
                var timer = setInterval(function() {
                    $("#action-send-code").val( myInfo.Controller.timeRemained + '秒后重新发送');
                     myInfo.Controller.timeRemained -= 1;
                    if ( myInfo.Controller.timeRemained == -1) {
                        clearInterval(timer);
                        $("#action-send-code").val('重新发送').removeAttr('disabled').removeClass("gray");
                    }
                }, 1000);
        },
		
                addEventListener: function(){

                    var userInfoForm = "userInfoForm";
                    var myInfoForm = "myInfoForm";
                    
                    $("#changeMobile").click(function(event){
                    	if($("#demo").css("height")!="0px")
                    	{
                    	    $("#cellphone").val("");
	                    	$("#register-btn").removeAttr("disabled");
						    $("#register-btn").removeClass().addClass("btn btn-success");
                    	                    	
                    	}                    	
                    });

                    $("#provinceSelect").change(function(event){
                        region.Controller.addCities();
                    });

                    $("#citySelect").change(function(event){
                        $('#districtSelect option').remove();
                        region.Controller.addDistricts();
                    });

                    $("#register-btn").click(function(event){
                        if (formValidator.getValidator("#myInfoForm").form() == true){
                            $("#myInfoForm").submit();
                        }
                    });

                    $("#register-btn").click(function(event){
                        if (formValidator.getValidator("#myInfoForm").form() == true){
                            $("#userInfoForm").submit();
                        }
                    });

                    $("#confirmedSubmit").click(function(event){
                        $("#myInfoForm").submit();
                    });

                   $("#validationCode").keyup(function(){
		 if($("#validationCode").val().length<4){  disableSubmitButton();	return;}
            	 var options ={
				type: "get",
				async: false,
				url: 'validateSMSCode',
				data: {
				    "validationcode": $("#validationCode").val()
				},
				success: function(data) {
				 $("#errorDiv").css("display","none");
				    if(data==0)
				    {
				    	    showError($("#validationCode"), '验证码错误');
					    disableSubmitButton();	    	    
				    }
				     if(data==1)
				    {
				    	    showError($("#validationCode"), '验证码过期，请重新获取验证码');
					     disableSubmitButton();
					    	    	    
				    }
				    if(data==2)
				    {				
					    $("#register-btn").removeAttr("disabled");
					    $("#register-btn").removeClass().addClass("btn btn-success");
				     }
				}
		 };

		ajaxHandler.sendRequest(options); 
                

            });

            	   $("#cellphone").keyup(function(){
		if($("#cellphone").val().length>0)
		{
		    disableSubmitButton();
		}
		if($("#cellphone").val().length<11)return;
		if (formValidator.getValidator("#myInfoForm").form() == true)
		{
 			$("#action-send-code").removeAttr("disabled");
				
		}
	  });

                    $("#action-send-code").click(function(event){
                        if (formValidator.getValidator("#myInfoForm").form() == true){
                            var options = {
		                url: 'regcode',
		                type: 'GET',
		                data: {
		                    mobile: $("#cellphone").val(),
		                    smstype: $(this).attr("data-type")
		                },
		                success: function(data){
		                $("#validationCode").removeAttr("disabled"); 
		                 if (data == true) {                          
		                      myInfo.Controller.updateTimeLabel(60);                          
		                 } else {
		                    $( this).val('重新发送').removeAttr('disabled').removeClass("gray");
		                }
		                
		                },
		                fail: function(data){
		                 $(this).val('重新发送').removeAttr('disabled').removeClass("gray");
		                }
		            }
                            ajaxHandler.sendRequest(options);
                        }
                    });

                    $("#userInfoSubmit").click(function(event){
                        if (formValidator.getValidator("#userInfoForm").form() == true){
                            $("#userInfoForm").ajaxSubmit(function(message) {
                                $("#return").after('<label id="jobTitle-error" class="error" for="jobTitle">已保存</label>');
                                return false;
                            });
                        }
                    });
                }
            };
     


            $(function() {
                region.Controller.saveRegion();
                region.Controller.addProvinces();
                myInfo.Controller.addEventListener();

            });

            sannong.MyInfo = myInfo;
            return myInfo;
        });
});
