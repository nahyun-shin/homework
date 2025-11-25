package test02.data;

	/**
	 * 
	 * 계좌 정보를 담는 클래스
	 */
public class Infor {
	
	
	private String bankBook;
	private long bankCash;
	
	
	public String getBankBook() {
		return bankBook;
	}
	public void setBankBook(String bankBook) {
		this.bankBook = bankBook;
	}
	public long getBankCash() {
		return bankCash;
	}
	public void setBankCash(long bankCash) {
		this.bankCash = bankCash;
	}
	
	
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("계좌번호 : " + this.getBankBook()+", ");
		sb.append("잔액 : " +this.getBankCash());
		return sb.toString();
	}
	
	
	
	
	
}
