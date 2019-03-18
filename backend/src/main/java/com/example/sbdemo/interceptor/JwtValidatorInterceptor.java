package com.example.sbdemo.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;

import com.example.sbdemo.utils.SbUtils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Configuration
public class JwtValidatorInterceptor implements HandlerInterceptor {
	Logger log = LoggerFactory.getLogger(JwtValidatorInterceptor.class);

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		try {
			String jwtStr = request.getHeader("Authorization");
			if(jwtStr == null || jwtStr.split(" ").length < 2) {
				response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
				return false;
			}
			Claims claims = Jwts.parser().setSigningKey(SbUtils.SECRET_KEY).parseClaimsJws(jwtStr.split(" ")[1]).getBody();
			log.debug(claims.toString());
		} catch (Throwable t) {
			log.error("", t);
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, t.getMessage());
			return false;
		}
		return true;
	}

}
