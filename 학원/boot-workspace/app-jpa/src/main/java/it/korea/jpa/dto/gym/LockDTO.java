package it.korea.jpa.dto.gym;

import it.korea.jpa.entity.gym.LockEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class LockDTO {

    private int locNum;
    private int numbers;
    private String useYn;

    // Entity -> DTO 변환
    public static LockDTO of(LockEntity entity) {
        return LockDTO.builder()
            .locNum(entity.getLocNum())
            .numbers(entity.getNumbers())
            .useYn(entity.getUseYn())
            .build();
    }

    // DTO -> Entity 변환
    public static LockEntity to(LockDTO dto) {
        LockEntity entity = new LockEntity();
        entity.setLocNum(dto.getLocNum());
        entity.setNumbers(dto.getNumbers());
        entity.setUseYn(dto.getUseYn());
        return entity;
    }
}
