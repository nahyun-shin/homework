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
		String userId = request.getParameter("userId");
	
	
	%>
	<main>
	<p>${param.userId } 님 환영합니다.</p>
	<button type="button" onclick="logOut()">로그아웃</button>
	</main>
</body>
<script>
	function logOut(){
		location.href ='/form2.jsp';
	}
</script>
</html>