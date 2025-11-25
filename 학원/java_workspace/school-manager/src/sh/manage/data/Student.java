package sh.manage.data;

import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * 학생 클래스
 * 학생 정보를 담는 클래스
 */

public class Student {
	
	private String myName;
	private int kor;
	private int eng;
	private int math;
	
	
	
	public String getMyName() {
		return myName;
	}
	public void setMyName(String myName) {
		this.myName = myName;
	}
	public int getKor() {
		return kor;
	}
	public void setKor(int kor) {
		this.kor = kor;
	}
	public int getEng() {
		return eng;
	}
	public void setEng(int eng) {
		this.eng = eng;
	}
	public int getMath() {
		return math;
	}
	public void setMath(int math) {
		this.math = math;
	}
	
	
	
	
	public int getTotal() {
		return this.getKor() +this.getEng()+this.getMath();
	}
	
	public double getAvg() {
		return new BigDecimal(this.getTotal() / 3.0).setScale(2, RoundingMode.HALF_UP).doubleValue();
	}
	
	public int hashCode() {
		return this.getMyName().hashCode();
	}
	
	public boolean equals(Object o) {
		if(!(o instanceof Student)) {
			return false;
		}
		Student comp= (Student)o;
		return this.getMyName().equals(comp.getMyName());
	}
	
	
	
	
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("이름 : "+ this.getMyName()+", ");
		sb.append("국어 : "+ this.getKor()+", ");
		sb.append("영어 : "+ this.getEng()+", ");
		sb.append("수학 : "+ this.getMath()+", ");
		sb.append("총점 : "+ this.getTotal()+", ");
		sb.append("평균 : "+ this.getAvg()+", ");
		
		return sb.toString();
	}

}
