package kr.study.homework;

import java.util.Arrays;
import java.util.Scanner;

public class lotto {

	public static void main(String[] args) {
		
		
		//배열선언
		
		int[] lotto = new int [6]; //6개의 로또번호를 구하기 위해 6개의 방을 만든다.
		
		int[] bonus = new int [1]; //보너스 숫자를 구하기 위해
		
		int[] bonusUser = new int [1]; //보너스 숫자를 입력 위해
		
		int[] user = new int [6]; //사용자가 6개의 로또번호를 입력할 수 있도록
		
		Scanner scan = new Scanner(System.in);//사용자가 로또번호를 입력할 수 있도록 스캐너 선언
		
		
		
		
		
		
		//로또당첨숫자를 랜덤으로 구함
		for (int i = 0; i<lotto.length; i++) {//6개의 랜덤한 로또당첨숫자를 구함
			
			//45까지의 랜덤한 숫자로 당첨 번호가 나올 수 있도록 수식
			lotto[i] = (int)(Math.random()*45)+1;
			
			//랜덤으로 구해진 로또당첨숫자 중복검사
			//lotto첫번째 숫자는 0번째 숫자와비교 = 세번째 숫자는 첫번째 두번째 숫자와 비교/ 랜덤한 숫자가 뽑힐때 i위치에서 -1만큼 반복 되어야 뽑혀진 모든 숫자와 비교할 수 있음
			for(int j=0; j<i; j++) {
				//i번째와 j번째의 숫자가 동일하다면 실행
				if(lotto[i] == lotto[j]) {
					i--; //중복된걸 찾았으면 원하는 갯수만큼 구하기 위해 카운트된 수를 마이너스하여 한번 더 뽑도록함.
					break; //중복된걸 찾으면 멈춤
				}
			}
			
			
		}
		
		
		
		
		//로또당첨 보너스 숫자를 구함
		for (int i=0; i<bonus.length; i++) {
			
			bonus[i] = (int) (Math.random()*45)+1;
			//기존의 뽑혀있는 당첨 숫자와 중복되지 않게 검사
			for(int j=0; j<lotto.length; j++) {
				if(bonus[i] == lotto[j]) {
					i--;
					break;
				}
			}
		}
		
		
		
		
		System.out.println("당첨번호 : "+Arrays.toString(lotto)); //랜덤으로 구해진 로또당첨숫자가 기입된 배열 속 값올 문자로 출력
		System.out.println("보너스번호 : "+Arrays.toString(bonus)); //랜덤으로 구해진 로또보너스당첨숫자가 기입된 배열 속 값올 문자로 출력
		
		
		
		//사용자가 로또번호입력
		for (int i =0; i<user.length; i++) { // 사용자가 6번동안 로또번호를 입력
			System.out.println((i+1)+"번째 로또 번호 입력 : ");//몇번째의 로또번호를 입력하는지 출력
			user[i] = scan.nextInt();//사용자가 포문이 한번 실행 될 때 마다 입력을 할 수 있다.
			
			
			//버퍼지우기
			scan.nextLine();
			
			
			//사용자가 입력한 로또의 값과 이전에 입력한 값의 중복검사
			for(int j=0; j<i; j++) {
				
				//중복된다면 실행
				if(user[i] == user[j]) { 
					System.out.println(user[i]+"번호는 이미 존재함."); //사용자가 중복 된 값을 입력한다면 문자를 출력하여 알려줌
					i--; //중복된값이 있다면 다시 입력해야하니까 올라간 카운트를 마이너스하여 다시 입력하도록함
					break; //중복된 값 찾으면 멈춤
					
				}
			}
			
			
		}
		
		
		
		
	
		scan.close(); //사용자의 입력이 끝나면 입력종료
		
		
		
		
		//당첨번호와 보너스번호를 저장할 배열
		int[] winNumbers = new int[6]; //6개의 당첨번호를 저장해야하므로 6을 줌
		int[] bonusNumbers = new int[1]; //6개의 당첨번호를 저장해야하므로 6을 줌
		int cnt = 0; //당첨된 숫자의 갯수를 카운팅 하기 위해 선언
		int bonusCnt = 0; //당첨된 숫자의 갯수를 카운팅 하기 위해 선언
		
		
		
		
		//당첨된 로또번호만 배열에 넣고 카운팅 될 수 있도록 loop
		for(int i = 0; i < winNumbers.length; i++) { //총 6번의 loop
			for(int j=0; j < winNumbers.length; j++) { //총 36번의 loop				
				//당첨된 번호가 있다면 winNumbers[i]번째에 당첨된 번호의 위치가 있는[j]의 값을 넣고, 당첨된 숫자카운트
				if(user[i] == lotto[j]) {
					winNumbers[i] = lotto[j];
					cnt++;
				}
				
			}
		}
		
		
		
		
		//당첨된 보너스번호만 배열에 넣는다.
		for(int i=0; i<bonusNumbers.length; i++) {
			for(int j=0; j < winNumbers.length; j++) { //총 36번의 loop				
				//당첨된 번호가 있다면 winNumbers[i]번째에 당첨된 번호의 위치가 있는[j]의 값을 넣고, 당첨된 숫자카운트
				if(bonus[i] == user[j]) {
					bonusNumbers[i] = bonus[i];
					bonusCnt++;

				}
				
			}
		}
		
		
		
		
		
		System.out.println("======로또 결과=====");
		
		System.out.print("맞은 로또번호 : ");
		
		//당첨된 로또번호만 출력
		for(int i=0; i<winNumbers.length; i++) {
			if(winNumbers[i] == 0){ //결과값이 0이라면 출력하지 않음
				continue; //출력을 건너뜀
			}
			System.out.print(winNumbers[i]+",");//당첨된 로또번호만 출력
		}
		
		//당첨된 보너스번호만 출력
		System.out.print("");
		
		for(int i=0; i<bonusNumbers.length; i++) { //보너스번호는 하나만 출력 되어야 하기 때문에 length의 상위를 1의 값을 지닌 bonusNumbers로 입력
			if(bonusNumbers[i] == 0) { //결과값이 0이라면 출력하지 않음
				continue; //출력을 건너뜀
			}
			System.out.println(bonusNumbers[i]);
		}
		
		
		
		
		
		//등수출력
		System.out.print("\n등수 : ");
		
		if(cnt == 6) {
			System.out.print("1등");
		}else if(cnt == 5 && bonusCnt == 1) { //로또번호5개와 보너스번호1개가 맞을때에 2등
			System.out.print("2등");
		}else if(cnt==5) {
			System.out.print("3등");
		}else if(cnt==4) {
			System.out.print("4등");
		}else if(cnt==3) {
			System.out.print("5등");
		}else {
			System.out.print("낙점...");
		}
	}
	

}

