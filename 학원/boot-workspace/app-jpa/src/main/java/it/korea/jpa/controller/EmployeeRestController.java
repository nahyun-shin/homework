package it.korea.jpa.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.korea.jpa.dto.comp.EmployeeDTO;
import it.korea.jpa.service.comp.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequiredArgsConstructor
@RequestMapping("/emp")
public class EmployeeRestController {

    private final EmployeeService employeeService;

    @GetMapping("/list")
    public List<EmployeeDTO> getList() {
        return employeeService.getEmployeeList();
    }
    @GetMapping("/page/list")
    public List<EmployeeDTO> getList(@PageableDefault(page = 0,
                                    size = 10,
                                    sort = "emId",
                                    direction = Sort.Direction.DESC)
                                    Pageable pageable) {
        return employeeService.getEmployeePageList(pageable);
    } 
    @GetMapping("/page/list2")
    public List<EmployeeDTO> getList2(@PageableDefault(page = 0,
                                    size = 10,
                                    sort = "em_id",
                                    direction = Sort.Direction.DESC)
                                    Pageable pageable) {
        return employeeService.getEmployeePageList2(pageable);
    }

    @PostMapping(value = "",
                 consumes = MediaType.APPLICATION_JSON_VALUE,
                 produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> addNewEmployee(@RequestBody EmployeeDTO dto) {
        Map<String, Object> resulMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;

        try {
            resulMap = employeeService.addNewEmployee(dto);
        } catch (Exception e) {
            resulMap.put("resultCode", status.value());
            e.printStackTrace();
        }

        return new ResponseEntity<>(resulMap, status);
    }  // <-- 여기서 POST 메서드 닫힘

    // DeleteMapping은 @RequestParam을 무시함...
    @DeleteMapping(value = "/{emId}")
    public ResponseEntity<Map<String, Object>> deleteEmployee(@PathVariable("emId") String emId) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;

        try {
            int result = employeeService.deleteEmployee(emId);
            if(result < 0){
                throw new Exception("삭제 실패");
            }
        } catch(Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            e.printStackTrace();
        } finally {
            resultMap.put("resultCode", status.value());
        }

        return new ResponseEntity<>(resultMap, status);
    }
}  // <-- 클래스 닫힘
