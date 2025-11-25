package kr.study.loop;

public class DoubleLoopTest04 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
/*		for (int i=7; i>0; i--) {
			for (int j=i; j>0; j--) {
				System.out.print("*");
			}
			
			System.out.println();
		}*/
		
		for (int i=0; i<7; i++) {
			for (int j=0; j<(7-i); j++) {
				System.out.print("*");
			}
			System.out.println();
		}

	}

}
