<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
<style>
.container {
	display: flex;
	flex-direction: column;
	height: 90vh;
	margin-top: 10vh;
	align-items: center;
}

.write-form {
	width: 600px;
	margin-top: 20px;
}

#contents {
	resize: none;
	width: 500px;
	height: 200px;
	border-radius: 7px;
}

.table th {
	text-align: right;
}

.table td {
	vertical-align: middle;
}

.file-list {
	display: flex;
	flex-direction: column;
	list-style-type: none;
	margin: 0;
	padding: 0;
	align-items: flex-start;
}

.file-list a {
	text-decoration: none;
	color: black;
}

.file-list a:hover {
	color: #167edb;
	font-weight: 600;
}

.file-list  a:visited {
	color: black;
}
</style>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<%@ include file="../header/header.jsp"%>
	<main class="container">
		<header class="text-center">
			<h2>계좌 정보 수정</h2>
		</header>
		<section class="write-form">
			<form id="frm" action="/bank/update.do" method="POST" enctype="multipart/form-data">
				<input type="hidden" id="currentPage" name="currentPage"
					value="${currentPage}"> <input type="hidden" id="accNum"
					name="accNum" value="${vo.accNum}">
				<table class="table">
					<colgroup>
						<col style="width: 15%" />
						<col style="width: 35%" />
						<col style="width: 15%" />
						<col style="width: 35%" />
					</colgroup>
					<tbody>
						<tr>
							<th><label class="form-label pt-2">계좌번호</label></th>
							<td colspan="3">${vo.accNum}</td>
						</tr>
						<tr>
							<th><label class="form-label pt-2">잔액</label></th>
							<td><input type="text" id="balance" name="balance"
								class="form-control" value="${vo.balance}"></td>
						</tr>
						<tr>
							<th><label class="form-label pt-2">사용여부</label></th>
							<td><select name="useYN" id="useYN">
									<option value="Y" ${vo.useYN == 'Y' ? 'selected' : ''}>Y</option>
									<option value="N" ${vo.useYN == 'N' ? 'selected' : ''}>N</option>
							</select></td>
						</tr>


					</tbody>
				</table>
			</form>
		</section>
		<section class="text-center">
			<button type="button" class="btn btn-primary me-2"
				onclick="updateBoard();">계좌 수정</button>
			<button type="button" class="btn btn-secondary" onclick="goList();">취소</button>
		</section>
	</main>

</body>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>


  const goList = () =>{
	  const currentPage = $('#currentPage').val();
	  location.href ="/bank/list.do?currentPage=" + currentPage;
  }
  
  function valiadted() {
		 
		 const balance = document.querySelector('#balance');
		 const useYN = document.querySelector('#useYN');
		 
		 if(balance.value.trim().length === 0) {
			 alert('금액을 입력하세요.');
			 balance.focus();
			 return false;
		 }
		 
		 
		 
		 return true;
	 }
  
  
  
  
  const updateBoard = () =>{
	  //유효성 통과 후  form 전송 
	  if(valiadted() ){
		  $('#frm').submit();
	  }
  }
  
	  
	  
	  
  
  

</script>
</html>