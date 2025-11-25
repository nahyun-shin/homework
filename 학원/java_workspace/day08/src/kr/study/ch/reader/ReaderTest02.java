package kr.study.ch.reader;

import java.io.FileReader;

public class ReaderTest02 {

	public static void main(String[] args) {
		
		//char 기반 FileReader 생성
		try(FileReader reader = new FileReader("example.txt")) {
			
			int read = 0;
			char[] buffer = new char[100];
			
			//char를 읽을 때에는 숫자 표현으로 읽는 것이 편하다.
			while ((read = reader.read(buffer)) != -1) {
				
				//읽은 내용 출력
				//char로 읽을 수 있는건 메모장으로 된 txt파일 그 외에는 읽지 못함
				//그래서 메모장에서 열어서 읽을 수 있는 파일은 가능 그외 불가능
				//String.valueOf = 배열만 넣어서 읽을 수 있는게 아니라 길이도 설정하여 읽을 수 있음
				System.out.print(String.valueOf(buffer, 0, read));
			}
			
		}catch (Exception e) {
			System.out.println("읽기 오류");
		}

	}

}
