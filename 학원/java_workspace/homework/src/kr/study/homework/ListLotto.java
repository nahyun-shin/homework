package kr.study.homework;



import java.util.ArrayList;

import java.util.List;

import java.util.Random;

import java.util.Scanner;



public class ListLotto {

	public static void main(String[] args) {

		//로또 리스트 객체 만들기

		List<Integer> lotto = new ArrayList<>();

		//랜덤변수

		Random rand = new Random();

		//중복체크시 사용할 변수

		int checkNum = 0;

		//보너스 번호 생성

		int bonus = rand.nextInt(45)+1;

		

		for(int i=0; i<6; i++) {

			

			//1~45사이의 랜덤숫자를 1개뽑음

			checkNum = rand.nextInt(45)+1;

			

			//중복체크

			if(lotto.contains(checkNum)) {

				checkNum = rand.nextInt(45)+1;

			}

			//중복되지 않는다면 리스트에 더함

			lotto.add(checkNum);

		}

		//보너스 번호 중복체크

		if(lotto.contains(bonus)) {

			bonus = rand.nextInt(45)+1;

		}

		

		System.out.println("로또 번호 : "+lotto+" 보너스 번호 : "+bonus);

		

		Scanner scan = new Scanner(System.in);

		

		List<Integer> user = new ArrayList<>();

		

		

		//사용자 로또 번호 입력

		while(user.size()<lotto.size()) {

			System.out.println((user.size()+1)+"번째 로또 번호를 입력해주세요.");

			checkNum = scan.nextInt();

			

			//1~45사이를 제외한 숫자를 입력할 때 넘기기 

			if(checkNum<1||checkNum>45) {

				System.out.println("로또 번호는 1에서 45사이여야 합니다.");

				continue;

			}

			//중복체크

			if(user.contains(checkNum)) {

				System.out.println(checkNum+"번호는 중복 되었습니다.");

				checkNum = scan.nextInt();

			}

			//사용자가 입력한 번호가 중복되지 않는다면 리스트에 더하기

			user.add(checkNum);

		}

		List<Integer> inter =new ArrayList<>(lotto);

		

		//당첨로또번호 교집합으로 걸러내기

		inter.retainAll(user);

		

		System.out.println("당첨 로또 번호"+inter);

		

		//등수 출력

		if(inter.size()==6) {

			System.out.println("당첨 1등");

		}else if(inter.size()==5 && user.contains(bonus)) {

			System.out.println("당첨 2등");

		}else if(inter.size()==5) {

			System.out.println("당첨 3등");

		}else if(inter.size()==4) {

			System.out.println("당첨 4등");

		}else if(inter.size()==3) {

			System.out.println("당첨 5등");

		}else {

			System.out.println("꽝");

		}

		

		

		

	}

	

}