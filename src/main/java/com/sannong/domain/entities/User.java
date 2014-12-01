package com.sannong.domain.entities;

import java.io.Serializable;
import java.sql.Timestamp;

import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.sannong.infrastructure.util.CustomDateSerializer;

import javax.validation.constraints.NotNull;

/**
 * create user class
 * @author william zhang
 */
public class User implements Serializable{
	
	private static final long serialVersionUID = 4891642085331481252L;
	
	private Long userId;
    @NotNull(message = "{user.userName.null}")
	private String userName;
    @NotNull(message = "{user.cellphone.null}")
	private String cellphone;
	private String password;
	private String mailbox;
	private String company;
    private Long companyProvince;
    private Long companyCity;
    private Long companyDistrict;
	private String companyAddress;
	private String deskPhone;
	private String jobTitle;
	private String salt;
	private int enabled;
	private Long roleId;
	private Timestamp updateTime;
	private String realName;
	private Timestamp createTime;
	private Answer answer;
	
	public Answer getAnswer() {
		return answer;
	}
	public void setAnswer(Answer answer) {
		this.answer = answer;
	}
	@JsonSerialize(using = CustomDateSerializer.class)
	public Timestamp getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}
	public String getRealName() {
		return realName;
	}
	public void setRealName(String realName) {
		this.realName = realName;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getCellphone() {
		return cellphone;
	}
	public void setCellphone(String cellphone) {
		this.cellphone = cellphone;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getMailbox() {
		return mailbox;
	}
	public void setMailbox(String mailbox) {
		this.mailbox = mailbox;
	}
	public String getCompany() {
		return company;
	}

    public Long getCompanyProvince() {
        return companyProvince;
    }

    public void setCompanyProvince(Long companyProvince) {
        this.companyProvince = companyProvince;
    }

    public Long getCompanyCity() {
        return companyCity;
    }

    public void setCompanyCity(Long companyCity) {
        this.companyCity = companyCity;
    }

    public Long getCompanyDistrict() {
        return companyDistrict;
    }

    public void setCompanyDistrict(Long companyDistrict) {
        this.companyDistrict = companyDistrict;
    }

    public void setCompany(String company) {
		this.company = company;
	}
	public String getCompanyAddress() {
		return companyAddress;
	}
	public void setCompanyAddress(String companyAddress) {
		this.companyAddress = companyAddress;
	}
	public String getDeskPhone() {
		return deskPhone;
	}
	public void setDeskPhone(String deskPhone) {
		this.deskPhone = deskPhone;
	}
	public String getJobTitle() {
		return jobTitle;
	}
	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}
	public String getSalt() {
		return salt;
	}
	public void setSalt(String salt) {
		this.salt = salt;
	}
	public int getEnabled() {
		return enabled;
	}
	public void setEnabled(int enabled) {
		this.enabled = enabled;
	}
	public Long getRoleId() {
		return roleId;
	}
	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}
	public Timestamp getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Timestamp updateTime) {
		this.updateTime = updateTime;
	}
}
