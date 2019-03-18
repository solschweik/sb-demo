package com.example.sbdemo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.sbdemo.interceptor.JwtValidatorInterceptor;

@Configuration
public class AppConfig implements WebMvcConfigurer {

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(new JwtValidatorInterceptor())
		.excludePathPatterns("/logmein/**", 
				"/index.html", "/styles**.css", "/runtime**.js", "/**polyfills**.js", "/main**.js", "/3rdpartylicenses.txt", "/favicon.ico");
	}

}
