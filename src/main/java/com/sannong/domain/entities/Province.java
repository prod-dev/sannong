package com.sannong.domain.entities;

import java.io.Serializable;

/**
 * Created by Bright Huang on 10/24/14.
 */
public class Province implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long provinceId;
    private Long provinceIndex;
    private String provinceName;
    private String provinceCode;
    private String countryCode;

    public Long getProvinceId() {
        return provinceId;
    }

    public void setProvinceId(Long provinceId) {
        this.provinceId = provinceId;
    }

    public Long getProvinceIndex() {
        return provinceIndex;
    }

    public void setProvinceIndex(Long provinceIndex) {
        this.provinceIndex = provinceIndex;
    }

    public String getProvinceName() {
        return provinceName;
    }

    public void setProvinceName(String provinceName) {
        this.provinceName = provinceName;
    }

    public String getProvinceCode() {
        return provinceCode;
    }

    public void setProvinceCode(String provinceCode) {
        this.provinceCode = provinceCode;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }
}
