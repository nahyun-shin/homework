package kr.study.ch.Writer;

import java.io.FileWriter;
import java.util.Scanner;

public class FileWriterTest {

	public static void main(String[] args) {

		try(FileWriter fw = new FileWriter("writer.txt");
				Scanner scan = new Scanner(System.in);){

			String str = "";
			System.out.println("키보드 입력(end 입력 시 종료) : ");

			//end 입력하면 종료
			while(!(str = scan.nextLine()).equals("end")){
				//입력 내용 쓰고 줄바꾸기를 추가로 입력
				fw.write(str +"\n");
			}
			System.out.println("파일 쓰기 종료");
		}catch (Exception e) {
			System.out.println("쓰기 에러!");
		}

	}

}
