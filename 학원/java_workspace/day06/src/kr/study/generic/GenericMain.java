package kr.study.generic;

public class GenericMain {

	public static void main(String[] args) {
		IntBox intBox = new IntBox();
		intBox.add(10);
		intBox.add(20);
		intBox.add(40);
		
		
		for(int i=0; i< intBox.size(); i++) {
			System.out.println(intBox.get(i));
		}
		
		Box<Double> doubleBox = new Box<>();
		
		doubleBox.add(30.11);
		doubleBox.add(10.21);
		doubleBox.add(8.95);
		
		for(int i = 0; i< doubleBox.size(); i++) {
			System.out.println(doubleBox.get(i));
		}
		
		Box<String> strBox = new Box<>();
		
		strBox.add("안녕");
		strBox.add("나는 문자");
		strBox.add("곧 끝나");
		
		for(int i= 0; i<strBox.size(); i++) {
			System.out.println(strBox.get(i));
		}
		
	}

}
