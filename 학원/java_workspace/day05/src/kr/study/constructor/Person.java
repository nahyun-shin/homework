package kr.study.constructor;

public class Person {
	
	
	private String myName;
	private String mygender;
	
	public Person() {
		
	
	}
	
	public Person(String myName, String gender) {
		this.setMygender(gender);
		this.setMyName(myName);

	}

	public String getMyName() {
		return myName;
	}

	public void setMyName(String myName) {
		this.myName = myName;
	}

	public String getMygender() {
		return mygender;
	}

	public void setMygender(String mygender) {
		this.mygender = mygender;
	}
	
}
