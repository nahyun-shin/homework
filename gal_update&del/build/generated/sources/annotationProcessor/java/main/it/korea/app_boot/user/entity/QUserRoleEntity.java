package it.korea.app_boot.user.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QUserRoleEntity is a Querydsl query type for UserRoleEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserRoleEntity extends EntityPathBase<UserRoleEntity> {

    private static final long serialVersionUID = -1838682141L;

    public static final QUserRoleEntity userRoleEntity = new QUserRoleEntity("userRoleEntity");

    public final it.korea.app_boot.common.entity.QBaseEntity _super = new it.korea.app_boot.common.entity.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createDate = _super.createDate;

    public final StringPath roleId = createString("roleId");

    public final StringPath roleName = createString("roleName");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updateDate = _super.updateDate;

    public final StringPath useYn = createString("useYn");

    public QUserRoleEntity(String variable) {
        super(UserRoleEntity.class, forVariable(variable));
    }

    public QUserRoleEntity(Path<? extends UserRoleEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUserRoleEntity(PathMetadata metadata) {
        super(UserRoleEntity.class, metadata);
    }

}

