
import java.util.*;

class Solution {
    public int solution(String[] friends, String[] gifts) {
        
        Map<String, Integer> map = new HashMap<>();
        
        //친구리스트를 단순히 index로 불러오기 위해 map사용
        for (int i = 0; i < friends.length; i++) {
            map.put(friends[i], i);
        }
        //총 합계점수
        int[] totalExc = new int[friends.length];
        //총 주고 받은 내역 2차배열로 표형식으로 표현
        int[][] transaction = new int[friends.length][friends.length];
        
        
        //총합계점수와 표를 만들기
        for(String g:gifts) {
        	//띄어쓰기를 구분하여 배열에 넣기
        	String[] giveList = g.split(" ");
        	//준사람과 받은사람에게 각각 점수매겨서 총점수 구하기
        	//준사람에 해당한느 배열의 값을 +1
        	totalExc[map.get(giveList[0])]++;
        	//받은사람에 해당하는 배열의 값을 -1
        	totalExc[map.get(giveList[0])]--;
        	//표는 준것만이 표현되면 됨
        	//a가 b에게 준 걸 표시
        	transaction[map.get(giveList[0])][map.get(giveList[0])]++;	
        }
        
        //가장 큰 점수 비교
        int answer=0;
        for(int i=0; i<friends.length; i++) {
        	int count=0;
        	for(int j=0; j<friends.length; j++) {
        		//행열이 같다면 loop 건너뛰기
        		if(i==j) continue;
        		//a가 b에게 준 선물 갯수가 b가 a에게 준 갯수보다 크다면 +1
        		if(transaction[i][j]>transaction[j][i]) count++;
        		//만약 ab가 주고받은 선물갯수가 같다면 a와 b각각의 선물점수로 비교해서 count+1 
        		else if(transaction[i][j]==transaction[j][i]&&totalExc[i]>totalExc[j]) {
        			count++;
        		}
        	}
        	answer=Math.max(count, answer);
        	
        }
        return answer;
        
        

       
       
    }
}
