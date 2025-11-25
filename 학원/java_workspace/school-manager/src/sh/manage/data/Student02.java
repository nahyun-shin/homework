package sh.manage.data;

import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * 학생 클래스
 * 학생 정보를 담는 클래스
 */

public class Student02 {
	
	//객체선언
	private String myName;
	private int Kor;
	private int Eng;
	private int Math;
	
	
	//gettter, setter 를 다른 클래스에서도 쓸 수 있게 선언
	public String getMyName() {
		return myName;
	}
	public void setMyName(String myName) {
		this.myName = myName;
	}
	public int getKor() {
		return Kor;
	}
	public void setKor(int kor) {
		Kor = kor;
	}
	public int getEng() {
		return Eng;
	}
	public void setEng(int eng) {
		Eng = eng;
	}
	public int getMath() {
		return Math;
	}
	public void setMath(int math) {
		Math = math;
	}
	
	
	//합계메소드
	public int getTotal() {
		return this.getKor()+this.getEng()+this.getMath();
	}
	
	//평균값 메소드
	public double getAvg() {
		//실수로 평균값을 받는다. BigDecimal 생성자를 만들고 매개변수에 total값을 3으로 나눈값으로 setScale(남길자리수, 반올림).더블 실수값으로 나타냄 
		return new BigDecimal(this.getTotal()/3.0).setScale(2, RoundingMode.HALF_UP).doubleValue();
	}
	
	//문자로 변환
	public String toString() {
		
	}
	
	
	
	
	
}
