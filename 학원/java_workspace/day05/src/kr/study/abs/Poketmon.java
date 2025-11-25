package kr.study.abs;

public abstract class Poketmon {
	private String myName;

	public String getMyName() {
		return myName;
	}

	public void setMyName(String myName) {
		this.myName = myName;
	}
	
	
	//공격 기능은 각자 구현
	public abstract void attack();
	
}
