package com.example.sbdemo.config;

import org.apache.commons.codec.digest.Crypt;
import org.springframework.security.crypto.codec.Utf8;
import org.springframework.security.crypto.password.LdapShaPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class CryptEncoder implements PasswordEncoder {
	private LdapShaPasswordEncoder delegate = new LdapShaPasswordEncoder();

	@Override
	public String encode(CharSequence rawPassword) {
		return "";
	}

	@Override
	public boolean matches(CharSequence rawPassword, String encodedPassword) {
		if (encodedPassword.startsWith("{CRYPT}")) {
			String salt = encodedPassword.substring(7, 18);
			final String passwordHash = Crypt.crypt(rawPassword.toString(), salt);
			return equals(encodedPassword.substring(7), passwordHash);
		} else {
			return delegate.matches(rawPassword, encodedPassword);
		}
	}

	static boolean equals(String expected, String actual) {
		byte[] expectedBites = bitesUtf8(expected), actualBites = bitesUtf8(actual);
		int expectedLength = expectedBites != null ? expectedBites.length : -1,
				actualLength = actualBites != null ? actualBites.length : -1;
		int result = expectedLength == actualLength ? 0 : 1;
		for (int i = 0; i < actualLength; i++) {
			byte expectedBite = expectedLength <= 0 ? 0 : expectedBites[i % expectedLength],
					actualBite = actualBites[i % actualLength];
			result |= expectedBite ^ actualBite;
		}
		return result == 0;
	}

	private static byte[] bitesUtf8(String str) {
		return str != null ? Utf8.encode(str) : null;
	}

}
