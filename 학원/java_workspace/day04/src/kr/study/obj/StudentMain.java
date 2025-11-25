package kr.study.obj;

public class StudentMain {

	public static void main(String[] args) {
		Students st = new Students();
		st.myName = "김영희";
		st.kor = 90;
		st.eng = 88;
		st.math = 73;
		
		
		System.out.print("이름 : "+ st.myName);
		System.out.print(", 국어 : " + st.kor + ", 영어 :" + st.eng + ", 수학 :" + st.math);
		System.out.println(",총점 : " + st.getTotal() + ", 평균 : " + st.getAvg());
	}

}
