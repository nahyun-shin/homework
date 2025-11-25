package it.korea.jpa.repository.comp;

import java.util.List;


import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import it.korea.jpa.dto.comp.EmployeeDTO;
import it.korea.jpa.dto.comp.EmployeeProjection;
import it.korea.jpa.entity.comp.EmployeeEntity;


public interface EmployeeRepository extends JpaRepository<EmployeeEntity, String>{
    @Query("select e from EmployeeEntity e join fetch e.department join fetch e.card")
    List<EmployeeEntity> gEmployeeList();

    //repostitory 에서 제공하는 함수에만 가능
    @EntityGraph(attributePaths = {"department","card"})
    Page<EmployeeEntity> findAll(Pageable pageable);


    //JPQL문법 중 네이티브 SQL 사용
    @Query(value = """
            select e.em_id,
                    e.em_name,
                    d1.dept_name,
                    c1.balance
            from employee e
            join emp_cards c1 on e.em_id = c1.em_id
            join deptment d1 on e.dept_id = d1.dept_id
            """,
            countQuery="select count(*) from employee",
            nativeQuery = true)
    Page<EmployeeProjection> getEmployeeAllList(Pageable pageable);
}
