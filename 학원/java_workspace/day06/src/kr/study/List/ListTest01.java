package kr.study.List;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

public class ListTest01 {

	public static void main(String[] args) {
		
		//List 계열은 모두 List 인터페이스를 상속하여 구현한 애들이라서
		//객체를 선언 시에 부모인 List 타입으로 선언 하는 것이 일반적
		
		List<Integer> list = new ArrayList<>(); //결합도를 낮춰 수정범위가 적게 하는 것이 실무적으로 용이 class =class보다 class =interface
		
		Random rand = new Random();
		
		
		//등록 --add(value) / add(index, value);
		
		for (int i =0; i<10; i++) {
			int val =rand.nextInt(50)+1;
			list.add(val);
			//list.add(i, val);
		}
		
		//출력
		System.out.println("리스트 : "+list+", 크기 : "+list.size());
		
		//중간 삽입 - 속도는 느림
		list.add(0,60);
		//값변경
		list.set(4, 44);
		System.out.println("리스트 : "+list+", 크기 : "+list.size());
		//삭제
		list.remove(5);
		list.remove(6);
		System.out.println("리스트 : "+list+", 크기 : "+list.size());
		
		//출력
		for(int i=0; i<list.size(); i++) {
			System.out.println(list.get(i)+", ");
		}
		
		System.out.println();
		
		//향상된 for문 - foreach
		//map은 못씀
		for(int val : list) {
			System.out.println(val + ", ");
		}
		
		//iterator 라는걸 이용
		/*
		 * interator 는 collection framework 계열 내부에 존재하는 커서 같은것
		 * 자료구조를 순회 하면서 데이터가 있는지 검색하고 있으면 하나씩 반환해줌.
		 */
		Iterator<Integer> iter = list.iterator();
		
		//현재위치 다음에 데이터가 존재하는지 확인
		//있다면 true 없다면 현재 위치가 마지막이고 false 리턴
		while(iter.hasNext()) {
			//다음 위치로 이동하여 값을 반환
			int val = iter.next();
			System.out.println(val+",");
		}
	}

}
