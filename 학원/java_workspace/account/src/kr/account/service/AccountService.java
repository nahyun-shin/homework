package kr.account.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import kr.account.data.Account;
import kr.account.store.AccountStore;

public class AccountService {

	Scanner scan;
	AccountStore store;
	Map<String, Account> accountMap;
	
	
	public AccountService() {
		this.scan = new Scanner(System.in);
		this.store = new AccountStore();
		
	}
	
	public void start() {
		
		try {
			
			System.out.println("===================================================");
			System.out.println("|                                                  |");
			System.out.println("|                 계 좌 관 리 프로그램                 |");
			System.out.println("|                                                  |");
			System.out.println("===================================================");
			
			//데이터 초기화
			this.initData();
			
		    while(true) {
			    try {
			    	int menu = this.getMenu();
			    		
			    	switch(menu) {
			    	case 1:
			    		this.createAccount();
			    		break;
			    	case 2:
			    		this.deposit();
			    		break;
			    	case 3:
			    		this.withdraw();
			    		break;
			    	case 4:
			    		this.getBalance();
			    	break;
			    	case 5:
			    		this.cancelAccount();
			    		break;
			    	case 6:
			    		System.out.println("프로그램이 종료됩니다....");
			    		System.exit(0); // 프록르램 강제종료 
			    	   default :
			    	    System.out.println("메뉴입력이 잘못되었습니다. 확인해주세요.");
			    	}
			    		
			    }catch (Exception e) {
						scan.nextLine(); //키입력 초기화
						System.out.println(e.getMessage() == null ? "키입력 오류" : e.getMessage());
					}
			    }
			
		}catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void initData () throws Exception {
		this.accountMap = store.getAllAccount();
	}
	
	public int getMenu() throws Exception {
		int menu = 0;
		System.out.println("========================================================");
		System.out.println("     1.개설  2.입금   3.출금  4.잔액조회  5.해지  6.종료        ");
		System.out.println("========================================================");

		
		menu = scan.nextInt();
		scan.nextLine();
		
		return menu;
	}
	
	
	/**
	 * 계좌개설 
	 * @throws Exception
	 */
	public void createAccount() throws Exception {
		
		//개설번호 입력
		System.out.println("개설할 계좌번호를 입력 : ");
		 String accountNum = scan.next();
		 
		 //이미 존재하는지 확인
		 if(this.checkAccount(accountNum)!= null) {
			 System.out.println("해당 계좌는 이미 존재합니다.");
			 return;
		 }
		 
		 //입금할 금액 
		 System.out.println("입금 금액 : ");
		 long balance = scan.nextLong();
		 
		 //임금금액은 1원보단 커야함 
		 if(balance < 1) {
			 System.out.println("1원보다 작은 금액은 입금하실  수 없습니다.");
		 }else {
			 //입금처리 
			 Account ac = new Account();
			 ac.setAccountNumber(accountNum);
			 ac.setBalance(balance);
			 this.accountMap.put(accountNum, ac);
			 
			 store.writeAccount(accountMap);
			 System.out.println(accountNum + " 계좌 등록이 완료되었습니다..");
			 
		 }
	}
	
	public void deposit() throws Exception {
		//개설번호 입력
		System.out.println("입금할 계좌번호를 입력 : ");
		String accountNum = scan.next();
		
		//봔환이 null 이면 계좌가 없다!!
		Account ac = this.checkAccount(accountNum);
				 
		//이미 존재하는지 확인
		if(ac == null) {
			System.out.println("해당 계좌는 존재하지 않습니다.");
			return;
		}
		
		//입금할 금액 
		 System.out.println("입금 금액 : ");
		 long balance = scan.nextLong();
		 
		 //임금금액은 1원보단 커야함 
		 if(balance < 1) {
			 System.out.println("1원보다 작은 금액은 입금하실  수 없습니다.");
		 }else {
			 ac.setAccountNumber(accountNum);
			 long test = ac.getBalance() + balance;
			 ac.setBalance(test);
			 store.writeAccount(accountMap);
			 System.out.println(accountNum + " 계좌 입금 완료되었습니다..");
		 }
				 
	}
	
	
	public void withdraw() throws Exception {
		//개설번호 입력
		System.out.println("출금할 계좌번호를 입력 : ");
		String accountNum = scan.next();
		
		//봔환이 null 이면 계좌가 없다!!
		Account ac = this.checkAccount(accountNum);
				 
		//이미 존재하는지 확인
		if(ac == null) {
			System.out.println("해당 계좌는 존재하지 않습니다.");
			return;
		}
		
		//입금할 금액 
		 System.out.println("출금 금액 : ");
		 long withdraw = scan.nextLong();
		 
		 //임금금액은 1원보단 커야함 
		 if(withdraw < 100) {
			 System.out.println("출금최소금액은 100원입니다.");
			 return;
		 }
		 
		 if(withdraw > ac.getBalance()) {
			 System.out.println("예치금액보다 큰 금액은 출금이 불가합니다.(잔고: " + ac.getBalance() +")");
			 return;
		 }
		 
		ac.setAccountNumber(accountNum);
		long balance = ac.getBalance() - withdraw;
		ac.setBalance(balance);
		store.writeAccount(accountMap);
		System.out.println(accountNum + " 계좌 출금 완료되었습니다..");
	 
	}
	
	/**
	 * 잔액 조회하기
	 * @throws Exception
	 */
	public void getBalance() throws Exception {
		//개설번호 입력
		System.out.println(" 조회할 계좌번호를 입력 : ");
		String accountNum = scan.next();
		
		//봔환이 null 이면 계좌가 없다!!
		Account ac = this.checkAccount(accountNum);
				 
		//이미 존재하는지 확인
		if(ac == null) {
			System.out.println("해당 계좌는 존재하지 않습니다.");
			return;
		}
		
		System.out.println(ac);
	 
	}
	
	/**
	 * 계좌 해지하기 
	 * @throws Exception
	 */
	public void cancelAccount() throws Exception {
		//개설번호 입력
		System.out.println(" 해지할 계좌번호를 입력 : ");
		String accountNum = scan.next();
		
		//봔환이 null 이면 계좌가 없다!!
		Account ac = this.checkAccount(accountNum);
				 
		//이미 존재하는지 확인
		if(ac == null) {
			System.out.println("해당 계좌는 존재하지 않습니다.");
			return;
		}
		
		//해지 할건지 물어보기 
		System.out.println("정말 해지하시겠습니까?(y/n)");
		String yesNo = scan.next();
		
		//해지 여부에 따라 처리 
		if(yesNo.equalsIgnoreCase("y") || yesNo.equalsIgnoreCase("yes")) {
			this.accountMap.remove(ac.getAccountNumber());
			this.store.writeAccount(accountMap);
		
			System.out.println(accountNum + " 계좌가 정상적으로 해지되었습니다.");
		}else {
			System.out.println("계좌해지가 취소되었습니다.");
		}
			
	}
	
	
	/**
	 * 계좌가 존재하는지 확인
	 * @param accountNum
	 * @return
	 * @throws Exception
	 */
	public Account checkAccount(String accountNum) throws Exception {
		Account account = null;			 
		//이미 존재하는지 확인
		if(accountMap.containsKey(accountNum)) {
			account = this.accountMap.get(accountNum);
		}
		return account;
	}
	
	
	
	
}
