package com.sannong.domain.factories;

import org.springframework.stereotype.Component;

import com.sannong.domain.valuetypes.Region;

/**
 * Created by Bright Huang on 11/14/14.
 */
@Component
public class MailContentFactory {
    private static final String LF = "\n\n";
    private static final String DEFAULT_RECEIVER_NAME = "管理员";
    private static final String CONTACT_CONTENT = " 提交了项目申请, 请尽快联系该项目申请人, 以便项目申请人更快的完成后续工作, 推动项目进展.";
    private static final String CELLPHONE_CONTENT = "该项目申请人的联系方式是: 手机:";
    private static final String SIGNATURE = "三农平台";

    /**
     * 管理员:
     *
     * xxx省xxx市xxx村 xxx(名字) 于 xxx (时间)提交了项目申请, 请尽快联系该项目申请人, 以便项目申请人更快的完成后续工作, 推动项目进展.
     *
     * 该项目申请人的联系方式是: 手机: xxxxxxxx"
     *
     * 三农平台
     */
    public String build(Region region, String applicantName, String timeOfSubmission, String cellphone){
        return DEFAULT_RECEIVER_NAME + ":" + LF
                + region.getProvince().getProvinceName()
                + region.getCity().getCityName()
                + region.getDistrict().getDistrictName()
                + " " + applicantName
                + " 于 " + timeOfSubmission + CONTACT_CONTENT + LF
                + CELLPHONE_CONTENT + cellphone + LF
                + SIGNATURE;

    }
}
