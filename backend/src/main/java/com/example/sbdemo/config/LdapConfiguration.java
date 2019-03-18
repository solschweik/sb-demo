package com.example.sbdemo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.ldap.core.support.LdapContextSource;

@Configuration
public class LdapConfiguration {
	@Value("${ldap.url}")
	private String ldapUrl;
	
	@Bean
	LdapContextSource contextSource() {
		LdapContextSource ctx = new LdapContextSource();
		ctx.setUrl(ldapUrl);
		return ctx;
	}
	
	@Bean
	LdapTemplate ldapTemplate() {
		return new LdapTemplate(contextSource());
	}
}
