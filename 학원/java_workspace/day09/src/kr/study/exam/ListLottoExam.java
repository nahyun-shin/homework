package kr.study.exam;

import java.util.ArrayList;
import java.util.Collections;
import java.util.InputMismatchException;
import java.util.List;
import java.util.Random;
import java.util.Scanner;

public class ListLottoExam {

	public static void main(String[] args) {

		List<Integer> lotto = new ArrayList<>();
		List<Integer> ball = new ArrayList<>();
		Random rand = new Random();
		int bonus = 0;
		//로또 공 만들기
		
		for(int i=1; i<=45; i++) {
			ball.add(i);

		}


		int count=0;
		//보너스 번호까지 7개 니까
		while(count<7) {
			//섞기
			Collections.shuffle(ball);
			//추출된 영역을 지우기 때문에 count 만큼 max값을 줄여야 한다.
			//위치를 랜덤하게 뽑음
			int randIndex = rand.nextInt(45-count);
			//로또와 보너스 번호 만들기
			if(count<6) {
				
				lotto.add(count++,ball.get(randIndex));
				ball.remove(randIndex);

			}else {
				bonus = ball.get(randIndex);
				break;
			}


		}

		Collections.sort(lotto);
		System.out.println("로또 : "+lotto+", 보너스번호 : "+bonus);


		List<Integer> user = new ArrayList<Integer>();
		count = 0;
		Scanner scan = new Scanner(System.in);

		while(count<6) {
			try {
				System.out.println((count+1)+"번째 번호 입력 : ");
				int val = scan.nextInt();

				if(val<1||val>45) {
					throw new InputMismatchException("1~45사이만 입력 가능합니다.");
				}
				if(user.contains(val)) {
					System.out.println(val+"번호는 이미 존재합니다.");
					continue;
				}
				user.add(count++, val);

			}catch (Exception e) {
				System.out.println(e.getMessage()==null?"입력 오류!":e.getMessage());
//				scan.nextInt();
			}
		}
		Collections.sort(lotto);
		System.out.println("사용자 로또: "+user);
		//비교
		List<Integer> winNumbers = new ArrayList<>(user);
		//서로 동일한 값만 남는다.
		winNumbers.retainAll(lotto);
		boolean isBonus = user.contains(bonus);

		System.out.println("맞은 번호 : "+winNumbers);
		System.out.println(winNumbers.size()==5&&isBonus?"보너스 번호 : "+bonus:"");

		//등수
		if(winNumbers.size() == 6) {
			System.out.println("대박 1등입니다.");
		}else if(winNumbers.size() ==5&&isBonus) {
			System.out.println("대박 2등입니다.");
		}else if(winNumbers.size() ==5) {
			System.out.println("대박 3등입니다.");
		}else if(winNumbers.size() ==4) {
			System.out.println("대박 4등입니다.");
		}else if(winNumbers.size() ==3) {
			System.out.println("대박 5등입니다.");
		}else {
			System.out.println("꽝");
		}





	}

}
