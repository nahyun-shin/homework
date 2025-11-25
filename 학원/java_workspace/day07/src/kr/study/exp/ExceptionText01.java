package kr.study.exp;//예외오류 발생 (문법적으로는 문제가 없는 코드 이지만, 수학적으로 오류가 있는 코드)

public class ExceptionText01 {

	public static void main(String[] args) {
		
		int num = 10;
		int result = 0;
		
		//예외오류발생지점
		result = num/0;
		
		System.out.println("결과 : " + result);
		System.out.println("종료");
		
		
		
	}

}
