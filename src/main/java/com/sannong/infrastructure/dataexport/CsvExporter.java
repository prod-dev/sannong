package com.sannong.infrastructure.dataexport;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import com.sannong.domain.entities.User;

/**
 * Created by Vidor Chan on 10/30/14.
 * Modified by William Zhang on 11/14/14
 */
@Component
public class CsvExporter {

	private static final Logger logger = Logger.getLogger(CsvExporter.class);
	
	public static String export(List<User> users, int questionSum) throws Exception {
		
		logger.info("start to call export in CsvExporter.java");
		
		BufferedWriter csvFileOutputStream = null;
	    String currentPath = CsvExporter.class.getResource("/").getPath().replaceAll("/WEB-INF/classes/", "").replaceAll("%20", " ");
		String fileName = "answers" + System.currentTimeMillis();
		String filePath = currentPath + "/csvfiles/" + fileName + ".csv";
		String returnFilePath = "/sannong/csvfiles/" + fileName + ".csv";
		
		logger.info("restore csv file path: " + filePath);
		logger.info("return file path: " + returnFilePath);
		
		File csvFile = new File(filePath);
		File parent = csvFile.getParentFile();
		
		if (parent != null && !parent.exists()) {
			parent.mkdirs();
		}
		csvFile.createNewFile();

		csvFileOutputStream = new BufferedWriter(new OutputStreamWriter(
				new FileOutputStream(csvFile), "GB2312"), 1024);
		
		//edit title
		StringBuffer header = new StringBuffer();
		
		for (int number = 1; number <= questionSum; number++) {
			header.append("问题" + number + ",");
		}
		String title = "编号,姓名,手机号码,工作单位," + header.toString();
		csvFileOutputStream.write(title);
		csvFileOutputStream.newLine();

		//edit contents
		int i = 1;

		for (User userRow : users) {
			String Baseinfo = i + "," + userRow.getRealName() + ","
					+ "=\"" + userRow.getCellphone() + "\"" + "," + userRow.getCompany() + ",";
			StringBuffer answerRow = new StringBuffer();
			String dataRow = "";

			if (userRow.getAnswer() != null) {
				if (userRow.getAnswer().getQuestionnaire1Answers() != null) {
					String questionnaire1Answers = userRow.getAnswer()
							.getQuestionnaire1Answers();
					String[] answerArray = questionnaire1Answers.split(";");
					
					buildAnswerRow(answerRow,answerArray);
				}
				if (userRow.getAnswer().getQuestionnaire2Answers() != null) {
					String questionnaire2Answers = userRow.getAnswer()
							.getQuestionnaire2Answers();
					String[] answerArray = questionnaire2Answers.split(";");
					
					buildAnswerRow(answerRow,answerArray);
				}
				if (userRow.getAnswer().getQuestionnaire3Answers() != null) {
					String questionnaire3Answers = userRow.getAnswer()
							.getQuestionnaire3Answers();
					String[] answerArray = questionnaire3Answers.split(";");
					
					buildAnswerRow(answerRow,answerArray);

				}
				if (userRow.getAnswer().getQuestionnaire4Answers() != null) {
					String questionnaire4Answers = userRow.getAnswer()
							.getQuestionnaire4Answers();
					String[] answerArray = questionnaire4Answers.split(";");
					
					buildAnswerRow(answerRow,answerArray);

				}
				if (userRow.getAnswer().getQuestionnaire5Answers() != null) {
					String questionnaire5Answers = userRow.getAnswer()
							.getQuestionnaire5Answers();
					String[] answerArray = questionnaire5Answers.split(";");
					
					buildAnswerRow(answerRow,answerArray);

				}
				String answerInfo = answerRow.toString().substring(0,
						answerRow.toString().length() - 1);
				dataRow = Baseinfo + answerInfo;
			}

			csvFileOutputStream.write(dataRow);
			csvFileOutputStream.newLine();
			i++;
		}
		csvFileOutputStream.flush();
		csvFileOutputStream.close();
		
		logger.info("end to call export in CsvExporter.java");
		return returnFilePath;
	}
	
	private static void buildAnswerRow(StringBuffer answerRow, String[] answerArray){
		for (String answers : answerArray) {
			StringBuffer answerStringBuffer = new StringBuffer();
			String[] singleAnswerArray = answers.split(",");

			for (String answerStr : singleAnswerArray) {
				answerStr = String.valueOf(answerStr
						.charAt(answerStr.length() - 1));
				answerStringBuffer.append(answerStr);
			}
			answerRow.append(answerStringBuffer.toString() + ",");
		}
	}
}
