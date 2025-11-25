package day02;

public class OperatorTest02 {

	public static void main(String[] args) {
		
		int num = 10;
		int sum = 0;
		
		//sum에 값을 대입
		sum = num++;
		 
		System.out.println("sum : " + sum + "\tnum : " + num);
		// System.out.println(String.format("sum = %d, num = %d", sum, num));
		// num = 11
		sum = ++num;
		
		System.out.println("sum : " + sum + "\tnum : " + num);
		//System.out.println(String.format("sum = %d, num = %d", sum, num));
		
		boolean isTrue =true;
		System.out.println(!isTrue);
		System.out.println(isTrue);
		
	}

}
