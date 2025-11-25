package kr.study.set;

import java.util.HashSet;
import java.util.Set;

public class SetTest {

	public static void main(String[] args) {

		Person p1 = new Person("p101","김철수");
		Person p2 = new Person("p101","김철수");
		Person p3 = new Person("p102","김철수");
		Person p4 = new Person("p103","이미자");
		
		Set<Person> set = new HashSet<>();
		
		//등록
		
		set.add(p1);
		set.add(p2);
		set.add(p3);
		set.add(p4);
		
		//중간삽입 X, 치환 X
		
		//삭제 remove(객체 또는 값);
		set.remove(p1);
		
		
		System.out.println("크기 : "+ set.size());
		
		
		//향상된 for문
		for(Person p : set) {
			System.out.println(p);
		}
		
		
		
	}

}
