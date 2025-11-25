package kr.study.loop;

public class DoubleLoopTest05 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		/*
		 * 
		 */
		for (int i=0; i<7; i++) {
			//공백
			for(int j=0; j<(7-i); j++) {
				System.out.print(" ");
			}
			//별찍기
			for(int k=0; k<(i+1); k++) {
				System.out.print("*");
			}
			
			System.out.println();
		}
		
		

	}

}
