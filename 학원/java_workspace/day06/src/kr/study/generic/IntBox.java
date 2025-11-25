package kr.study.generic;

public class IntBox {
	private int[] box;
	private int size;
	
	public IntBox() {
		box = new int[10];
	}
	
	public void add(int val) {
		if(box.length == size) {
			int[] newBox = new int[box.length*2];
			System.arraycopy(box, 0, newBox, 0, box.length); //배열복사
			//박스 교체
			box = newBox;
		}
		box[size++] = val;
	}
	
	public int get (int index) {
		return box[index];
	}
	public int size () {
		return size;
	}
	
}
