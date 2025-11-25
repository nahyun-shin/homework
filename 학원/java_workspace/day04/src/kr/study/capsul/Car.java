package kr.study.capsul;

public class Car {
	
	private String carName;
	private String price;
	
	public void setCarName(String carName) {
		this.carName = carName; //객체화 된 상태의 car
	}
	
	public String getCarName() {
		return this.carName;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}
	
	//Source -> Generate getter and setter -> 확인 
	//(이클립스로 getter and setter를 자동으로 만들어 줄 수 있음)
	//*주의할점-> 클래스 안쪽에 커서를 두고 만들어야함
	//값을 받고 주기 위해 필요에 의해서 선언하는 것으로 의무사항이 아닌 선택사항이다.
}
