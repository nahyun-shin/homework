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
			//클라이언트로부터 넘어온 데이터를 가져와야한다.
			String userId=request.getParameter("userId");
			String passwd=request.getParameter("passwd");
			
			if(userId.equals("admin") && passwd.equals("1234")){
				// rquest 를 이용한 페이지 이동
				// 이전 데이터를 모두 보존하여 이동
				RequestDispatcher disp = request.getRequestDispatcher("/result.jsp");
				disp.forward(request, response);
				
			}else{
				//단순 페이지 이동, 데이터 보존 X
				//데이터 보내고 싶을 때에는 get방식을 이용
				response.sendRedirect("/form.jsp?error=loginError");
			}
	%>
</body>
</html>