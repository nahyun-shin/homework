package it.korea.jpa.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import it.korea.jpa.dto.gym.MembersDTO;
import it.korea.jpa.service.gym.MemberService;


@RestController
@RequiredArgsConstructor
@RequestMapping("/gym")
public class GymRestController {

    private final MemberService memService;

    @PostMapping(value="/member",
                consumes = MediaType.APPLICATION_JSON_VALUE,
                produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> addMembers (@RequestBody MembersDTO dto) {
        Map<String, Object> resultMap = new HashMap<>();
        
        HttpStatus status = HttpStatus.OK;
        try {
            memService.newMembers(dto);
            resultMap.put("msg", "등록 성공");
        } catch (Exception e) {
            resultMap.put("msg", "등록 실패");
            e.printStackTrace();
        }
        return new ResponseEntity<>(resultMap,status);
    }
    
}
