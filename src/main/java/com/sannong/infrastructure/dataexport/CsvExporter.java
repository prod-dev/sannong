package com.sannong.infrastructure.dataexport;

import com.sannong.infrastructure.persistance.entity.Answer;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Iterator;
import java.util.List;


/**
 * Created by Vidor Chan on 10/30/14.
 */


public class CsvExporter {

    private static final int questionNumbers = 55;

    //export to csv
    public static void doExport(HttpServletResponse response,List<Answer> answer) throws IOException {
        response.setContentType("application/csv");
        response.setCharacterEncoding("GB2312");
        response.setHeader("Content-disposition", "attachment;filename=answer.csv");
        PrintWriter w = response.getWriter();
        StringBuffer header = new StringBuffer();
        for (int number=1;number<=questionNumbers;number++){
            header.append("问题"+number+",");
        }
        w.write("编号,姓名,手机号码,工作单位,"+header.toString()+"\n");
        Iterator it = answer.iterator();
        int serialNumber = 1;
        while(it.hasNext()){
            Answer app = (Answer) it.next();
            String answers = toAnalyseString(dealString(app.getQuestionnaire1Answers()))+ "," +toAnalyseString(dealString(app.getQuestionnaire2Answers()))+ ","
                    +toAnalyseString(dealString(app.getQuestionnaire3Answers()))+ "," +toAnalyseString(dealString(app.getQuestionnaire4Answers()))+ "," +toAnalyseString(dealString(app.getQuestionnaire5Answers()));
            w.write( serialNumber + ","  +app.getApplicant().getRealName() + ","+ app.getApplicant().getCellphone()  + ","+ app.getApplicant().getCompanyAddress() + "," + CsvExporter.toAnalyseString(answers) + "\n");
            serialNumber++;
            w.flush();
        }
        w.close();
    }

    //deal the null String just use in test beacause in real environment getQuestionnaire1Answers can't be null
    public  static String dealString(String answer){
        return (answer == null ?"":answer);
    }

    //analyse answer String
    public  static  String  toAnalyseString(String  answer){
        String ans = answer.replaceAll("Q\\d:","");
        String a = ans.replace(";",",");
        return  a;
    }
}