package kr.study.sorting;//일반 정수일 때에 향상된 for문과 sort를 사용하여 정렬

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class StdSortMain1 {

	
	public static void main(String[] args) {
		
		Student st1 = new Student("김철수", 90);
		Student st2 = new Student("박민수", 97);
		Student st3 = new Student("이정민", 88);
		
		
		List<Student> list = new ArrayList<>();
		
		list.add(st1);
		list.add(st2);
		list.add(st3);
		
		Collections.sort(list);//정렬
		
		//출력
		for(Student st : list) {
			System.out.println("이름 : "+ st.getMyName()+" 점수 : "+st.getScore());
		}
		
		
	}

}
