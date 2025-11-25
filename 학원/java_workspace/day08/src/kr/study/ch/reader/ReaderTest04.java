package kr.study.ch.reader;//대용량을 처리할 때 가장 이상적인 방법

import java.io.BufferedReader;
import java.io.FileReader;

public class ReaderTest04 {

	public static void main(String[] args) {
		
		//char 기반 FileReader 생성
		try(FileReader reader = new FileReader("example.txt");
				BufferedReader br = new BufferedReader(reader);) {
			
			char[] buffer = new char[1024];//거의 1키로바이트
			
			int read = 0;
			
			//char를 읽을 때에는 숫자 표현으로 읽는 것이 편하다.
			while ((read = br.read(buffer)) != -1) {
				
				//읽은 내용 출력
				//char로 읽을 수 있는건 메모장으로 된 txt파일 그 외에는 읽지 못함
				//그래서 메모장에서 열어서 읽을 수 있는 파일은 가능 그외 불가능
				//배열로도 가능하긴 하나 이미지나 정말 긴 웹소설이 아닌 경우에는 상관없음
				System.out.print(String.valueOf(buffer, 0, read));
			}
			
		}catch (Exception e) {
			System.out.println("읽기 오류");
		}

	}

}
