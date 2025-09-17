package it.korea.app_boot.board.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBoardFileEntity is a Querydsl query type for BoardFileEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBoardFileEntity extends EntityPathBase<BoardFileEntity> {

    private static final long serialVersionUID = -1753190343L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBoardFileEntity boardFileEntity = new QBoardFileEntity("boardFileEntity");

    public final NumberPath<Integer> bfId = createNumber("bfId", Integer.class);

    public final QBoardEntity board;

    public final DateTimePath<java.time.LocalDateTime> createDate = createDateTime("createDate", java.time.LocalDateTime.class);

    public final StringPath fileName = createString("fileName");

    public final StringPath filePath = createString("filePath");

    public final NumberPath<Long> fileSize = createNumber("fileSize", Long.class);

    public final StringPath storedName = createString("storedName");

    public QBoardFileEntity(String variable) {
        this(BoardFileEntity.class, forVariable(variable), INITS);
    }

    public QBoardFileEntity(Path<? extends BoardFileEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBoardFileEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBoardFileEntity(PathMetadata metadata, PathInits inits) {
        this(BoardFileEntity.class, metadata, inits);
    }

    public QBoardFileEntity(Class<? extends BoardFileEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.board = inits.isInitialized("board") ? new QBoardEntity(forProperty("board")) : null;
    }

}

