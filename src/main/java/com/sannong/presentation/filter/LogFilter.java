package com.sannong.presentation.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

public class LogFilter implements Filter {

	private static final Logger LOG = Logger.getLogger(LogFilter.class);

	public void destroy() {
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

		HttpServletRequest req = (HttpServletRequest) request;
		String queryString = req.getQueryString() == null ? "" : req.getQueryString();
		LOG.debug("==" + req.getScheme() + "://" + req.getServerName() + req.getRequestURI() + queryString);
		chain.doFilter(request, response);

	}

	public void init(FilterConfig arg0) throws ServletException {
	}

}
