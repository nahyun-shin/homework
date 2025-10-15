package it.back.back_app.book.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;

import it.back.back_app.common.domain.BaseEntity;
import it.back.back_app.common.utils.YesNoToBooleanConverter;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name ="book_image")
public class BookImageEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int imgId;
    private String fileName;
    private String storedName;
    private String filePath;
    
    @Column( columnDefinition = "CHAR(1)")
    @Convert(converter = YesNoToBooleanConverter.class)
    private Boolean mainYn;

    @Column(updatable = false)
    private LocalDateTime createDate;

    
    @ManyToOne
    @JoinColumn(name = "book_id")
    private BookEntity book;
}
