package test02.file;



import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import test02.data.Infor;

public class BankFile {

	public final String FILE_NAME = "customerAccount.txt";
	
	
	
	
	

	//문자타입의 Infor클래스가 예외오류가 나다면 던져라.
	public Map<String, Infor> getAllInfor() throws Exception{

		//파일유무검사
		if(!isEmpty()) {
			//Exception는 예외오류를 직접 만들어서 출력값 입력. 
			throw new Exception("파일 없음.");
		}
		//중복체크를 하기위해 Infor class를 Map으로 만듬
		Map<String, Infor> inforMap = new HashMap<String, Infor>();

		
		//파일읽기
		//r 로 변수선언, 버퍼드 br 변수선언
		try(FileReader r = new FileReader(FILE_NAME);
				//버퍼드를 사용해 한 줄 씩 빠르게 읽기
				BufferedReader br = new BufferedReader(r);){

			//라인을 읽을 변수선언
			String inforStr ="";

			//라인에 읽을게 있을 때 까지 반복
			while ((inforStr = br.readLine()) != null) {
				//inforStr에 담길 문자를 콤마로 구분 하여 str배열에 담음
				String[] str = inforStr.split(",");
				
				//저장할 객체 변수 선언
				//앞이 클래스 뒤가 객체선언문
				Infor inf = new Infor();

				inf.setBankBook(str[0]);
				//FILE_NAME에 적힌 문자를 long타입으로 변환하여 배열str[1]에 저장
				inf.setBankCash(Long.parseLong(str[1]));
				//Map으로 str[0]에 있는 키에 inf 값을 넣는다.
				inforMap.put(str[0], inf);
			}
			System.out.println("계좌 정보를 출력하였습니다.");
		}catch (Exception e) {
			//예외가 발생했을 때, 예외의 상세 정보를 콘솔에 출력해주는 메서드
			e.printStackTrace();
			// e.getMessage() 가 null과 같다면 ture일때 e.getMessage()출력 flase일때 "파일 읽기 오류" 출력
			System.out.println(e.getMessage() == null ? "파일 읽기 오류" : e.getMessage());
		}
		//inforMap으로 돌아감
		return inforMap;
	}
	
	
	
	
	//파일쓰기
	public void writeInfor(Map<String, Infor>inforMap) throws Exception { 
		//작성한 텍스트를 FILE_NAME에 덮어쓰기 기본값이 덮어쓰기이기 때문
		try(FileWriter r = new FileWriter(FILE_NAME);
				//버퍼드를 사용해 쓰기
				BufferedWriter bw = new BufferedWriter(r);){
			
			//키 목록
			//**Map(맵)**의 모든 키(key)만 따로 꺼내서 Set(집합)으로 저장하는 코드
			Set<String> keys = inforMap.keySet();
			//향상된 포문/keys의 값을 key에 집어넣기
			for(String key:keys) {
				Infor inf = inforMap.get(key);
				bw.write(inf.getBankBook()+", ");
				bw.write(inf.getBankCash()+"\n");
			}
			
			System.out.println("계좌정보를 갱신하였습니다.");
		//예외 받기	
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println(e.getMessage() == null ? "파일쓰기오류":e.getMessage());
		}
	}
	
	
	
	
	
	
	//isEmpty()로 예외처리를 
	public boolean isEmpty() throws Exception{
		//exists() - 파일이 실제 존재하는지의 여부만 확인
		return new File(FILE_NAME).exists();
	}
}