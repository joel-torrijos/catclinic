package com.joeltorrijos.catclinic.serializer;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.joeltorrijos.catclinic.model.Gender;

public class GenderSerializer extends JsonSerializer<Gender> {

	@Override
	public void serialize(Gender gender, JsonGenerator gen, SerializerProvider serializers) throws IOException {
		gen.writeStartObject();
		
		gen.writeFieldName("id");
		gen.writeNumber(gender.ordinal());
		
		gen.writeFieldName("name");
		gen.writeString(gender.name());
		
		gen.writeFieldName("value");
		gen.writeString(gender.getValue());
		
		gen.writeEndObject();
	}

}
