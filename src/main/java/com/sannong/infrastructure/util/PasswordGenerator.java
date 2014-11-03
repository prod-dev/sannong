package com.sannong.infrastructure.util;

import org.springframework.security.authentication.encoding.Md5PasswordEncoder;

import java.util.Random;

/**
 * Created by Bright Huang on 11/3/14.
 */
public class PasswordGenerator {
    private static String seed = "0123456789";
    private static Random random = new Random();


    public static String generatePassword(int length) {

        //TODO: Just for test purpose, will replace it by commentted code below after test.
        return "123456";

        /*
        if (length == 0) {
            return "";
        }

        char[] buf = new char[length];
        for (int i = 0; i < buf.length; i++) {
            buf[i] = seed.charAt(random.nextInt(seed.length()));
        }

        return new String(buf);
        */
    }

    public static String encryptPassword(String password, String salt){
        Md5PasswordEncoder md5 = new Md5PasswordEncoder();
        return md5.encodePassword(password, salt);
    }


}
