<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/static/common/common.jsp" %>
<%@ include file="../header/header.jsp" %>
<meta charset="UTF-8">
<title>Insert title here</title>
<style>
   .container{
     display: flex;
     flex-direction: column;
     height : 90vh;
     margin-top :  10vh;
     align-items: center;
   }
   
   .write-form{
      width:600px;
      margin-top :20px;
      
   }
   
   #contents {
      resize: none;
      width:500px;
      height:200px;
      border-radius: 7px;
   }
   
   .table th {
     text-align: right;
   }
   
   .table td {
     vertical-align: middle;
   }
   
   .file-list {
      display : flex;
      flex-direction : column;
      list-style-type: none;
      margin : 0;
      padding: 0;
      align-items: flex-start;
   }

.file-list a {
  text-decoration: none;
  color : black;
}

.file-list a:hover{
  color : #167edb;
  font-weight: 600;
}

.file-list a:visited {
	color : black;
}

</style>
</head>
<body>
  <main class="container">
     <header class="text-center">
        <h2>유저 정보</h2>
     </header>
     <section class="write-form">
        <form id="frm">
            <input type="hidden" id="currentPage" name="currentPage" value="${currentPage}">
            <input type="hidden" id="userId" name="userId" value="${vo.userId}">
	     	<table class="table">
	     	   <colgroup>
	     	     <col style="width:25%"/>
	     	     <col style="width:25%"/>
	     	     <col style="width:25%"/>
	     	     <col style="width:25%"/>
	     	   </colgroup>
	     	   <tbody>
	     	   		<tr>
	     	   		   <th>
						 <label class="form-label pt-2">ID</label>
	                   </th>
	     	   		   <td colspan="3">
	     	   		     ${vo.userId}
	     	   		    </td>
	     	   		</tr>
	     	   		<tr>
	     	   		   <th>
						 <label class="form-label pt-2">이름</label>
	                   </th>
	     	   		   <td colspan="3">
	     	   		     ${vo.userName}
	     	   		    </td>
	     	   		</tr>
	     	   		<tr>
	     	   		   <th>
						 <label class="form-label pt-2">생년월일</label>
	                   </th>
	     	   		   <td>
	     	   		     ${vo.birth}
	     	   		    </td>
	     	   		</tr>
	     	   		
	     	   		<tr>
	     	   		   <th>
						 <label class="form-label pt-2">전화번호</label>
	                   </th>
	     	   		    <td colspan="3">
	     	   		       ${vo.phone}
	     	   		    </td>
	     	   		</tr>
	     	   </tbody>
	     	</table>
     	</form>
     </section>
     <section class="text-center">
     	<button type="button" class="btn btn-primary me-2" onclick="writeBoard();">정보 수정</button>
     	
     	<button type="button" class="btn btn-secondary" onclick="goList();">목록</button>
     </section>
  </main>
</body>
<script>

  const goList = () =>{
	  const currentPage = $('#currentPage').val();
	  location.href ="/user/userList.do?currentPage=" + currentPage;
  }
  
  
  
  
  const writeBoard = () =>{
	  location.href = '/board/write/view.do?brdId=' + $('#brdId').val();
  }
  const deleteBoard = () =>{
	  
	  const isConfirm = confirm('삭제하시면 수정을 취소해도 삭제됩니다.\n진행하시겠습니까?');
	  
	  location.href = '/board/write/delete.do?brdId=' + $('#brdId').val();
  }

</script>
</html>











