package day02;

import java.util.Scanner;

public class SwitchTest {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		Scanner scan = new Scanner(System.in);
		
		System.out.println("점수 입력 : ");
		int score = scan.nextInt();
		
		switch(score / 10) {
		
		//case 10 : 
		//case 10, 9 :
		//위에 처럼 수식을 넣지 않으면 100점일때 A가 나오지 않음.
		//그래서 두 수식 다 100점일때 A점수가 나오도록 할 수 있음. 최근에는 2번째 방법으로 사용.
		
		case 10, 9 :
			System.out.println("A학점, 점수 : "+ score);
			break;//break가 없으면 다음case넘어감
		case 8 :
			System.out.println("B학점, 점수 : "+ score);
			break;
		case 7 :
			System.out.println("C학점, 점수 : "+ score);
			break;
		case 6 :
			System.out.println("D학점, 점수 : "+ score);
			break;
		default :
			System.out.println("F학점, 점수 : "+ score);
			break;
		}
		
		scan.close();

	}

}
