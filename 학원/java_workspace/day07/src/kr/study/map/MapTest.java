package kr.study.map;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class MapTest {

	public static void main(String[] args) {
		Map<String, Integer> map = new HashMap<>();
		
		//등록
		map.put("one", 1);
		map.put("two", 2);
		map.put("three", 3);
		map.put("four", 4);
		map.put("five", 5);
		map.put("six", 6);
		
		//중간 삽입 X - index가 없어서 안됨
		
		//키 중복에 의한 치환
		map.put("one", 10);
		
		//키가 존재하는지 확인
		System.out.println("is there Two in Key : "+ map.containsKey("two"));
		System.out.println("is there Ten in Key : "+ map.containsKey("ten"));
		
		//값의 유무 확인
		System.out.println("is there 11 in value : "+ map.containsValue(11));
		System.out.println("is there 3 in value : "+ map.containsValue(3));
		
		//출력
		//Key를 이용해서 출력
		
		Set<String> keySets = map.keySet();
		
		for(String key : keySets) {
			System.out.println("key : "+key+", value : "+map.get(key));
		}
		
	}

}
