<%@page import="java.util.*"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<style>
div{
	font-size : 1.5rem;
	color : gray;
}
</style>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<%
		List<Integer> list = new ArrayList<>();
		for (int i = 1; i<=10; i++){
			list.add(i);
		}
		
		//서버에서 클라이언트로 데이터 전송했다 치고,
		request.setAttribute("datalist", list);
	%>
	<c:forEach items="${datalist}" var="obj" varStatus="i">
		<div>${i.index+1} : ${obj}</div>
	</c:forEach>
	
	
</body>
</html>