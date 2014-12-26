//输入框内容提示
function funPlaceholder(element) {
    //检测是否需要模拟placeholder
    var placeholder = '';
    if (element && !("placeholder" in document.createElement("input")) && (placeholder = element.getAttribute("placeholder"))) {
    //当前文本控件是否有id, 没有则创建
    var idLabel = element.id ;
    if (!idLabel) {
    idLabel = "placeholder_" + new Date().getTime();
    element.id = idLabel;
    }

    //创建label元素
    var eleLabel = document.createElement("label");
    eleLabel.htmlFor = idLabel;
    eleLabel.className = "hint " + idLabel + "-hint" ;
    //插入创建的label元素节点
    element.parentNode.insertBefore(eleLabel, element);
    //事件
    element.onfocus = function() {
    eleLabel.innerHTML = "";
    };
    element.onblur = function() {
    if (this.value === "") {
    eleLabel.innerHTML = placeholder;
    }
    };

    //样式初始化
    if (element.value === "") {
    eleLabel.innerHTML = placeholder;
    }
    }
    };

var j_username = document.getElementById("j_username");
var j_password = document.getElementById("j_password");
var forgotPasswordForm_realName = document.getElementById("forgotPasswordForm_realName");
var forgotPasswordForm_cellphone = document.getElementById("forgotPasswordForm_cellphone");
var forgotPasswordForm_password = document.getElementById("forgotPasswordForm_password");

funPlaceholder(j_username);
funPlaceholder(j_password);
funPlaceholder(forgotPasswordForm_realName);
funPlaceholder(forgotPasswordForm_cellphone);
funPlaceholder(forgotPasswordForm_password);
