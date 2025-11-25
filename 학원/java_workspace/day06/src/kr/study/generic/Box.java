package kr.study.generic;

public class Box<T> {
	
	private Object[] box;
	private int size;
	
	public Box() {
		box = new Object[10];
	}
	
	public void add(T val) {
		if(box.length == size) {
			Object[] newBox = new Object[box.length*2];
			System.arraycopy(box, 0, newBox, 0, box.length); //배열복사
			//박스 교체
			box = newBox;
		}
		box[size++] = val;
	}
	
	public T get (int index) {
		return (T)box[index];
	}
	public int size () {
		return size;
	}
	
}
