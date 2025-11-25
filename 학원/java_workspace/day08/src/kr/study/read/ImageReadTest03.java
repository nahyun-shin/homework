package kr.study.read;//보조(Buffered) 배열 = 빠르고 안정적

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;

public class ImageReadTest03 {

	public static void main(String[] args) {

		File file = new File("testImg.jpg");


		/*
		 * jdk 1.7 이후
		 * try - with -resources
		 * close 가 자동으로 됩니다.
		 */

		//()안에 여러개의 선언을 쓸 경우 세미콜론(;) 으로 구분하기 때문에 한 줄 이라도 사용해주자
		//close 관련한 I/O를 쓸때 아래 코드로 사용
		try(FileInputStream in = new FileInputStream(file);
				BufferedInputStream bf = new BufferedInputStream(in);) { //          <---------------------------보조
			
			
			int avilable = in.available();//기다리지 않고 읽을 수 있는 크기

			//1키로바이트 기준을 세울건데 블럭킹 당하지 않을 크기가 1kb보다 크면 그걸 쓰고 아니면 1kb로 배열 만든다.
			int size = avilable > 1024 ? avilable : 1024;
			byte[] buffer = new byte[size];//배열을 사용하는데 buffer를 사용하는 것 보다 데이터가 적다. 


			//코드
			int read = 0; //읽어올 값 저장

			long start = System.currentTimeMillis();//현재 시간을 초단위 ms 1/1000초까지 나타냄

			while((read= bf.read(buffer)) != -1) {//              <--------------------------------배열
				

			}

			long end = System.currentTimeMillis();
			System.out.println(end-start);

		}catch (Exception e) { //I/O는 IOException으로 하는것보다 최상위 클래스로 하는게 더 좋음
			//예외처리
			System.out.println("에러");
		}








	}

}
