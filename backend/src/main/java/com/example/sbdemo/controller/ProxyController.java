package com.example.sbdemo.controller;

import java.io.IOException;
import java.util.Calendar;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.naming.NamingException;
import javax.servlet.http.HttpServletRequest;

import org.apache.catalina.connector.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ldap.core.ContextMapper;
import org.springframework.ldap.core.DirContextAdapter;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.ldap.userdetails.LdapUserDetails;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.sbdemo.utils.SbUtils;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
public class ProxyController {
	@Autowired
	private AuthenticationManager authenticationManager;
	
	Logger log = LoggerFactory.getLogger(ProxyController.class);
	
	@Autowired
	private LdapTemplate ldapTemplate;
	
	@Value("${jwt.claim.validity.ms}")
	String claimValidity;
	
	private ObjectMapper om = new ObjectMapper();
	
	@RequestMapping(value = "/validate", produces = MediaType.TEXT_PLAIN_VALUE)
	@CrossOrigin()
	public ResponseEntity<String> validate() {
		log.info("Token is valid!");
		return ResponseEntity.ok(null);
	}
	
	@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
	@CrossOrigin()
	public ResponseEntity<Map<String,String>> talkBack(@RequestParam(value="name", defaultValue="Unknown") String name) {
		Map<String, String> res = new LinkedHashMap<String, String>();
		res.put("res", String.format("Hello, %s", name));
		return ResponseEntity.ok(res);
	}
	
	@RequestMapping(value = "/logmein", produces = MediaType.APPLICATION_JSON_VALUE)
	@CrossOrigin()
	@ResponseBody()
	public ResponseEntity<Map<String,String>> logmein(@RequestBody String body,
			HttpMethod method, HttpServletRequest request) {
		String jwt;
		
		try {
			UUID uuid = UUID.randomUUID();
			JsonNode obj = om.readTree(body),
					un = obj.get("username"),
					pwd = obj.get("password");
			Authentication auth = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(un.asText(), pwd.asText()));
			List<String> roles = auth.getAuthorities().stream().map(a -> a.getAuthority()).collect(Collectors.toList());
			Claims claims = Jwts.claims().setSubject(un.asText());
			claims.put("auth", StringUtils.collectionToCommaDelimitedString(roles));
			
			LdapUserDetails u = (LdapUserDetails) auth.getPrincipal();
			Map<String, String> map = ldapTemplate.lookup(u.getDn(), new ContextMapper<Map<String, String>>() {

				@Override
				public Map<String, String> mapFromContext(Object context) throws NamingException {
					DirContextAdapter ctx = (DirContextAdapter) context;
					Map<String, String> map = new LinkedHashMap<String, String>();
					map.put("cn", ctx.getStringAttribute("cn"));
					map.put("sn", ctx.getStringAttribute("sn"));
					map.put("displayName", ctx.getStringAttribute("displayName"));
					map.put("description", ctx.getStringAttribute("description"));
					return map;
				}
			});
			addClaim(claims, map, "cn");
			addClaim(claims, map, "sn");
			addClaim(claims, map, "displayName");
			addClaim(claims, map, "description");
			
			Calendar validTill = Calendar.getInstance();
			validTill.setTimeInMillis(validTill.getTimeInMillis() + Integer.parseInt(claimValidity));
			jwt = Jwts.builder().setClaims(claims).setId(uuid.toString()).setIssuer("BNS")
					.setIssuedAt(Calendar.getInstance().getTime()).setExpiration(validTill.getTime())
					.signWith(SignatureAlgorithm.HS256, SbUtils.SECRET_KEY).compact();
		} catch(IOException e) {
			log.error("", e);
			return ResponseEntity.badRequest().build();
		} catch (BadCredentialsException be) {
			log.error("", be);
			return ResponseEntity.status(Response.SC_UNAUTHORIZED).build();
		} catch (Throwable t) {
			log.error("", t);
			return ResponseEntity.status(Response.SC_INTERNAL_SERVER_ERROR).build();
		}
		
		Map<String, String> res = new LinkedHashMap<String, String>();
		res.put("jwt", jwt);
		return ResponseEntity.ok(res);
	}

	private void addClaim(Claims claims, Map<String, String> map, String claimName) {
		String val = map.get(claimName);
		if(val != null) {
			claims.put(claimName, val);
		}	
	}

}
