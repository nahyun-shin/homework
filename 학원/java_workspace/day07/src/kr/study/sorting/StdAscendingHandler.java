package kr.study.sorting;

import java.util.Comparator;

public class StdAscendingHandler implements Comparator<Student2> {

	@Override
	public int compare(Student2 me, Student2 next) {
		return me.getScore()> next.getScore() ? 1:-1;
	}
	
}
