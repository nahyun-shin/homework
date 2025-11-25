package kr.study.sorting;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class StdArraySortMain {

	public static void main(String[] args) {

		Student st1 = new Student("김철수", 90);
		Student st2 = new Student("박민수", 97);
		Student st3 = new Student("이정민", 88);



		Student[] stArray = new Student[3];	

		stArray[0]=(st1);
		stArray[1]=(st2);
		stArray[2]=(st3);

		Arrays.sort(stArray);

		//출력
		for(Student st : stArray) {
			System.out.println("이름 : "+ st.getMyName()+" 점수 : "+st.getScore());
		}


	}

}
