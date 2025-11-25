package kr.study.sorting;

import java.util.Arrays;

public class StdArraySortMain2 {

	public static void main(String[] args) {
		
		Student2 st1 = new Student2("김철수", 90);
		Student2 st2 = new Student2("박민수", 97);
		Student2 st3 = new Student2("이정민", 88);
		
		
		Student2[] stArray = new Student2[3];	

		stArray[0] = st1;
		stArray[1] = st2;
		stArray[2] = st3;
		
		Arrays.sort(stArray, new StdAscendingHandler());

		
		//출력
		for(Student2 st : stArray) {
			System.out.println("이름 : "+ st.getMyName()+" 점수 : "+st.getScore());
		}

		
		
	}

}
