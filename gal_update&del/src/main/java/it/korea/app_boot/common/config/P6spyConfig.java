package it.korea.app_boot.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import it.korea.app_boot.common.listener.P6spyEventListener;

@Configuration
public class P6spyConfig {

    @Bean
    public P6spyEventListener p6spyEventListener(){
        return new P6spyEventListener();
    }

    @Bean
    public P6spySqlFormater p6spySqlFormater(){
        return new P6spySqlFormater();
    }
}
