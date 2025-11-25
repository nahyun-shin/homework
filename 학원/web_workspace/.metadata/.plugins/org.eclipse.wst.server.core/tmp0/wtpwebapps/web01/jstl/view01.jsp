<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
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
	%>
	<%
		for (int i = 1; i<10; i++){
		
	%>
	<div><%=list.get(i) %></div>
	<%
	} %>
</body>
</html>