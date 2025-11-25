package kr.study.loop;

public class DoubleLoopTest02 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		for(int i=1; i <10; i++) {
			for(int j=2; j<10; j++) {
				System.out.print(j+"X"+i+"="+(i*j)+"\t");
			}
//			줄을 바꾼다
			System.out.println();
		}
	}

}
