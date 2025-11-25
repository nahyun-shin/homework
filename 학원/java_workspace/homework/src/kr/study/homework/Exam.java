package kr.study.homework;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Exam {

	public static void main(String[] args) {
		List<Integer> list = new ArrayList<Integer>();
		Random rand = new Random();
		
		for(int i =0; i<10; i++) {
			list.add(rand.nextInt(50)+1);
		}
		
		
		System.out.println("리스트 값 : "+list);
		
		
		
		
		
	}

}
