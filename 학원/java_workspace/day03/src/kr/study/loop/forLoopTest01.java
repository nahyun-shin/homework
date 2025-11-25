package kr.study.loop;

public class forLoopTest01 {

	public static void main(String[] args) {

		
		int sum = 0;
		
		
		//1 ~ 100 까지 합을 구하자
		for (int num = 1; num <= 100; num++) {
			sum = sum + num;
		}
		
		System.out.println("합 : "+sum);
		
		
		
		
		
		sum = 0;
		
		
		
		for (int num = 100; num > 0; num--) {
			sum = sum + num;
		}
		
		System.out.println("합 : "+sum);


	}

}
