package kr.study.exp;//예외오류를 finally를 사용하여 끝까지 세부적으로 처리하는 방법

import java.util.InputMismatchException;
import java.util.Scanner;

public class ExceptionTest03 {

	public static void main(String[] args) {

		Scanner scan = new Scanner(System.in);
		
		try {
			System.out.println("값 입력 : ");
			//정수의 입력을 받는다.
			int number = scan.nextInt(); 
			
			//정수의 입력을 받는다면 프린트내용출력
			System.out.println("출력 : "+number); 
			
		}catch(InputMismatchException e) {
			//예외발생
			System.out.println("키보드 입력 오류");
		}finally { //기존에 사용한 코드를 정리하는 영역
			//특징 > 예외 발생 여부와 상관없이 실행됨
			//스캐너 닫기
			if(scan != null) {
				scan.close();
			}
			System.out.println("finally 실행");
		}
		System.out.println("종료");
		
		
		
	}
	


}
