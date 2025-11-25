package day02;

public class IfTest01 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		//랜덤함수 만들기
		// 1. Math.random() * 51 << 0~51미만 까지의 랜덤 실수 구하기 ex) 50.99999....
		// 2. (int)(Math.random() * 51) << 1에서 구한 숫자가 강제로 정수로 변환됨 0 ~ 50
		// 3. (int)(Math.random() * 51) + 50 << 값의 범위 50 ~ 100
		int score = (int)(Math.random() * 51) + 50; 
		
		if(score >=65) {
			System.out.println("합격, 점수 :" + score);
		}else {
			System.out.println("불합격, 점수 :" + score);
		}

	}

}
