/**
 * Created by Bright Huang on 10/26/14.
 */

(function($) {

    "use strict";

    var projectApplication = {};
    projectApplication.Model = {};
    projectApplication.View = {};
    
        var showError = function($obj, txt) {
                var $td = $obj.parent();
                $td.find("#errorDiv").removeAttr("style").text(txt);    
                $("#applicationSubmit").attr("disabled","true");
            };

    function validateForm(formName){
        var validator = $(formName).validate({
            rules: {
                "answers[0]": "required",
                "answers[1]": "required",
                "answers[2]": "required",
                "answers[3]": "required",
                "answers[4]": "required",
                "answers[5]": "required",
                "answers[6]": "required",
                "answers[7]": "required",
                "answers[8]": "required",
                "answers[9]": "required",
                "applicant.realName": "required",
                "applicant.jobTitle": "required",
                "applicant.company": "required",
                "applicant.provinceSelect": "required",
                "applicant.citySelect": "required",
                "applicant.districtSelect": "required",
                "applicant.companyAddress": "required",
                "applicant.mailbox": {
                    email:true
                },
                "applicant.deskPhone": {
                    isTel: true
                },
                "applicant.cellphone": {
                    required: true,
                    isCellphone: true
                },
                "sms.smsValidationCode":{
                    digits: true,
                    rangelength:[4,4]
                },
                password: {
                    required: true,
                    minlength: 6
                }
            },
            messages: {
                "answers[0]": "必填",
                "answers[1]": "必填",
                "answers[2]": "必填",
                "answers[3]": "必填",
                "answers[4]": "必填",
                "answers[5]": "必填",
                "answers[6]": "必填",
                "answers[7]": "必填",
                "answers[8]": "必填",
                "answers[9]": "必填",
                "applicant.realName": "必填",
                "applicant.jobTitle": "必填",
                "applicant.provinceSelect": "必填",
                "applicant.citySelect": "必填",
                "applicant.districtSelect": "必填",
                "applicant.jobAddress": "必填",
                "applicant.company": "必填",
                "applicant.companyAddress": "必填",
                "applicant.mailbox": "请输入正确格式的电子邮件",
                "applicant.deskPhone": {
                    isTel: "请输入正确格式的电话号码 如:010-12345678"
                },
                "applicant.cellphone": {
                    required: "必填",
                    isCellphone: "请正确填写您的手机号码",
                    remote: "姓名或手机号码不存在"
                },
                "sms.smsValidationCode":{
                    digits: "只能输入整数",
                    rangelength: $.validator.format("请输入一个长度为{0}的整数验证码")
                },
                "applicant.password": {
                    required: "请输入密码",
                    minlength: $.validator.format("密码不能小于{0}个字 符")
                }

            },
            success: function(label, element) {
            },
            errorPlacement:function(error,element) {
                if ( element.is(":radio") ) {
                    error.appendTo(element.parent().parent());

                }else if ( element.is(":checkbox") ) {
                    error.appendTo(element.next());

                }else if (element.attr("name") == "cellphone") {
                    error.appendTo(element.next().next());
                } else{
                    error.insertAfter(element);
                }

            },
            submitHandler:function(form){
                form.submit();
            }
        });
        return validator;
    }

    function addCities(){
        var provinceIndex = $("#provinceSelect").val();
        var options = {
            url: 'getCities',
            type: 'POST',
            data: {'provinceIndex': provinceIndex},
            success: function(data){
                projectApplication.Controller.addCitySelections(data);
            },
            fail: function(data){
            }
        }
        projectApplication.Controller.ajaxRequest(options);
    }

    function addProvinces(){
        var options = {
            url: 'getProvinces',
            type: 'POST',
            success: function(data){
                projectApplication.Controller.addProvinceSelections(data);
            },
            fail: function(error){
            }
        }
        projectApplication.Controller.ajaxRequest(options);
    }

    function addDistricts(){
        var cityIndex= $('#citySelect').val();
        var options = {
            url: 'getDistricts',
            type: 'POST',
            data: {'cityIndex': cityIndex},
            success: function(data){
                projectApplication.Controller.addDistrictSelections(data);
            },
            fail: function(data){

            }
        }
        projectApplication.Controller.ajaxRequest(options);
    }

    function init(){
        $.validator.addMethod("isTel", function(value, element) {
            var tel = /^\d{3,4}-?\d{7,9}$/; //电话号码格式010-12345678
            return this.optional(element) || (tel.test(value));
        }, "请正确填写您的电话号码");


        $.validator.addMethod("isCellphone", function(value, element) {
            var length = value.length;
            var mobile = /^(((13[0-9]{1})|(15[0-9]{1})||(18[0-9]{1}))+\d{8})$/;
            return this.optional(element) || (length == 11 && mobile.test(value));
        }, "请正确填写您的手机号码");
    }

    projectApplication.Controller = {
        ajaxRequest : function(options) {
            return $.ajax({
                cache: false,
                data: options.data,
                dataType: options.dataType,
                type: options.type,
                url: options.url
            }).success(function (data, status, xhr) {
                options.success(data);
            }).fail(function (xhr, status, error) {
                options.fail(error);
            }).always(function (xhr, status, error) {

            });
        },
              
        addProvinceSelections: function(provinces) {
            var provinceSelect = $('#provinceSelect');
            $('#provinceSelect option').remove();
            $('#citySelect option').remove();
            $('#districtSelect option').remove();

            for (var i in provinces){
                var optionValue = provinces[i].provinceIndex;
                var optionText = provinces[i].provinceName;
                var option = "<option value=" + optionValue + ">" + optionText + "</option>";
                provinceSelect.append(option);
            }
            addCities();
        },
        addCitySelections: function(cities) {
            var citySelect = $('#citySelect');
            $('#citySelect option').remove();
            $('#districtSelect option').remove();

            for (var i in cities){
                var optionValue = cities[i].cityIndex;
                var optionText = cities[i].cityName;
                var option = "<option value=" + optionValue + ">" + optionText + "</option>";
                citySelect.append(option);
            }
            addDistricts();
        },

         addDistrictSelections: function(districts) {
            var districtSelect = $('#districtSelect');
            $('#districtSelect option').remove();

            for (var i in districts){
                var optionValue = districts[i].districtIndex
                var optionText = districts[i].districtName;
                var option = "<option value=" + optionValue + ">" + optionText + "</option>";
                districtSelect.append(option);
            }
         },
        timeRemained:0,
       updateTimeLabel:function(duration) {
                 if(projectApplication.Controller.timeRemained>0)return;;
                 projectApplication.Controller.timeRemained = duration;
                var timer = setInterval(function() {
                    $("#action-send-code").val( projectApplication.Controller.timeRemained + '秒后重新发送');
                     projectApplication.Controller.timeRemained -= 1;
                    if ( projectApplication.Controller.timeRemained == -1) {
                        clearInterval(timer);
                        $("#action-send-code").val('重新发送').removeAttr('disabled').removeClass("gray");
                    }
                }, 1000);
        },
        addEventListener: function(){
            $("#provinceSelect").change(function(event){
                addCities();
            });

            $("#citySelect").change(function(event){
                $('#districtSelect option').remove();
                addDistricts();
            });

            $("#applicationSubmit").click(function(event){
                if ((validateForm("#applicationForm").form() == true) && $("#applicationSubmit").attr("disabled") != "disabled"){
                    $("#myModalTrigger").click();
                }
            });

            $("#confirmedSubmit").click(function(event){
                $("#applicationForm").submit();
            });


            $("#validationCode").keyup(function(){
               if($("#validationCode").val().length<4)return;
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
				    }
				     if(data==1)
				    {
				    	    showError($("#validationCode"), '验证码过期，请重新获取验证码');	    	    
				    }
				    if(data==2)
				       $("#applicationSubmit").removeAttr("disabled");
				}
		 };

	projectApplication.Controller.ajaxRequest(options);   
                if (validateForm("#applicationForm").element($("#validationCode")) == true && $("#validationCode").val() != ""){
                    $("#applicationSubmit").removeAttr("disabled");
                    $("#applicationSubmit").removeClass().addClass("btn btn-success");
                } else {
                    $("#applicationSubmit").attr({disabled: "disabled"});
                    $("#applicationSubmit").removeClass().addClass("btn btn-default");
                }

            });


            $("#action-send-code").click(function(event){
               if (validateForm("#applicationForm").form() == true){
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
                              projectApplication.Controller.updateTimeLabel(60);                          
                         } else {
                            $( this).val('重新发送').removeAttr('disabled').removeClass("gray");
                        }
                        
                        },
                        fail: function(data){
                         $(this).val('重新发送').removeAttr('disabled').removeClass("gray");
                        }
                    }
                    projectApplication.Controller.ajaxRequest(options);
                }
            });
        }
    };

    $(function() {
        init();
        addProvinces();
        projectApplication.Controller.addEventListener();

    });
    
    //myapplication page questionnaire validation
    $("#save").click(function(){
    	submitForm(0);
    })
    $("#submit").click(function(){
    	submitForm(1);
    })
    
    //myapplication page submit or save
    function submitForm(saveOrSubmit){
    	if (validateForm("#answerForm").form() == true){
    		var questionnaireNo = $("#questionnaireNo").val();
    		var answerStatus = questionnaireNo + saveOrSubmit;
    		$("#answerStatus").val(answerStatus);
    		
    		if (saveOrSubmit == 1){
    			$("#myModalTrigger").click();
    		}else{
    			$("#answerForm").ajaxSubmit(function(message) {
    	    	    if (message.result == true){
    	    	    	$("#return").click();
    	    	    	
    	    	    	//保存成功重新加载questionnaire and answer
    	    	    	showQuestions(questionnaireNo);
    	    	    }else{
    	    	    	alert("保存失败！");
    	    	    }
    	    	});
    		}
    	}
    }
    
    $("#dialogSubmit").click(function(event){
    	$("#answerForm").ajaxSubmit(function(message) {
    	    if (message.result == true){
    	    	$("#return").click();
    	    	
    	    	//更新成功重新加载questionnaire and answer
    	    	var questionnaireNo = $("#questionnaireNo").val();
    	    	showQuestions(questionnaireNo);
    	    }else{
    	    	alert("更新失败！");
    	    }
    	});
    	return false;
    });


    //Sannong.ProjectApplication = projectApplication;
    return projectApplication;
})(jQuery);
