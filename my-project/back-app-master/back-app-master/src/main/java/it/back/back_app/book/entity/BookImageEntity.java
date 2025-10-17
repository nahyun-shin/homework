package it.back.back_app.book.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;

import it.back.back_app.common.domain.BaseEntity;
import it.back.back_app.common.utils.YesNoToBooleanConverter;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "book_image")
public class BookImageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "img_id")
    private Integer imgId;

    @Column(name = "file_name", nullable = false)
    private String fileName;

    @Column(name = "stored_name", nullable = false)
    private String storedName;

    @Column(name = "file_path", nullable = false)
    private String filePath;

    // 대표 이미지 여부 Y/N → Boolean으로 변환
    @Column(name = "main_yn", columnDefinition = "CHAR(1)")
    @Convert(converter = YesNoToBooleanConverter.class)
    private Boolean mainYn = false;

    // 생성일
    @Column(name = "create_date", updatable = false)
    private LocalDateTime createDate;

    // 수정일
    @Column(name = "update_date")
    private LocalDateTime updateDate;

    // 책과 N:1 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private BookEntity book;

    // 자동으로 createDate/ updateDate 설정
    @PrePersist
    protected void onCreate() {
        this.createDate = LocalDateTime.now();
        this.updateDate = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updateDate = LocalDateTime.now();
    }
}
