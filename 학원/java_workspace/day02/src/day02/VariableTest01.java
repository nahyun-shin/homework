package day02;

public class VariableTest01 {

	public static void main(String[] args) {
		//변수의 선언
		//데이터 타입 변수명 = 값;
		//초기값을 부여하여 만드는 것을 추천
		int num01 =0;
		char ch = '\0';
		long num02 = 0;
		String str = "";
		//String은 C언어로 만들어져서 그 기준으로 첫문자가 대문자이며 class와 문자열을 동시에 가지고 있음
		boolean isTrue = true;
		
		//문자는 ascii code 표로 인하여 정수와 대응 가능
		char alpha = 'A';
		int alphaValue = alpha;
		
		System.out.println(alpha +" : "+alphaValue);
		//강제 형변환의 실제 쓰임 중 하나
		System.out.println(alpha +" : "+(int)alpha);
		
		
		//java는 max 데이터 타입으로 읽음.
		// 1 + 2 + 3 = 6
		//int byte byte = int
		//duble int int = duble
	}

}
