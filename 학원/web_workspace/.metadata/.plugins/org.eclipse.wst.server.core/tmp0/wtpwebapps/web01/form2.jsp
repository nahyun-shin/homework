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
	String error= request.getParameter("error");
	if(error != null && error.equals("loginError")){
		out.print("<html><script>alert('로그인 정보를 확인하십시오.')</script></html>");
	}

%>
	<main>
	<!-- action : 전송할 위치, method : 전송 방식, submit 이벤트로 전송 -->
		<form action ="/process.jsp" method="post" id="myFrm">
		<div>
			<label for="userId">아이디 : </label>
			<input type="text" name="userId" id="userId" onkeydown="enterkey(event);">
		</div>
		<div>
			<label for="passwd">비밀번호 : </label>
			<input type="password" name="passwd" id="passwd" onkeydown="enterkey(event);">
		</div>
		<button type="button" onclick="goLogin()">로그인</button>
		</form>
	</main>
	
	<script>
		function validated(){
			const userId=document.querySelector('#userId');
			const passwd=document.querySelector('#passwd');
			if(userId.value.trim().length===0){
				alert('아이디를 입력하세요');
				return false;
			}
			if(passwd.value.trim().length===0){
				alert('비밀번호를 입력하세요');
				return false;
			}
			return true;
		}
		
		function goLogin(){
			if(validated()){
				const myFrm = document.querySelector('#myFrm');
				myFrm.submit();
			}
		}
		function enterkey(e){
			if(e.keyCode === 13){
				goLogin();
			}
		}
	</script>
</body>
</html>