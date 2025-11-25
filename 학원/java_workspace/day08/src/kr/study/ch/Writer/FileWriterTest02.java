package kr.study.ch.Writer;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.util.Scanner;

public class FileWriterTest02 {

	public static void main(String[] args) {
		//이어쓰기 기능 있음 true를 넣어주면됨
		try(FileWriter fw = new FileWriter("writer.txt",true);
				BufferedWriter bw = new BufferedWriter(fw);
				Scanner scan = new Scanner(System.in);){

			String str = "";
			System.out.println("키보드 입력(end 입력 시 종료) : ");

			//end 입력하면 종료
			while(!(str = scan.nextLine()).equals("end")){
				//입력 내용 쓰고 줄바꾸기를 추가로 입력
				bw.write(str +"\n");
			}
			System.out.println("파일 쓰기 종료");
		}catch (Exception e) {
			System.out.println("쓰기 에러!");
		}

	}

}
