package it.korea.app_boot.user.repository;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

import it.korea.app_boot.admin.dto.AdminUserSearchDTO;
import it.korea.app_boot.board.dto.BoardSearchDTO;
import it.korea.app_boot.board.entity.BoardEntity;
import it.korea.app_boot.user.entity.UserEntity;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class UserSearchSpecification implements Specification<UserEntity>{

    private AdminUserSearchDTO searchDTO;

    public UserSearchSpecification( AdminUserSearchDTO searchDTO) {
        this.searchDTO = searchDTO;
    }

    /*
     * root:  비교대상 > entity >> jpa 가 만들어서 넣어줌 
     * query:  sql 조작 
     * cb  : where 조건 
     */
    @Override
    public Predicate toPredicate(Root<UserEntity> root, CriteriaQuery<?> query, CriteriaBuilder cb) {

         List<Predicate> predicates = new ArrayList<>();


        if(StringUtils.isNotBlank(searchDTO.getSearchText())){
            String likeText = "%"+ searchDTO.getSearchText()+"%";
            Predicate userIdPredicate = cb.like(root.get("userId"), likeText);
            Predicate userNamePredicate = cb.like(root.get("userName"), likeText);
    
             predicates.add(cb.or(userIdPredicate, userNamePredicate));   // title like %도전%
        }

        
        // delYn 조건 - 수정된 부분
        if(StringUtils.isNotBlank(searchDTO.getDelYn()) && 
           !searchDTO.getDelYn().equalsIgnoreCase("ALL")){
            // "ALL"이 아닌 경우에만 조건 추가 (N 또는 Y일 때)
            predicates.add(cb.equal(root.get("delYn"), searchDTO.getDelYn()));
        }
        // "ALL"인 경우에는 조건을 추가하지 않음 (모든 데이터 조회)
         
         
        return andTogether(predicates, cb);
    }

    private Predicate andTogether(List<Predicate> predicates,  CriteriaBuilder cb) {
        return cb.and(predicates.toArray(new Predicate[0]));
    }

    
}
