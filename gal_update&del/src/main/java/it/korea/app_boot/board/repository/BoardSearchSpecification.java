package it.korea.app_boot.board.repository;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;


import it.korea.app_boot.board.dto.BoardSearchDTO;
import it.korea.app_boot.board.entity.BoardEntity;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import java.util.ArrayList;

public class BoardSearchSpecification implements Specification<BoardEntity>{
    
    private BoardSearchDTO searchDTO;
    public BoardSearchSpecification(BoardSearchDTO searchDTO){
        this.searchDTO = searchDTO;
        
    }
    /**
     *
     * @param root  비교대상 > entity
     * @param query sql 조작
     * @param cb    where 조건
     * @return
     */
    @Override
    public Predicate toPredicate(Root<BoardEntity> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        List<Predicate> predicates = new ArrayList<>();


        String likeText = "%" + searchDTO.getSchText() +"%";

        // query 파라미터는 잘 안씀
        // service단 또는 pageable 에서 이미 정렬 또는 페이징 처리 하기 때문
        // 여기서 추가로 조작하면 복잡도 상승. 오류 시 유지보수가 어려워짐
        //
        // query.distinct(true);
        // query.groupBy(root.get("title"));
        // query.orderBy(cb.desc(root.get("createDate")));

        if("title".equals(searchDTO.getSchType())){
            predicates.add(cb.like(root.get("title"), likeText)); //title like %도전%
            
        }else if("writer".equals(searchDTO.getSchType())){
            predicates.add(cb.like(root.get("writer"), likeText));

        }
        return andTogether(predicates, cb);
    }
    private Predicate andTogether(List<Predicate> predicates, CriteriaBuilder cb){
        return cb.and(predicates.toArray(new Predicate[0]));
    }

    

}
