package com.sannong.infrastructure.util;

import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

public class CustomDateSerializer extends JsonSerializer<Timestamp> {

	public void serialize(Timestamp value, JsonGenerator gsonGenerator,
			SerializerProvider serializerProvider) throws IOException,
			JsonProcessingException {
	    
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");  
		String formattedDate = formatter.format(value);  
		gsonGenerator.writeString(formattedDate);  
	}

}
