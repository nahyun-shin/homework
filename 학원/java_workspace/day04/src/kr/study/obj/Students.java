package kr.study.obj;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class Students {

	String myName;
	int kor;
	int eng;
	int math;
	
	
	//총점
	
	public int getTotal() {
		return kor + eng + math;
		
	}
	//사용자가 생성자를 지정하면
	//system은 별도의 생성자를 만들지 않고 그대로 쓴다.
	
	public Students() {
		
	}
	
	
	//평균
	public double getAvg() {
		double avg = getTotal() /3.0;
		avg = new BigDecimal(avg).setScale(2,RoundingMode.HALF_UP).doubleValue();
		return avg; 
	}
	
}
