package kr.study.array;

import java.util.Arrays;

public class ArrayCopyTest02 {

	public static void main(String[] args) {
		// 배열을 독립적인 공간으로 만들어 복사하는 방법
		int[] card = {1,3,4,5,6,10};
		int[] newCard = new int[card.length];
		
		//복사!(원본, 원본시작위치, 복사할대상, 복사할대상의 시작위치, 복사할길이)
		System.arraycopy(card, 0, newCard, 0, card.length);
		newCard[0] = 11;
		
		System.out.println("원본  : "+ Arrays.toString(card)); //배열에 들어가 있는 값을 문자화 해서 출력을 도와줌
		System.out.println("복사본  : "+ Arrays.toString(newCard));
	}

}
