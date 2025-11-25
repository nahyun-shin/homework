package day02;

public class IfTest02 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		int score = (int)(Math.random() * 51) + 50;
		
		if( score >= 90) {
			System.out.println("A학점, 점수 :" + score);
		}else if(score >=80) {
			System.out.println("B학점, 점수 :" + score);
		}else if(score >=70) {
			System.out.println("C학점, 점수 :" + score);
		}else {
			System.out.println("F학점, 점수 :" + score);
		}

	}

}
