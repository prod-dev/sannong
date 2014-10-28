package com.sannong.infrastructure.util;

public class MyConfig {
	
	public static String getConfig(String key)
	{
		 Config cf=new Config();
		 return cf.getProperty(key);
	}

}
