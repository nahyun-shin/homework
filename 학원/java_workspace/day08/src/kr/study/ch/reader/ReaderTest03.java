package kr.study.ch.reader;

import java.io.BufferedReader;
import java.io.FileReader;

public class ReaderTest03 {

	public static void main(String[] args) {
		
		//char 기반 FileReader 생성
		try(FileReader reader = new FileReader("example.txt");
				BufferedReader br = new BufferedReader(reader);) {
			
			int read = 0;
			
			//char를 읽을 때에는 숫자 표현으로 읽는 것이 편하다.
			while ((read = br.read()) != -1) {
				
				//읽은 내용 출력
				//char로 읽을 수 있는건 메모장으로 된 txt파일 그 외에는 읽지 못함
				//그래서 메모장에서 열어서 읽을 수 있는 파일은 가능 그외 불가능
				//배열로도 가능하긴 하나 이미지나 정말 긴 웹소설이 아닌 경우에는 상관없음
				System.out.print((char)read);
			}
			
		}catch (Exception e) {
			System.out.println("읽기 오류");
		}

	}

}
