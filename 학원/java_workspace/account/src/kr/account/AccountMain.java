package kr.account;

import kr.account.service.AccountService;

public class AccountMain {
	public static void main(String[] args) {
		
		AccountService s = new AccountService();
		s.start();
	}
}
