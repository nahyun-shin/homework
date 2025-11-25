package kr.study.array;

public class ArrayCopyTest {

	public static void main(String[] args) {

		//값이 저장되어 있는 위치주소가 있기 때문에 값이 동일하면 다른 변수라고 하더라도 값이 동일하다면 동일한 주소가 나타난다
		//얕은 복사 같은 공간을 바라보게 만드는것, 깊은 복사는 배열에 각각의 공간을 부여하여 독립적인 주소를 가지게 하는것.
		
		int[] arr = {1,2,3};
		int num = 10;
		
		int num02 = num;
		int[] arr02 = arr;
		
		num02 = num02 +10;
		arr02[0]=20;
		
		System.out.println("num = "+num + ", num02="+ num02);
		System.out.println("arr[0] = "+arr[0] + ", arr02[0]="+ arr02[0]);
		
	}

}
