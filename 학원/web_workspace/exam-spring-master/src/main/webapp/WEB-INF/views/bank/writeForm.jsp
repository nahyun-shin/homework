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
			<h2>게시글 쓰기</h2>
		</header>
		<section class="write-form">
			<form id="frm">
				<input type="hidden" id="currentPage" name="currentPage"
					value="${currentPage}"> <input type="hidden" id="brdId"
					name="brdId" value="${vo.brdId}">
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
							<th><label class="form-label pt-2">개설일</label></th>
							<td colspan="3">${vo.create}</td>
						</tr>
						<tr>
							<th><label class="form-label pt-2">잔액</label></th>
							<td>${vo.balance}</td>
						</tr>
						<tr>
							<th><label class="form-label pt-2">마지막 수정일자</label></th>
							<td>${vo.update}</td>
						</tr>
						<tr>
							<th><label class="form-label pt-2">사용여부</label></th>
							<td>${vo.useYN}</td>
						</tr>


					</tbody>
				</table>
			</form>
		</section>
		<section class="text-center">
			<button type="button" class="btn btn-primary me-2"
				onclick="writeBoard();">글 수정</button>
			<button type="button" class="btn btn-secondary" onclick="goList();">취소</button>
		</section>
	</main>

</body>
</html>