package kr.study.upper;

public class AnimalWorld {

	public static void main(String[] args) {
		Tigger tigger = new Tigger();
		tigger.setMyName("티거");
		tigger.setFood("양고기");
		
		tigger.eating();
		
		Rabbit rabbit = new Rabbit();
		rabbit.setMyName("레빗");
		rabbit.setFood("당근");
		
		rabbit.eating();
	
	}

}
