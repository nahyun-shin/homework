package it.back.back_app.book.entity;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.ColumnDefault;

import it.back.back_app.common.domain.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name ="books")
public class BookEntity extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookId;             // 책 ID
    private String publisher;       // 출판사
    private LocalDate pubDate;      // 출판일
    private String title;           // 제목
    private String subTitle;        // 부제목
    private String writer;          // 저자
    private String content;         // 내용
    private int bookQty;            // 수량
    private int price;              // 가격

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private BookCategoryEntity category;

    @Column(name = "sales_count", nullable = false)
    private int salesCount = 0;        // 판매량

    @Column( columnDefinition = "CHAR(1)")
    @ColumnDefault("Y")
    private String showYn;          // 표시여부
    @Column( columnDefinition = "CHAR(1)")
     @ColumnDefault("N")
    private String stockYn;         // 품절여부 
    @Column( columnDefinition = "CHAR(1)")
     @ColumnDefault("N")
     private String bannerYn;       //배너표시여부
    


    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<BookImageEntity> fileList = new HashSet<>();


    //이미지추가
    public void addFiles(BookImageEntity entity) {
        if(fileList == null) this.fileList = new HashSet<>(); 
        entity.setBook(this);
        fileList.add(entity);
    }

    public void increasePurchaseCount(int quantity) {
    this.salesCount += quantity;
}

}
