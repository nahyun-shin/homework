
import java.util.HashMap;
import java.util.Map;

class Friend{
	private int myPoint;
	private Map<String, Integer> toGive = new HashMap<String, Integer>();
	
	public void setMyPoint(int point) {
		this.myPoint +=point;
	}
	public int getMyPoint() {
		return this.myPoint;
	}
	//내가 선물을 준 사람 저장
	public void setToGive(String name) {
		toGive.put(name, toGive.getOrDefault(name, 0)+1);
	}
	
	//내가상대방에게 준 선물 개수
	public int getGiveCount(String name) {
		return toGive.containsKey(name)?toGive.get(name):0;
	}
}

public class Gift {
	public int solution(String[] friends, String[] gifts) {
		//선물을 주고받은 기록 저장
		int answer = 0;
		Map<String, Friend> userMap = new HashMap<String, Friend>();
		for(String me:friends) {
			Friend friend = new Friend();
			for(String gift:gifts) {
				String[] person=gift.split(" ");
				if(me.equals(person[0])) {
					friend.setMyPoint(1);
					friend.setToGive(person[1]);
					
				}else if(me.equals(person[1])) {
					friend.setMyPoint(-1);
				}
			}
			userMap.put(me, friend);
		}
		//비교
		for(String me : userMap.keySet()) {
			//내가 받은 선물 갯수
			int myPresentCount =0;
			//내가 선물 준 애들 정보
			Friend myGiveList =userMap.get(me);
			
			//비교하기 위해서 친구 목록 가져오기
			for(String compare : friends) {
				//중복을 피하기 위해서 나는 제외
				if(me.equals(compare)) {
					continue;
				}
				//비교 대상을 가져온다
				Friend comparePerson = userMap.get(compare);
				//내가 상대방한테 준 선물 개수가 많을 경우
				if(myGiveList.getGiveCount(compare)-comparePerson.getGiveCount(me)>0) {
					myPresentCount++;
				}else if(myGiveList.getGiveCount(compare)-comparePerson.getGiveCount(me)==0) {
					//둘이 동등할 경우 선물지수 를 비교
					if(myGiveList.getMyPoint()> comparePerson.getMyPoint()) {
						myPresentCount++;
					}//선물지수가 상대방과 같거나 작으면 포인트 없음
				}
			}
			
			answer =Math.max(answer, myPresentCount);
			
		}
		return answer;
	}
	
	public static void main(String[] args) {
		String []friends= {"muzi", "ryan", "frodo", "neo"};
		String[]gifts= {"muzi frodo", "muzi frodo", "ryan muzi", "ryan muzi", "ryan muzi", "frodo muzi", "frodo ryan", "neo muzi"};
		
		System.out.println("많이 받은 사람 : " + Gift.solution(friends,gifts));
		
		
	}
}
