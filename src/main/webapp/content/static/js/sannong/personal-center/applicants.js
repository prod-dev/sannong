$(function() {
	show(1);
})

function edit(userName){
	location.href = "userinfo?userName=" + userName;
}

function changeContent() {
	var searchKey = $("#searchKey").text();
	var dropDown1 = $("#dropdown1").text();

	$("#dropdown1").text(searchKey);
	$("#searchKey").html(dropDown1 + '<span class="caret">');
}

function cancel() {
	$("#questionnaireTable").hide();
	$("#applicantsTable").show();
	$("#searchBar").show();
}

function update() {
	$("#answerForm").submit();
}

$("#retrieve").click(function() {
	var searchKey = $("#searchKey").text().trim();
	var searchValue = $("#searchValue").val();

	var parameter;
	if (searchKey == "手机号") {
		parameter = "cellphone=" + searchValue;
	} else if (searchKey == "姓名") {
		parameter = "realName=" + searchValue;
	}

	$.ajax({
		type : "get",
		dataType : "text",
		url : "userTotalCount",
		data : parameter,
		success : function(totalCount) {
			// pageination and data list presentation
			pageinationHandle(totalCount, parameter);
		}
	});
})

function showQuestionnaireAnswers(questionnaireNo, cellphone) {
	$("#questionnaireNo").val(questionnaireNo);
    $("#answerStatus").val(questionnaireNo + '1');
	
	var userCellphone = cellphone;
	if (userCellphone != "") {
		$("#cellphone").val(userCellphone);
	} else {
		userCellphone = $("#cellphone").val();
	}
	$.ajax({
		type : "get",
		dataType : "json",
		url : 'questionAndAnswer',
		data : "questionnaireNo=" + questionnaireNo + "&cellphone="
				+ userCellphone,
		success : function(data) {
			var answerStatus = data.answerStatus;
			var answerStatusStr = answerStatus.toString();
			var latestQuestionnaireNo = answerStatusStr.substring(0, 1);
			var saveOrSubmit = answerStatusStr.substring(1, 2);
			// about when admin can update user's questionnaire
			if ((questionnaireNo > latestQuestionnaireNo)
					|| (questionnaireNo = latestQuestionnaireNo
							&& saveOrSubmit == 0)) {
				$("#update").attr("disabled", "disabled");
			}else{
				$("#update").attr("disabled", false);
			}

			if (data.applicant != null) {
				$("#userName").val(data.applicant.userName);
				$("#userRealName").text(data.applicant.realName);
				$("#userTextShow").show();
			}
			Handlebars.registerHelper("fromOne", function(index) {
				return index + 1;
			});
			Handlebars.registerHelper("fromZero", function(index) {
				return index;
			});
			var handle = Handlebars.compile($("#question-template").html());
			var html = handle(data);

			if ($("#questionnaireTable").is(":hidden")) {
				$("#questionnaireTable").show();
			} else {
				$("#applicantsTable").hide();
				$("#questionList").empty();
			}
			$("#applicantsTable").hide();
			$("#searchBar").hide();
			$("#questionList").empty();
			$("#questionList").append(html);

			$("#questionnaireTable").find(".radio-inline").each(function() {
				var redioValue = $(this).text();
				if (redioValue.trim() == "") {
					$(this).remove();
				}
			});

			// fill out answers in questionnaire relatively
			var answerString = data.questionnaire1Answers;

			if (answerString != "") {
				var answer = answerString.split(";");
				for ( var i = 0; i < answer.length; i++) {
					var $_radios = $(".J_group_radio").eq(i).find("input");
					$_radios.each(function() {
						if ($(this).val() === answer[i]) {
							$(this).attr("checked", "checked");
						}
					});
				}
			}
		}
	});
}

function show(currentPageIndex) {
	var parameter = "pageIndex=" + currentPageIndex;
	$("#userTextShow").hide();

	$.ajax({
		type : "get",
		dataType : "text",
		url : "userTotalCount",
		success : function(totalCount, parameter) {
			// pageination presentation
			pageinationHandle(totalCount);
		}
	});
}
function pageinationHandle(totalCount, parameter) {
	var pageIndex = 0; // 页面索引初始值
	var pageSize = 10; // 每页显示条数初始化，修改显示条数，修改这里即可

	InitTable(0, parameter); // Load事件，初始化表格数据，页面索引为0（第一页）

	// 分页，PageCount是总条目数，这是必选参数，其它参数都是可选
	$("#pagination").pagination(totalCount, {
		callback : PageCallback,
		prev_text : '上一页', // 上一页按钮里text
		next_text : '下一页', // 下一页按钮里text
		items_per_page : pageSize, // 显示条数
		num_display_entries : 6, // 连续分页主体部分分页条目数
		current_page : pageIndex, // 当前页索引
		num_edge_entries : 2
	// 两侧首尾分页条目数
	});

	// 翻页调用
	function PageCallback(index, jq) {
		InitTable(index);
	}
	// 请求数据
	function InitTable(pageIndex, parameter) {
		$.ajax({
			type : "get",
			dataType : "json",
			url : 'showApplicants', // 提交到一般处理程序请求数据
			data : "pageIndex=" + (pageIndex + 1) + "&" + parameter,
			success : function(data) {
				var handleHelper = Handlebars.registerHelper("addOne",
						function(index) {
							return index + 1;
						});
				var handle = Handlebars.compile($("#table-template").html());
				var html = handle(data);
				$("#userList").empty();
				$("#userList").append(html);
			}
		});
	}
}