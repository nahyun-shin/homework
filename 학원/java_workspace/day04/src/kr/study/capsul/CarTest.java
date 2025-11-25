package kr.study.capsul;

public class CarTest {

	public static void main(String[] args) {
		
		Car car = new Car();
		car.setCarName("그랜져");
		car.setPrice("5000만원");
		
		System.out.println("이름 :"+car.getCarName()+", 가격 : "+car.getPrice());
	}

}
