package kr.study.io;

import java.io.File;
import java.io.FileInputStream;

public class InputTest03 {

	public static void main(String[] args) {

		File file = new File("example.txt");


		/*
		 * jdk 1.7 이후
		 * try - with -resources
		 * close 가 자동으로 됩니다.
		 */

		//()안에 여러개의 선언을 쓸 경우 세미콜론(;) 으로 구분하기 때문에 한 줄 이라도 사용해주자
		//close 관련한 I/O를 쓸때 아래 코드로 사용
		try(FileInputStream in = new FileInputStream(file);) {
			//코드
			int read = 0; //읽어올 값 저장

			while(read != -1) {
				read = in.read();
				System.out.print((char)read);
			}

		}catch (Exception e) { //I/O는 IOException으로 하는것보다 최상위 클래스로 하는게 더 좋음
			//예외처리
			System.out.println("에러");
		}








	}

}
