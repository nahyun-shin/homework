class Todo{
    constructor(id, contents, checked, isDone){
        this.id = id;
        this.contents =contents;
        this.checked=checked;
        this.isDone=isDone;
    }
}
//자바스크립트에서는 외부에서 쓰려면 꼭 export해줘야함
export default Todo;