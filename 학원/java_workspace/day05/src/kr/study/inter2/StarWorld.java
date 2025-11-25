package kr.study.inter2;

public class StarWorld {

	public static void main(String[] args) {
		Marine m1 = new Marine();
		m1.setUnitName("마린1");
		m1.setHp(200);
		m1.setX(0);
		m1.setY(0);
		
		Marine m2 = new Marine();
		m2.setUnitName("마린2");
		m2.setHp(200);
		m2.setX(0);
		m2.setY(0);
		
		m1.attack(m2);
		m1.move(100, 100);
		
		m2.move(100, 100);
		m2.attack(m1);
		
	}

}
