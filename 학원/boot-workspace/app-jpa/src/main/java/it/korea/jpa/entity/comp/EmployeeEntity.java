package it.korea.jpa.entity.comp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "employee")
public class EmployeeEntity {

    @Id
    private String emId;
    private String emName;
    

    

    //부서매핑
    @ManyToOne(fetch = FetchType.LAZY)
    //기본키를 연결해주지 않으면 자동으로 해버림
    @JoinColumn(name = "dept_id", nullable = false)
    
    private DepartEntity department;


    //나를 가지고 있는 상대방을 불러옴
    @OneToOne(mappedBy = "emp", cascade = CascadeType.ALL, orphanRemoval = true, optional = false)
    
    EmCardEntity card;
}
