package com.sannong.dao.util;

import java.io.InputStream;
import java.io.StringWriter;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.CookieStore;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.protocol.*;
import org.apache.log4j.Logger;

public class Http {

	private static final Logger LOG = Logger.getLogger(Http.class);

	public static String requestGet(String uri, List<NameValuePair> paramList) throws Exception {
		String url = getURL(uri, paramList);
		LOG.debug("GET: " + url);
		HttpGet request = new HttpGet(url);
		return getResponse(request);
	}

	public static String requestPost(String uri, List<NameValuePair> postList) throws Exception {
		String url = getURL(uri, postList);
		LOG.debug("POST: " + url);
		HttpPost request = new HttpPost(uri);
		request.setEntity(new UrlEncodedFormEntity(postList, "utf-8"));
		return getResponse(request);
	}

	private static String getURL(String uri, List<NameValuePair> paramList) {
		StringBuilder urlBuilder = new StringBuilder(uri);
		for (int i = 0; i < paramList.size(); i++) {
			NameValuePair nvp = paramList.get(i);
			if (i == 0) {
				urlBuilder.append("?");
			} else {
				urlBuilder.append("&");
			}
			urlBuilder.append(nvp.getName());
			urlBuilder.append("=");
			urlBuilder.append(nvp.getValue());
		}
		return urlBuilder.toString();
	}

	private static String getResponse(HttpRequestBase request) throws Exception {
		CookieStore cookieStore = new BasicCookieStore();
		HttpContext context = new BasicHttpContext();
		context.setAttribute(HttpClientContext.COOKIE_STORE, cookieStore);
		HttpClient client = HttpClientBuilder.create().build();
		HttpResponse response = client.execute(request, context);
		InputStream inputStream = response.getEntity().getContent();
		StringWriter writer = new StringWriter();
		IOUtils.copy(inputStream, writer, "utf-8");
		String content = writer.toString();
		return content;

	}
}
