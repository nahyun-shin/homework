package back.smart.code.common.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "tb_books_files", schema = "smart_db")
public class BooksFileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bf_id", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "bk_code", nullable = false)
    private BooksEntity bkCode;

    @Size(max = 255)
    @NotNull
    @Column(name = "bf_name", nullable = false)
    private String bfName;

    @Size(max = 255)
    @NotNull
    @Column(name = "thumb_name", nullable = false)
    private String thumbName;

    @Size(max = 255)
    @NotNull
    @Column(name = "file_path", nullable = false)
    private String filePath;

    @ColumnDefault("1")
    @Column(name = "orders")
    private Integer orders;

    @ColumnDefault("current_timestamp()")
    @Column(name = "create_at")
    private Instant createAt;

    @Column(name = "update_at")
    private Instant updateAt;

}