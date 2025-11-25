package kr.study.io;

import java.io.File;

public class InputTest01 {

	public static void main(String[] args) {

		//File 객체에 대해서 배워봅시다.
		//물리적인 파일을 객체화 하여 클래스로 다룰 수 있도록
		/*
		 * 절대경로 | 상대경로
		 * 절대경로 : c:\test\.... > 물리적인 경로
		 * 상대경로 : 내 위치 기준 경로.
		 * 		/day08/kr/study/io/InputTest01.java
		 * 		/example.txt
		 * 		(슬래시 생략가능)example.txt
		 * 
		 */
		
		//import진행(./은 나의 위치를 뜻함 ../ = 두 번 찍으면 상위폴더를 뜻함 /최상위폴더)
		//이 아이의 정보를 읽어서 객체로 만듬
		//파일객체란 파일로 읽어서 클래스화 시킴
		//파일객체로 쓰지 않아도 경로를 적어 읽을 수 있지만, 파일객체로 써야지 "존재하는가"를 사용할 수 있음(빈 파일도 만들어서 파일을 복사할 때 사용할 수 있음)
		
		
		File file = new File("./example.txt");
		System.out.println("파일 이름 : "+file.getName());
		System.out.println("파일 크기(byte) : "+file.getName()+"byte");
		System.out.println("파일 경로(절대경로) : "+file.getAbsolutePath());
		System.out.println("파일 경로(상대경로) : "+file.getPath());
		System.out.println("파일 여부 : "+file.isFile());
		System.out.println("폴더 여부 : "+file.isDirectory());
		System.out.println("쓰기 권한 : "+file.canWrite());
		System.out.println("읽기 권한 : "+file.canRead());
		System.out.println("존재하는가 : "+file.exists());
		
		
		
	}

}
