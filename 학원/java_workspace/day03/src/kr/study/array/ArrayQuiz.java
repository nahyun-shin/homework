package kr.study.array;

import java.util.Arrays;
import java.util.Scanner;

public class ArrayQuiz {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		Scanner scan = new Scanner(System.in);
		
		
		int []arr = new int[5];
		//배열 선언
		
		int sum = 0;
		//합을 저장할 변수
		
		for(int i=0; i<arr.length; i++) {
			//loop 돌리면서 배열에 값 입력 + 합 구하기
			
			System.out.println((i+1)+"번째 값 입력 : ");
			//프린트가 먼저 나오고 나서
			
			arr[i] = scan.nextInt();
			//loop가 한 번 되는 동안 배열의 방 하나에 입력값을 받을 수 있게끔 수식
					
			sum += arr[i];
			//입력값을 받으면 합계가 sum에 표시되게끔
		
		
		}
		
		System.out.println("배열 : "+Arrays.toString(arr));
		System.out.println("합 : "+sum);

	}

}
