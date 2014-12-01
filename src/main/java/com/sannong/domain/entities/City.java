package com.sannong.domain.entities;

import java.io.Serializable;

/**
 * Created by Bright Huang on 10/24/14.
 */
public class City implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long cityId;
    private Long cityIndex;
    private String cityName;
    private String cityCode;
    private Long provinceIndex;


    public Long getCityId() {
        return cityId;
    }

    public void setCityId(Long cityId) {
        this.cityId = cityId;
    }

    public Long getCityIndex() {
        return cityIndex;
    }

    public void setCityIndex(Long cityIndex) {
        this.cityIndex = cityIndex;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public String getCityCode() {
        return cityCode;
    }

    public void setCityCode(String cityCode) {
        this.cityCode = cityCode;
    }

    public Long getProvinceIndex() {
        return provinceIndex;
    }

    public void setProvinceIndex(Long provinceIndex) {
        this.provinceIndex = provinceIndex;
    }

}
