<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<%@ include file="/static/common/common.jsp" %>
<style>

.container{
    display : flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10vh;
    height:70vh;
    
 }

  .contents{
  	 width: 80%;
  }

.data-list{
    width : 100%;
    height : 500px;
    margin-top: 30px;
    overflow: auto;
}

</style>
</head>
<body>
	 <%@ include file="../header/header.jsp" %>
	 <main class="container">
     <section class="contents">
        <header class="text-center">
             <h2>계좌 보기</h2>
        </header>
        
        <section class="data-list">
           <input type="hidden" id="currentPage" name="currentPage" value="${currentPage}">
           <table class='table'>
              <colgroup>
              	<col style="width:35%"/>
              	<col style="width:15%"/>
                <col style="width:15%"/>
              	<col style="width:15%"/>
              	<col style="width:15%"/>
              	<col style="width:10%"/>
              	
              </colgroup>
              <thead class="table-dark text-center">
                <tr>
                  <th>계좌번호</th>
                  <th>소유자</th>
                  <th>잔액</th>
                  <th>생성일자</th>
                  <th>수정일자</th>
                  <th>사용여부</th>
                  
                </tr>
              </thead>
              <tbody id="boardBody">
              </tbody>
           </table>
        </section>
        <section class="page">
	        <nav aria-label="Page navigation example">
			  <ul class="pagination justify-content-center"  id="page">
			     
			  </ul>
			</nav>
        </section>
     </section>
   </main>
</body>
<script>
   function movePage(pageNum) {
	   //페이지 번호 업데이트 
	   $('#currentPage').val(pageNum);
	   getBoardData();
   }
   
   //서버에 데이터 요청 
   function getBankData(){
	   //비동기로 서버에 데이터 요청
	   $.ajax(
			  {
				  
		 		url : '/bank/list/data.do',  //요청 경로 
		 		type : 'get',        //전송 방식
		 		dataType : 'json',   //돌려받을 데이터 타입,
		 		data : {
		 			currentPage : $('#currentPage').val()
		 		}
 	   		}
	   ).done(function(res){
		   
		   drawTable(res);
		   
	   }).fail(function(xhr, status, error){
		  alert(error); 
	   });
   }
   
   
   function  drawTable(data) {
	   
	   const tbody = $('#boardBody');
	   
	   //비워
	   tbody.empty();
	   
	   //테이블 만들기 
	   $.each(data.dataList, function(index, obj){
		  const tr = $('<tr></tr>'); 
		  const link = $('<a></a>');
		  link.attr('href', 'javascript:void(0);');
		  //jquery에서 객체에 이벤트 바인딩 하는 방법 
		  link.on('click', ()=> goDteail(obj.accNum) );
		  
		  
		  tr.append(makeTD('', link.append(obj.accNum)) );
		  tr.append(makeTD('', obj.accName));
		  tr.append(makeTD('', obj.balance));
		  tr.append(makeTD('', obj.createDate));
		  tr.append(makeTD('', obj.updateDate));
		  tr.append(makeTD('', obj.useYN));
		  
		  tbody.append(tr);
	   });
	   
	   const page = $('#page');
	   page.empty();
	   page.append(data.pageHTML);
   }
   
   

   
   
   
   //시작함수
   $(document).ready(function() {
	
	   getBankData();
	   
   });
   
   
   
   const goDteail = (accNum) =>{
	   const currentPage = $('#currentPage').val();
	   location.href = '/bank/detail.do?accNum=' + accNum +"&currentPage=" + currentPage;
   }

</script>
</html>