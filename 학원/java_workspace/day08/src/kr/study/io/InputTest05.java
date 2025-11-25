package kr.study.io;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;

public class InputTest05 {

	public static void main(String[] args) {

		File file = new File("example.txt");


		/*
		 * jdk 1.7 이후
		 * try - with -resources
		 * close 가 자동으로 됩니다.
		 */
		byte[] buffer = new byte[5]; 
		//()안에 여러개의 선언을 쓸 경우 세미콜론(;) 으로 구분하기 때문에 한 줄 이라도 사용해주자
		//close 관련한 I/O를 쓸때 아래 코드로 사용
		try(FileInputStream in = new FileInputStream(file);
				//보조 스트림이며, 속도가 빠름 하지만 한글은 깨짐(한글이 깨지지 않게 하려면 배열에 넣어 불러와야함.)
				BufferedInputStream bf = new BufferedInputStream(in)) { 
			//코드
			int read = 0; //읽어올 값 저장

			while((read = bf.read(buffer)) != -1) {
				System.out.print(1);
				System.out.write(buffer, 0, read);
			}

		}catch (Exception e) { //I/O는 IOException으로 하는것보다 최상위 클래스로 하는게 더 좋음
			//예외처리
			System.out.println("에러");
		}








	}

}
