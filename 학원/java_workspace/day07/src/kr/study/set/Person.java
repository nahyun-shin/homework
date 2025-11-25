package kr.study.set;

public class Person {
	private String myNumber; //주민번호
	private String myName;
	
	public Person(String myNumber, String myName) {
		this.setMyNumber(myNumber);
		this.setMyName(myName);
	}
	
	
	public String getMyNumber() {
		return myNumber;
	}
	public void setMyNumber(String myNumber) {
		this.myNumber = myNumber;
	}
	public String getMyName() {
		return myName;
	}
	public void setMyName(String myName) {
		this.myName = myName;
	}
	//리스트만 만들거나 중복이 되어도 될 때에는 hashCode,equals 안만들어도됨 대표값으로봐야함
	@Override
	public int hashCode() {
		System.out.println("=======hashCode 호출=========");
		return myName.hashCode();
	}
	@Override
	public boolean equals(Object o) {
		System.out.println("=======equals 호출=========");
		if(o==null) {
			return false;
		}else if(o instanceof Person) {
			Person p =(Person)o;
			return this.myNumber.equals(p.getMyNumber());
		}
		return false;
	}
	
	
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("주민번호 : "+this.getMyNumber()+", ");
		sb.append("이름 : "+this.getMyName());
		
		//sb는 StringBuilder 객체이기 때문에 toString() 메서드를 통해서 문자열로 반환
		return sb.toString();
		
	}
	
}
