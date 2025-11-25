package kr.account.data;

public class Account {

	private String accountNumber;
	private long balance;
	
	
	public String getAccountNumber() {
		return accountNumber;
	}
	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}
	public long getBalance() {
		return balance;
	}
	public void setBalance(long balance) {
		this.balance = balance;
	}
	
	
	
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("계좌번호 : " + this.getAccountNumber()+", ");
		sb.append("잔액 : " + this.getBalance());
		
		return sb.toString();
	}
	
}
