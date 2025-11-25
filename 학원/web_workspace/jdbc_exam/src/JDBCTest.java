import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class JDBCTest {

	public static void main(String[] args) {
		
		String url = "jdbc:mariadb://localhost:3306/ux_db";
		String userName="root";
		String passwd = "1234";
		
		//select 도구
		Connection conn = null;
		//Statement 보다 몇배 빠르다
		PreparedStatement pstmt = null;
		
		ResultSet resultSet = null;
		 
		
		
		try {
			//자바 리플렉션 기능
			//자바 클래스를 Type 선언이 아닌 클래스 이름으로 객체를 로딩
			//build 할 때 호출 되는 것이 아니라 runtime 에서 호출 된다.
			//예전에는 필수로 했어야 되지만, JDBC4.0 부터는 자동 로드 된다.
			Class.forName("org.mariadb.jdbc.Driver");
			
			conn = DriverManager.getConnection(url, userName, passwd);
			
			if(conn == null) {
				throw new Exception("커넥션 연결 실패!!");
			}
			
			//클래스 타입 선언
			StringBuilder sb = new StringBuilder();
			
			sb.append("select * from book_store");
			
			//문서에 sql 등록
			pstmt= conn.prepareStatement(sb.toString());
			
			//문서 실행 후 결과 받기
			resultSet = pstmt.executeQuery();
			
			//결과가 있다면 출력
			while (resultSet.next()) {
				StringBuilder doc = new StringBuilder();
				
				//get Int, getString.. 컬럼의 데이터 타입을 기준으로 get+타입(테이블 컬럼이름)
				doc.append("아이디:"+resultSet.getInt("book_id"));
				doc.append("\t책이름:"+resultSet.getString("book_name"));
				doc.append("\t분류:"+resultSet.getString("genre"));
				doc.append("\t저자:"+resultSet.getString("author"));
				doc.append("\t가격:"+resultSet.getInt("price"));
				
				System.out.println(doc.toString());
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			
		}finally {
			try {
				//사용한 IO 들 모두 닫기
				if(resultSet !=null)resultSet.close();
			
				if(pstmt !=null)pstmt.close();
				
				if(conn !=null)conn.close();
			}catch (Exception e) {
				System.out.println("클로즈 에러");
			}
		}
		

	}

}
