package kr.study.sorting;

public class Student implements Comparable<Student> { //도우미클래스를 만들거나 implements로 선언하거나 하지만 오름차순 내림차순을 한다면 도우미클래스를 만드는것이 좋음
	
	private String myName;
	private int score;
	
	public Student(String myName, int score) {
		this.setMyName(myName);
		this.setScore(score);
	}
	
	

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


	// 내 뒤에 있는 객체를 매개변수로 받는다.
	@Override
	public int compareTo(Student o) {
		return this.getScore()> o.getScore() ? 1:-1;
	}
	
	
	
	
	
	
}
