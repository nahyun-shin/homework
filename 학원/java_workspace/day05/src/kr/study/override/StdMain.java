package kr.study.override;

import java.util.Scanner;

public class StdMain {

	public static void main(String[] args) {


		Scanner scan = new Scanner(System.in);
		int count =0;

		do {
			System.out.println("몇명의 학생을 생성?: (최소 3명)");
			count = scan.nextInt();
			//3명 미만은 시작 안할거임....
			if (count <3){
				System.out.println("최소 3명의 학생을 생성해야함..");
			}
		}while(count <3);

		//선택한 숫자만큼의 학생을 저장할 배열 만들기
		Student[] stArray =new Student[count];

		//선택한 숫자만큼의 학생을 만들기
		for(int i =0; i<stArray.length; i++) {
			Student st = new Student();
			System.out.println((i+1)+"번째 학생 이름 : ");
			st.setMyName(scan.next());
			System.out.println((i+1)+"번째 학생 점수 : ");
			//st.setScore(scan.nextInt());
			//배열에 학생
			stArray[i] = st;
		}

		scan.close();
		//성적순으로 출력하기 위한 정렬
		Student temp = null;

		//객체를 이용한 버블 정렬
		for(int i = stArray.length; i>0; i--) {
			for(int j=0; j<(i-1); j++) {
				if(stArray[j].getScore()<stArray[j+1].getScore()) {
					temp = stArray[j+1];
					stArray[j+1]=stArray[j];
					stArray[j]=temp;
				}
			}
		}
		for(int i =0; i < stArray.length; i++) {
			//toString()을 이용한 출력
			System.out.println();
		}

	}
}

