<%--
  Created by IntelliJ IDEA.
  User: apple
  Date: 11/22/14
  Time: 21:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Benefitting Agriculture - User Management List Page</title>
</head>

<body>

    <h3>
        <span>用户管理</span>
        <a href="#" class="orange-bt-small float-right" data-toggle="modal" data-target="#exportModal">导出问卷调查结果</a>
    </h3>

    <div id="exportModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">确定导出问卷调查结果?</h4>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <a href="javascript:void(0)" class="btn btn-success" id="exportCSV">确定</a>
                </div>
            </div>
        </div>
    </div>

    <form>
        <div id="searchBar" class="searchRow">
            <div class="left">
                <label>查询条件</label>
                <div class="width-71">
                    <select>
                        <option>姓名</option>
                        <option>手机号</option>
                        <option>工作单位</option>
                        <option>职位</option>
                        <option>电子邮箱</option>
                        <option>单位地址</option>
                    </select>
                </div>
                <div class="width-137">
                    <input type="text"/>
                </div>
            </div>
            <div class="right">
                <label>地址</label>
                <div class="width-152"><input type="text"/></div>
                <div class="width-47"><input type="text"/></div>
                <div class="width-65"><input type="text"/></div>
                <a href="" class="glyphicon glyphicon-search"></a>
            </div>
        </div>

        <ul class="umListGrid">
            <li class="head">
                <div class="col-small">姓名</div>
                <div class="col-small">注册日期</div>
                <div class="col-small">手机号码</div>
                <div class="col-large">工作单位</div>
                <div class="col-small">职位</div>
                <div class="col-medium">电子邮箱</div>
                <div class="col-small"></div>
            </li>
            <li>
                <div id="userList"></div>
            </li>
        </ul>
        <ul id="pagination" class="customPagination">
        </ul>
    </form>

    <script id="table-template" type="text/x-handlebars-template">
        {{#each this}}
            <li>
                <div class="col-small">{{realName}}</div>
                <div class="col-small">{{createTime}}</div>
                <div class="col-small" id="cell{{addOne @index}}">{{cellphone}}</div>
                <div class="col-large">{{company}}</div>
                <div class="col-small">{{jobTitle}}</div>
                <div class="col-medium">{{mailbox}}</div>
                <div class="col-small">
                  <span class="bts">
                    <a href="javascript:void(0);" class="edit" onclick="Sannong.UserManagement.edit('{{userName}}')">Edit</a>
                    <a href="javascript:void(0);" class="help" onclick="Sannong.UserManagement.showQuestionnaireAnswers(1,'{{cellphone}}')">Help</a>
                  </span>
                </div>
           </li>
        {{/each}}
    </script>

</body>
</html>