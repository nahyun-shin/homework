package kr.account.store;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import kr.account.data.Account;

public class AccountStore {

	private final String FILE_NAME = "customerAccount.txt";
	
	/**
	 * 파일로 부터 데이터 읽어오기
	 * @return
	 * @throws Exception
	 */
	public Map<String, Account> getAllAccount() throws Exception{
		
		//파일이 있는지 우선 검사 없으면 예외 
		if( !isExists()) {
			throw new Exception("파일 없음");
		}
		
		//계좌번호가 중복되면 안되니까 key, value 형식으로 맵사용 
		Map<String, Account> accountMap = new  HashMap<>();
		
		//파일읽기 
		try(FileReader r = new FileReader(FILE_NAME);
				BufferedReader br = new BufferedReader(r);) {
			
			String accountStr = "";
			//읽는 라인이 없기 전까지 읽어오기 
			while((accountStr = br.readLine()) != null) {
				//콤마로 분리하기 
				String[] str = accountStr.split(",");
				//저장할 객체 선언 
				Account ac = new Account();
				//쪼갠 데이터 알맞게 넣기 
				ac.setAccountNumber(str[0]);
				ac.setBalance(Long.parseLong(str[1]));
				
				//맵에 등록 
				accountMap.put(str[0], ac);
			}
			
			System.out.println("계좌정보를 출력하였습니다.");
			
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println(e.getMessage() == null ? "파일 읽기 오류" : e.getMessage());
		}
		
		return accountMap;
		
	}
	
	
	public void writeAccount(Map<String, Account> accountMap) throws Exception {
		
		
		//덮어쓰기라서 넘어오는 객체에 있는 모든것을 쓰면 끝 
		try(FileWriter r = new FileWriter(FILE_NAME);
				BufferedWriter bw = new BufferedWriter(r);) {
				
			 //키 목록
			Set<String> keys = accountMap.keySet();
			
			//향상된 포문
			for(String key : keys) {
				Account ac = accountMap.get(key);
				 bw.write(ac.getAccountNumber()+",");
				 bw.write(ac.getBalance()+"\n");
			}
			
			System.out.println("계좌정보를 갱신하였습니다.");
			
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println(e.getMessage() == null ? "파일 쓰기 오류" : e.getMessage());
		}
	}
	
	
	
	
	public boolean isExists() throws Exception {
		return new File(FILE_NAME).exists();
	}
}
