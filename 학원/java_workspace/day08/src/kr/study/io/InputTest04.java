package kr.study.io;

import java.io.File;
import java.io.FileInputStream;

public class InputTest04 {

	public static void main(String[] args) {

		File file = new File("example.txt");
		

		/*
		 * jdk 1.7 이후
		 * try - with -resources
		 * close 가 자동으로 됩니다.
		 */
		
		byte[] buffer = new byte[100]; 
		

		//()안에 여러개의 선언을 쓸 경우 세미콜론(;) 으로 구분하기 때문에 한 줄 이라도 사용해주자
		//close 관련한 I/O를 쓸때 아래 코드로 사용
		try(FileInputStream in = new FileInputStream(file);) {
			//코드
			int read = 0; //읽어올 값 저장

			//read 메서드가 buffer 배열에다가 읽은 글자를 담는다.
			//read 메서드는 buffer 에 담은 개수를 반환해준다.
			//read 변수는 메서드가 읽어드린 문자의 개수를 가진다.
			
			while((read = in.read(buffer)) != -1) {
				
				System.out.write(buffer, 0, read);
			}

		}catch (Exception e) { //I/O는 IOException으로 하는것보다 최상위 클래스로 하는게 더 좋음
			//예외처리
			e.printStackTrace();
			System.out.println("에러");
		}








	}

}
