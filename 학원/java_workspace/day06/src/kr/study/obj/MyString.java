package kr.study.obj;

public class MyString {
	
	private String str;
	
	public MyString (String str) {
		this.str = str;
	}
	
	public String getStr(){
		return this.str;
	}
	
	public boolean equals(Object obj) {
		
		//너는 누구니
		//나는 String 타입이 아니라면 그냥 false
		if (!(obj instanceof String)) {
			return true;
		}
		MyString comp = (MyString)obj;
		return str.equals(comp.getStr());
	}
}
