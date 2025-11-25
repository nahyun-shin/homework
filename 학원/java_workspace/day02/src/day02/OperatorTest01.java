package day02;

public class OperatorTest01 {

	public static void main(String[] args) {
		byte b01 =10;
		byte b02 =20;
		int  i01 =10;
		int i02 =30;
		long lv01 =10;
		double dv01 =30;
		
		//int 이하 타입끼리의 연산결과 값의 데이터 타입은 무조건 int
		//byte sum = b01 + b02;
		int sum = b01+ b02;
		
		//연상대상에서 테이터 타입이 int 이상인 것들이 있을 경우 그것 들 중 제일 큰 타입이 결과의 데이터 타입
		//int intSum = i01 + lv01 + b01;
		long lvSum = i01 + lv01 + b01;
		
		System.out.println(sum);
		System.out.println(lvSum);
		
	}

}
