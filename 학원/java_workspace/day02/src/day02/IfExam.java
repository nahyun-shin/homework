package day02;

public class IfExam {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		int score = (int)(Math.random() * 50) + 1;
		
		if (score % 2 == 0) {
			System.out.println(score +", 짝수");
		}else {
			System.out.println(score +", 홀수");
		}

	}
	

}
