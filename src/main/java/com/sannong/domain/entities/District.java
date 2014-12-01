package com.sannong.domain.entities;

import java.io.Serializable;

/**
 * Created by Bright Huang on 10/24/14.
 */
public class District implements Serializable {

    private static final long serialVersionUID = 1L;


    private Long districtId;
    private Long districtIndex;
    private String districtName;
    private String districtCode;
    private Long cityIndex;


    public Long getDistrictId() {
        return districtId;
    }

    public void setDistrictId(Long districtId) {
        this.districtId = districtId;
    }

    public Long getDistrictIndex() {
        return districtIndex;
    }

    public void setDistrictIndex(Long districtIndex) {
        this.districtIndex = districtIndex;
    }

    public String getDistrictName() {
        return districtName;
    }

    public void setDistrictName(String districtName) {
        this.districtName = districtName;
    }

    public String getDistrictCode() {
        return districtCode;
    }

    public void setDistrictCode(String districtCode) {
        this.districtCode = districtCode;
    }

    public Long getCityIndex() {
        return cityIndex;
    }

    public void setCityIndex(Long cityIndex) {
        this.cityIndex = cityIndex;
    }
}
