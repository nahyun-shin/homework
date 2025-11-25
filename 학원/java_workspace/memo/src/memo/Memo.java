
  
  함수 객체 메서드 생성자
  
  생성자를 통해서 자식 클래스를 빌드하게됨
  
  
  부모가 물려준 메서드를 변경해야할때 오버라이드
  
  #####
  
  #####추상화(abstract)#####
  
  
  
  #####인터페이스(interface)######
  
  interface는 무조건 public
  
  인터페이스란 뼈대, 또는 구조의 의미를 지닙니다. 클래스간의 상속은 확장의 개념 또는 다형성을 위한 상속이라면, 인터페이스의 상속은 기능
  구현에 초첨을 맞추고 있습니다.
  
  물론 기본적인 상속의 개념. 타입을 물려주거나, 변수나 메서드의 상속 기능은 유지됩니다.
  
  인터페이스의 특징
  
  1. 객체선언 불가 a. 이유는 생성자가 없다. b. 멤버 변수/ 멤버 메서드를 가질 수 없음 c. 상수는 가질 수 있음(static
  final ...)
  
  2. 기본적으로 가질 수 있는 메서드는 전부 추상화 메서드 a. jdk 1.8에서 default 메서드 생김(구현된 메서드) b. jdk
  1.9에서 static 메서드 생김(..왜 이제서야..) - util성 메서드들 모아 넣으려고
  
  3. 인터페이스는 기능 상속을 위한 게 커서, 다중상속 가능 a. 클래스vs인터페이스 다중 상속 가능 b. 인터페이스vs인터페이스 다중
  상속 가능
  
  
  인터페이스 선언
  
  public interface A{ }
  
  
  
  인터페이스의 상속
  
  public class A implements B{ }
  
  
  #class = class -extends (같은 종족일때 #class != interface -implements (다른 종족일때
  
  
  
  인터페이스는 다중 상속이 가능하다
  
  public class A implements B,C{ } public interface A extends B,C{ }
  
  
  
  ######내부 클래스#####
 
  내부클래스는 쉽게 말해서 클래스 안에 또 다른 클래스를 삽입하는 것 입니다. 위치에 따라서 인스턴스 내부 클래스, 정적 내부클래스,
  지역클래스로 나눌 수 있습니다.
 
  인스턴스- 외부클래스의 멤버 변수와 같은 위치에 선언합니다. 주로 외부 클래스의 멤버 변수와 관련된 작업에 사용될 목적으로 선언됩니다.
  정적 클래스 - 외부클래스의 클래스 변수와 같이 static 키워드가 부여됩니다. 지역 클래스 - 외부 클래스의 메서드 내부에서 선언하여
  사용합니다. 메서드 영역에서 선언되기 때문에 메서드 내부에서만 사용할 수 있습니다.
 
 
 
 
  인스턴스클래스 (Outer에 ) public class Outer{ private String name; //... public class
  Inner { private String name; //... } } -----클래스 컴파일 시 모양 Outer.class
  Outer$Inner.class
 
 
  -----인스턴스 내부 클래스 선언 Outer out = new Outer(); //바깥쪽 클래스 선언 Outer.Inner inner =
  out.new Inner(); //바깥쪽 인스턴스를 이용한 안쪽 클래스 선언
 
  -----만약 실제로 사용한다면
 
  public class Inner { private String name; //... }
 
  public class Outer{ ..... private Inner inner;
 
  public Outer(){ inner = new inner
 
  -----정적(static) 내부 클래스
  
  public class Outer{ private String name; //... public static class Inner {
  private String name; //... } }
  
  
  -----정적 내부클래스 선언 Outer.Inner inner = new Outer.Inner();
  
  -----정적 내부 클래스 사용2
  
  
  ----- 메서드 내에서 클래스를 생성하는 건 실무에서 사용하지 않음
 
  #####익명 클래스 또는 일회용 클래스(추상화, 인터페이스)#####
 
  익명 클래스는 말 그대로 이름이 없는 클래스를 의미합니다. 보통 추상화 메서드를 지닌 객체는 생성자를 통한 객체화가 불가능 하지만, 가지고
  있는 추상화메서드들 구현하면서 클래스 생성이 가능합니다.
 
  interface ButtonClickListener{ public void click(); }
 
  public class AnonymousExample { public static void main(String[] args) {
  ButtonClickListener click = new ButtonClickListener (){
  
  @Override public void click(){ 클릭이라는 버튼을 일회용으로 사용하기위해 익명클래스를 사용하여 구현(상속을 시키지
  않고 단순히 클릭을 위해) ..... } }; } }
 
  -----함수형 인터페이스 익명 클래스를 좀 더 간결하게 사용하기 위해서 태어남 interface ButtonClickListener{
  public void click(); } 해당 인터페이스는 실제로 여러개의 추상화 메서드를 가질 수 있음 그러나 함수형 인터페이스로
  선언하면 1개의 추상화 메서드만 가질 수 있음
  
  @FunctionalInterface interface ButtonClickListener{ public void click(); }
  
  생성자가 없으면 객체선언x
  
  @FunctionalInterface를 붙이면 1개의 추상화 메서드만 가질 수 있는 함수형 인터페이스가 된다. 단, 익명클래스로 만들 때
  구현이 필요 없는 default 메서드나ㅏ static 메서드는 신경 쓰지 않는다. 오로지 추상화 메서드의 개수로 판별
  
  
 