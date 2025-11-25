package kr.study.obj;

public class StringCompareMain {

	public static void main(String[] args) {
		MyString str01 = new MyString("apple");
		MyString str02 = new MyString("apple");
		
		//객체비교
		
		 System.out.println(str01 == str02);
		 System.out.println(str01.equals(str02));

	}

}
