package kr.study.out;

import java.io.FileOutputStream;

public class FileOutTest01 {

	public static void main(String[] args) {
		
		
		//(쓸파일, 이어쓰기 설정)-> 이어쓰기 설정 기본설정을 false(덮어쓰기)
		try(FileOutputStream out = new FileOutputStream("outTest.txt",true)){ //파일을 만들기 전 
			
			
			String str = "hello hi\n 안녕하세요. 글 써봅시다.";
			//바이트 기반이여서 문자를 바이트 코드로 변경해서 넣어줘야한다..
			//문자열 긴으중에 문자열을 바이트로 변경하는 게 있어요
			out.write(str.getBytes("utf-8"));//배열
			//out.wait('\n');
			
			System.out.println("파일 쓰기 완료");
		}catch (Exception e) {
			e.printStackTrace();//모든 예외발생을 추적해서 print
		}

	}

}
