package kr.study.exp; //예외오류를 세부적으로 처리하는 방법

public class ExceptionText02 {

	public static void main(String[] args) {

		int num = 10;
		int result = 0;
 
		//예외 발생 가능성이 있는 코드를 try{...} 안에 작성
		try {

			//예외오류 발생지점
			//result가 오류가 나서 거기까지만 실행되며 catch로 바로 넘어감 오류난 이후 메소드는 실행 되지 않음
			result = num/0;
			System.out.println("결과 : " + result);
			
		}catch(ArithmeticException e) {
			//예외처리 내용
			System.out.println("0으로 나누기 안됨!!");
		}

		System.out.println("종료");

	}

}
