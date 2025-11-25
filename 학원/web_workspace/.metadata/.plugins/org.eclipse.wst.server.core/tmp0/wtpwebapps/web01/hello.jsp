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
	String str = "안녕하세요 JSP";
	class A{
		public String hello(){
			return "안녕하세용 jsp!!!";
		}
	}
	
	A a= new A();
%>
	<h1><%=a.hello() %></h1>
	<h2><%=str %></h2>
</body>
</html>