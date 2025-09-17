package it.korea.app_boot.gallery.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QGalleryEntity is a Querydsl query type for GalleryEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGalleryEntity extends EntityPathBase<GalleryEntity> {

    private static final long serialVersionUID = -1445766051L;

    public static final QGalleryEntity galleryEntity = new QGalleryEntity("galleryEntity");

    public final it.korea.app_boot.common.entity.QBaseEntity _super = new it.korea.app_boot.common.entity.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createDate = _super.createDate;

    public final StringPath fileName = createString("fileName");

    public final StringPath filePath = createString("filePath");

    public final StringPath fileThumbName = createString("fileThumbName");

    public final StringPath nums = createString("nums");

    public final StringPath storedName = createString("storedName");

    public final StringPath title = createString("title");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updateDate = _super.updateDate;

    public final StringPath writer = createString("writer");

    public QGalleryEntity(String variable) {
        super(GalleryEntity.class, forVariable(variable));
    }

    public QGalleryEntity(Path<? extends GalleryEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QGalleryEntity(PathMetadata metadata) {
        super(GalleryEntity.class, metadata);
    }

}

