export class BorrowBook{
    constructor(bookId, bookName, userName, checked) {
        this.bookId=bookId;
        this.bookName=bookName;
        this.userName=userName;
        this.checked=checked;
    }
}

export class Book{
    constructor(id, name,isAbsent) {
        this.id=id;
        this.name=name;
        this.isAbsent=isAbsent;
    }
}