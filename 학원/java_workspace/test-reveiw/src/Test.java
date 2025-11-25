

	import java.util.HashMap;
	import java.util.Map;

	public class Test {
	    public static void main(String[] args) {
	        Map<String, Integer> scores = new HashMap<>();

	        // 데이터 추가
	        scores.put("Alice", 90);
	        scores.put("Bob", 85);
	        scores.put("Charlie", 92);

	        // 데이터 조회
	        System.out.println(scores.get("Alice")); // 출력: 90

	        // 값 수정
	        scores.put("Alice", 95);

	        // 존재 여부 확인
	        System.out.println(scores.containsKey("Bob")); // true

	        // 반복
	        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
	            System.out.println(entry.getKey() + ": " + entry.getValue());
	        }

	        // 삭제
	        scores.remove("Charlie");
	    }
	}

