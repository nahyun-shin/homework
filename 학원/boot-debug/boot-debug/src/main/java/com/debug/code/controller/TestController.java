package com.debug.code.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
public class TestController {

    @GetMapping("test")
    public ResponseEntity<String> test(@RequestParam(value = "msg", required = false) String msg){

        String message = msg.equals("안녕")?"hello":msg;
        return ResponseEntity.ok().body(message);
    }

    @PostMapping(value = "reg", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> register(@RequestBody Map<String, Object> dataParam){
        return ResponseEntity.ok().body(dataParam);
    }
}
