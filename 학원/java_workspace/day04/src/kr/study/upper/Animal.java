package kr.study.upper;

public class Animal {

	private String myName;
	private String food;
	
	
	
	
	public String getMyName() {
		return myName;
	}

	public void setMyName(String myName) {
		this.myName = myName;
	}

	public String getFood() {
		return food;
	}

	public void setFood(String food) {
		this.food = food;
	}




	public void eating() {
		System.out.println(this.getMyName()+"가 "+this.getFood()+"를 먹는다.");
	}
	
}
