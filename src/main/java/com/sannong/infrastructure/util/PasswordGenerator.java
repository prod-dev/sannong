package com.sannong.infrastructure.util;

import org.springframework.security.authentication.encoding.Md5PasswordEncoder;

import java.util.Random;

/**
 * Created by Bright Huang on 11/3/14.
 */
public class PasswordGenerator {

    public static String generateValidationCode(int length) {
        return generatePassword(length);
    }

    public static String generatePassword(int length) {
        String seed = "0123456789";
        Random random = new Random();

        /*
        //TODO: Just for test purpose, will replace it by commentted code below after test.
        if (length == 4){
            return "1234";
        }else if (length == 6){
            return "123456";
        }

        return "";
        */

        if (length == 0) {
            return "";
        }

        char[] buf = new char[length];
        for (int i = 0; i < buf.length; i++) {
            buf[i] = seed.charAt(random.nextInt(seed.length()));
        }
        return new String(buf);
    }

    public static String encryptPassword(String password, String salt){
        Md5PasswordEncoder md5 = new Md5PasswordEncoder();
        return md5.encodePassword(password, salt);
    }


}
