package kr.study.list;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ListExam {

	public static void main(String[] args) {
		
		
		//수정불가
		//List<Integer> list = List.of(1,10,11,23,14);
		
		//수정안됨 > 배열 타입으로 만들어져서 크기 고정
		//추가안됨 , 삭제 안됨, 수정(치환가능)
		//List<Integer> list = Arrays.asList(1,2,4,10,11,20);
		
		//이건된다
		//숫자들은 배열로 되어있는걸 ArrayList에 복사해서 넣은것
		List<Integer> list = new ArrayList<>(Arrays.asList(1,2,4,10,11,20));
		
		//list.add(1);
		System.out.println(list);
		

	}

}
