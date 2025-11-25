package kr.study.array;

import java.util.Arrays;
import java.util.Scanner;

public class DoubleArrayTest02 {

	public static void main(String[] args) {

		//로또 2차원배열로 만들기
		int[][]lotto = {
				{2,11,16,20,25,30},
				{1,6,17,22,24,33},
				{11,27,32,34,43,46},
				{7,16,24,33,42,44},
				{2,17,19,25,33,45}
				};
		
		//키보드 입력을 받을 scanner
		Scanner scan = new Scanner(System.in); 
		
		int[] user = new int[6];
		
		//번호 입력
		for(int i = 0; i < user.length; i++) {
			System.out.println((i+1)+"번째 로또 번호 입력 : ");
			user[i] = scan.nextInt(); //총 6번의 숫자입력을 위해 user에 i를 집어넣고 입력한 숫자가 각 입력순서와 값이 user에 대입 되게끔 수식
			//버퍼 비우기
			
			scan.nextLine();
			//중복체크
			for(int j=0; j<i; j++) {
				if(user[i] == user[j]) {
					System.out.println(user[i]+"번호는 이미 존재함.");
					i--; //i 포문에서 증가할테니 여기서 빼면 제자리
					break; //찾았으니까 그만
					
				}
			}
		}
		
		scan.close();
		
		//당첨번호를 저장할 배열
		int[][] winNumbers = new int[5][6];
		int[] winCnt = new int[5]; //당첨 된 개수
		
		int cnt = 0;
		for(int i = 0; i < lotto.length; i++) {
			cnt = 0; //한줄에서 일치하는 로또번호 개수
			for(int j=0; j<lotto[i].length; j++) {
				//사용자가 선택한 번호와 로또 번호를 비교
				if(user[j] == lotto[i][j]) {
					winNumbers[i][cnt++] = lotto[i][j];
				}
			}
			
			winCnt[i] = cnt;
		}
		
		System.out.println("======로또 결과=====");
		//출력
		for(int i=0; i<winNumbers.length; i++) {
			System.out.println((i+1)+" 번째 결과: ");
			for(int j=0; j<winCnt[i]; j++) {
				System.out.println(winNumbers[i][j]+","); //맞은 숫자만 출력하도록
				
			}
			
			if(winCnt[i] == 6) {
				System.out.println("1등");
			}else if(winCnt[i]==5) {
				System.out.println("2등");
			}else if(winCnt[i]==4) {
				System.out.println("3등");
			}else if(winCnt[i]==3) {
				System.out.println("4등");
			}else if(winCnt[i]==2) {
				System.out.println("5등");
			}else {
				System.out.println("낙점...");
			}
			
		}
	}

}
