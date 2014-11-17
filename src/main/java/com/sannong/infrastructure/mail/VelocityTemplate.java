package com.sannong.infrastructure.mail;

import java.io.StringWriter;
import java.util.Map;
import java.util.Properties;

import javax.servlet.ServletContext;

import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;

import com.sannong.infrastructure.util.AppConfig;



public class VelocityTemplate {

	private AppConfig appConfig;
	
	public VelocityTemplate() throws Exception
	{
		appConfig=new AppConfig();
	}
	
	 public String getTemplate(String directoryPath,String templateFile, Map<Object, Object> velocityParameters) {
	      //ServletContext context = (ServletContext) FacesContext.getCurrentInstance().getExternalContext().getContext();
		//	 String directoryPath = context.getRealPath("/resources/template");
		
	      Properties velocityProperties = new Properties();
	      velocityProperties.put("file.resource.loader.path",directoryPath);
	     VelocityEngine ve = new VelocityEngine();
	     ve.init(velocityProperties);
	    Template t = ve.getTemplate(templateFile,"UTF-8");

	    VelocityContext velocityContext = new VelocityContext();
	    velocityContext.put("vp", velocityParameters);
	    StringWriter writer = new StringWriter();
	    t.merge(velocityContext, writer);
	   return writer.toString();
	    }

}
