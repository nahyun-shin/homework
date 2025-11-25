package kr.study.loop2;

public class WhileTest01 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		int sum = 0;
		
		int val =1;
		
		while(val <=100) {
			if (val %2 ==0) {
				sum +=val;
			}
			val++;
		}
		
		System.out.println("짝수 합 : "+sum);

	}

}
