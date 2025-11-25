package it.korea.jpa.service.comp;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import it.korea.jpa.dto.comp.EmployeeDTO;
import it.korea.jpa.dto.comp.EmployeeProjection;
import it.korea.jpa.entity.comp.DepartEntity;
import it.korea.jpa.entity.comp.EmCardEntity;
import it.korea.jpa.entity.comp.EmployeeEntity;
import it.korea.jpa.repository.comp.DepartmentRepository;
import it.korea.jpa.repository.comp.EmployeeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeService {


    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    @Transactional
    public List<EmployeeDTO> getEmployeeList(){
        List<EmployeeEntity> list = employeeRepository.findAll();
        List<EmployeeDTO> empList = list. stream().map(EmployeeDTO::of).toList();
        return empList;
    }
    @Transactional
    public List<EmployeeDTO> getEmployeePageList(Pageable pageable){
        Page<EmployeeEntity> list = employeeRepository.findAll(pageable);
        List<EmployeeDTO> empList = list. stream().map(EmployeeDTO::of).toList();
        return empList;
    }
    @Transactional
    public List<EmployeeDTO> getEmployeePageList2(Pageable pageable){
        Page<EmployeeProjection> list = employeeRepository.getEmployeeAllList(pageable);

        List<EmployeeDTO> empList = list.getContent().stream().map(obj->{
            return EmployeeDTO
                    .builder()
                    .emId(obj.getEmId())
                    .emName(obj.getEmName())
                    .deptName(obj.getDeptName())
                    .profitAccount(obj.getBalance())
                    .build();
        }).toList();
        
        return empList;
    }

    @Transactional 
    public Map<String, Object> addNewEmployee(EmployeeDTO dto) throws Exception{
        Map<String, Object> resultMap = new HashMap<>();
        DepartEntity depart =
        departmentRepository.findById(dto.getDeptId())
        .orElseThrow(()->new RuntimeException("부서정보가 없음"));

        EmployeeEntity em = new EmployeeEntity();
        em.setDepartment(depart);
        em.setEmId(dto.getEmId());
        em.setEmName(dto.getEmName());

        //카드 만들기
        EmCardEntity card = new EmCardEntity();

        //
        String cardId = UUID.randomUUID().toString().replaceAll("-", "").substring(0,6);
        card.setCardId(cardId);
        card.setBalance(200000);


        card.setEmp(em);
        em.setCard(card);
        //카드정보+사용자 정보 저장
        employeeRepository.save(em);

        resultMap.put("resultCode",200);
        return resultMap;
    }


    //삭제로직
    public int deleteEmployee(String emId) throws Exception{
        int result = 1;
        EmployeeEntity em = employeeRepository
                        .findById(emId)
                        .orElseThrow(()->new RuntimeException("사용자 없음"));

        //삭제
        employeeRepository.delete(em);

        return result;

    }
}
