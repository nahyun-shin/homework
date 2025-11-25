package it.korea.jpa.service.gym;

import java.util.Optional;

import org.springframework.stereotype.Service;

import it.korea.jpa.dto.gym.MembersDTO;
import it.korea.jpa.entity.gym.LockEntity;
import it.korea.jpa.entity.gym.MembersEntity;
import it.korea.jpa.repository.gym.LockRepository;
import it.korea.jpa.repository.gym.MembersRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {


    private final MembersRepository memRepository;
    private final LockRepository lockRepository;

    @Transactional
    public int newMembers(MembersDTO dto) throws Exception{
        //아이디, 이름, 락커번호
        /**
         * Optional 은 특정 객체를 담는 컨테이너
         * 데이터 베이스 또는 로직으로 부터 얻는 객체가 비어 있거나,
         * 정상적이지 않을 떄 , 개발자가 처리할 수 있도록 만든 상자
         * null 로 인한 오류를 방지하기 위한 장치
         */
        Optional<LockEntity> lock =  lockRepository.findById(dto.getLocNum());

        //있는지 확인
        if(!lock.isPresent() ||lock.get().getUseYn().equals("Y")){
            throw new RuntimeException("사물함이 없거나 점유 중");
        }

        //사물함 Y로 변경
        LockEntity lockEntity = lock.get(); //엔티티만 주세요
        lockEntity.setUseYn("Y"); //트랜잭션 안에서 entity 변경 시 자동으로 update
        
        MembersEntity membersEntity = MembersDTO.to(dto);
        memRepository.save(membersEntity);

        return membersEntity.getLocNum();
    }
}
