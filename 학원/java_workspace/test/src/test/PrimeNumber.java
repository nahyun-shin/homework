package test;

import java.util.ArrayList;
import java.util.List;

public class PrimeNumber {
	
	
	


	//소수인지 판별
	public static boolean isPrime(int n) {
		//2보다 작다면 소수가 아님
        if (n < 2) return false;
        //나누어 떨어진다면 소수가 아님
        for (int i = 2; i <= (int)Math.sqrt(n); i++) {
            if (n % i == 0) return false;
        }
        //위의 내용을 부합하면 소수
        return true;
    }
	
	
	
	
	//리스트 배열에 소수인 값만 리스트에 넣기
	public static List<Integer> chackPrime() {
		List<Integer> prime = new ArrayList<>();
		//2~100까지 loop
		for (int i = 2; i <= 100; i++) {
			//만약 loop로 들어가는 (i)자리의 숫자가 isprime 객체메서드에서
			//참이면 값을 받아 불러오고 출력
			if (isPrime(i)) {
				prime.add(i);
			}
		}
		return prime;
	}
	
	
	
	
	//출력
	public static void main(String[] args) {
		
		//for문에서 100까지의 조건을 주어 따로 숫자입력x
		//chckprime에 리턴받은 값을 primeList에 넣기
		List<Integer> primeList = chackPrime();
		//리스트 출력
		System.out.println(primeList);
		
	}


}
