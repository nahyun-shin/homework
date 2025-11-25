package kr.study.str;

public class StringBuilderTest {

	public static void main(String[] args) {
		/*
		 * 긴문장을 만들 때 사용
		 * 2~3 번 정도 문자열 합칠때에는 그냥 + 로 합치는게 났다.
		 * 그외에 긴 문장을 이어붙일 때 사용
		 * 예전에는 StringBuilder 를 우선적으로 사용했으나
		 * StringBuffer를 사용해도 무방
		 * 차이는 StringBugger 가 비동기통신에서 데이터 동기화 기능을 소유 (아직 뭔지 몰라도 됨)
		 */
		
		
//		StringBuilder sb = new StringBuilder();
//		
//		//append는 문자열을 붙이는 역할. 줄바꿈 기능은 없음
//		sb.append("오늘 날씨가 덥습니다");
//		sb.append(" 더위 조심하세요.\n");
//		sb.append("점심에 뭐먹지?");
//		
//		System.out.println(sb);
//		
//		sb.insert(11, "\n");
//		System.out.println("------------");
//		System.out.println(sb);
//		
//		System.out.println("------------");
//		sb.delete(0, 12);
//		System.out.println(sb);
		
		
		StringBuilder sb = new StringBuilder();
		
		sb.append("오늘은 날씨가 덥습니다.");
		sb.append("비도 온다고 하네요.");
		sb.append("우산챙기시길 바랍니다.");
		
		
		
		
		
	}

}
