package com.sannong.infrastructure.dataexport;

import com.sannong.service.IUserService;
import org.apache.ibatis.jdbc.Null;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;


/**
 * Created by Vidor Chan on 10/30/14.
 */


public class CsvExporter {

    //解析答案
    public  static  String  toAnalyseString(String  answer){
            String ans = answer.replaceAll("Q\\d:","");
            String a = ans.replace(";",",");
            return  a;
    }
}