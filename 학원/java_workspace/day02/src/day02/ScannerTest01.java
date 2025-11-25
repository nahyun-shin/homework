package day02;

import java.util.Scanner;

public class ScannerTest01 {

	public static void main(String[] args) {
		/*
		 * Scanner는 console창에서 입력을 받을 수 있는 java.util 안의 class이다.
		 * java.util을 선언해 주어야한다.
		 * 단축키 ctrl+shift+o 
		 * (대부분은 java.lag에 들어있음)
		 *  
		 *  next + 타입() = 원하는 타입의 키보드 입력을 읽고 반환한다.(보통 숫자)
			next() 		 = 문자열 입력. 띄어쓰기를 구분하지 못해서 띄어쓰기 뒤에 입력된 값은 buffer라는 공간에 남는다.
							그래서 scan.nextLine();으로 버퍼를 지워준다.
			nextLine() 	 = 문자 열 입력. 띄어쓰기 가능
						   이전에 입력된 내용이 있다면 그것을 반환하여 사용
						  (auto flush 기능 존재)
		 */
		
		Scanner scan = new Scanner(System.in);
		
		System.out.println("숫자입력 : ");
		int num01 = scan.nextInt();
		
		System.out.println("문자 입력 : ");
		String str01 = scan.next();
		
		
		scan.nextLine(); //남은 내용 버리기 용도
		
		
		System.out.println("문자2 입력 : ");
		String str02 = scan.nextLine();
		
		System.out.println(num01);
		System.out.println(str01);
		System.out.println(str02);
		
		scan.close(); //스캐너 닫기

	}

}
