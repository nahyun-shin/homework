package kr.study.override;

public class Student {
	
	private String myName;
	private int score;
	
	
	public String getMyName() {
		return myName;
	}
	public void setMyName(String myName) {
		this.myName = myName;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	
	
	
	//부모가 준 메서드를 재정의(내용을 변경)
	//toString() 은 최상위 클래스 object 가 준것
	
	@Override //생략가능 가독성을 위해 표시를 해주는게 좋음
	public String toString() {
		String str ="이름 : "+this.getMyName()+", ";
		str +="점수 : "+this.getScore();
		return str;
	}
	
	
}
