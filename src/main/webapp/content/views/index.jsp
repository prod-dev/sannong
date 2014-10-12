<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>This is the real Index page</title>
</head>
<body>
  <form action="search" method="POST" accept-charset="UTF-8">
    <table>
      <tr>
        <td>出发站</td>
        <td><input type="text" name="from"></td>
      </tr>
      <tr>
        <td>到达站</td>
        <td><input type="text" name="to"></td>
      </tr>
      <tr>
        <td>出发日期</td>
        <td><input type="text" name="startDate"></td>
      </tr>
      <tr>
        <td></td>
        <td><input type="submit" value="搜索"></td>
      </tr>
    </table>
  </form>
  <table>
    <c:forEach var="ticket" items="${tickets}">
      <tr>
        <td>${ticket.seatNo}</td>
        <td>${ticket.price}</td>
      </tr>
    </c:forEach>
  </table>
</body>
</html>