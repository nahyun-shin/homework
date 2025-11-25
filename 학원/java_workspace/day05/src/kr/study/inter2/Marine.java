package kr.study.inter2;

public class Marine extends GroundUnit {
	
	private int power = 50;
	
	@Override
	public void attack(Unit enermy) {
		Marine m = null;
		if(enermy instanceof Marine) {
			m = (Marine)enermy;
		}
		if(m.getHp() <= power) {
			System.out.println(m.getUnitName()+"파괴");
			enermy = null;
		}else {
			System.out.println("공격으로 인한"+m.getUnitName()+"hp 50감소");
			m.setHp(m.getHp()-power);
			
		}
	}

	@Override
	public void move(int x, int y) {
		System.out.println(this.getX() +", "+this.getY()+" 에서 "+x+","+y+"으로 이동");
		
		this.setX(x);
		this.setY(y);
		
	}
	
}
