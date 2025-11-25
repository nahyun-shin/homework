package kr.study.inter;

public class LGRemote implements RemoteControl{

	@Override
	public void turnOn() {
		System.out.println("사랑해요 LG");
		
	}

	@Override
	public void turnOff() {
		System.out.println("Goodbye LG");
		
	}

}
