package kr.study.homework;

import java.util.Arrays;
import java.util.Random;
import java.util.Scanner;

public class lottoReview {

	public static void main(String[] args) {

		
		//랜덤 클래스
		Random rand = new Random();
		//45개 공이 들어있는 배열
		int[] balls = new int[45];
		
		int count = 0;
		
		//45개 넣기
		for(int i = 0; i <45; i++) {
			balls[i] = (i+1); //무한loop를 할 수 있기 때문에 멈출 수 있는 장치인 +1을 넣음
		}
		
		//시스템 로또 + 보너스 번호
		int bonusNum = 0;
		int[] lotto = new int[6];
		
		while(count<7) { //7이 될때 멈춤
			//0<= X <숫자 사이에서 랜덤값 X는 정수
			int index = rand.nextInt(45); 
			//해당 위치값이 0이면 이미 추출된 번호
			if(balls[index]==0) {
				continue;
			}
			
			//count가 6보다 작으면 아직 로또 번호 생성중
			//count == 6 이면 로또 번호는 완성 보너스번호만 있음 됨
			//처음에 중복된 번호가 추출된다면 아래 if문이 실행되지 않게 ㄴ
			if(count < 6) {
				lotto[count++] = balls[index];
				balls[index] = 0;
			}else {
				bonusNum = balls[index];
				break;
			}
		}
		
		//로또 번호와 보너스 번호 출력해보기
		System.out.println("로또 : "+Arrays.toString(lotto)+",보너스 : "+bonusNum);
		
		//사용자 로또를 만들어 보아오
		int[] users = new int[6];
		Scanner scan = new Scanner(System.in);
		//카운트 초기화
		count = 0;
		
		while(count <6) {
			System.out.println((count+1)+"번째 번호 : ");
			int ball = scan.nextInt();
			scan.nextLine();//키입력 버퍼 지우기
			
			//입력번호 유효체크
			if(ball<1||ball>45) {
				System.out.println("로또 번호는 1에서 45사이여야 합니다.");
				continue;
			}
			
			//중복처리
			for(int i=0; i<count; i++) {
				if(ball == users[i]) {
					System.out.println(ball+"번호는 이미 선택되었습니다.");
					ball = 0;
					break;
					
					
				}
			}
			//번호가 0이 아니라면 중복이 아니므로 삽입
			if(ball !=0) {
				users[count++]=ball;
			}
			
		}
		//사용자 입력 로또출력
		System.out.println("User 로또 : "+Arrays.toString(users));
		//스캐너 닫기
		scan.close();
		//비교
		int[] wins = new int[6];
		//맞춘 번호 개수
		int winCnt = 0;
		boolean isBonus = false; //보너스 번호 매치 유무
		
		for(int i =0; i < users.length; i++) {
			for(int j =0; j < lotto.length; j++) {
				if(users[i] == lotto[j]) {
					wins[winCnt++]=users[i];
					break;
				}
			}
			//앞에 !를 붙여 논리연산자를 부정하는 isBonus == false 와 같음.
			if(!isBonus) {
				if(users[i] == bonusNum) {
					isBonus = true;
				}
			}
		}
		
		//맞은 번호 출력
		for(int i =0; i < winCnt; i++) {
			System.out.println(wins[i]);
			//마지막 전까지만 콤마 붙이기 위해서 쓴다.
			if(i < (winCnt-1)) {
				System.out.println(",");
			}
		}
		//3항 연산식
		//(조건) ? 참일때 실행문 : 거짓일 때 실행문
		System.out.println(winCnt==5 &&isBonus ? ",보너스번호 : " + bonusNum:"");
		//등수 출력
		if(winCnt ==6) {
			System.out.println("당첨 1등");
		}else if(winCnt ==5 && isBonus) {
			System.out.println("당첨 2등");
		}else if(winCnt ==5 ) {
			System.out.println("당첨 3등");
		}else if(winCnt ==4) {
			System.out.println("당첨 4등");
		}else if(winCnt ==3) {
			System.out.println("당첨 5등");
		}else{
			System.out.println("꽝");
		}
	}

}
