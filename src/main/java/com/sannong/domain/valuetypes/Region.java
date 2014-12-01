package com.sannong.domain.valuetypes;

import com.sannong.domain.entities.City;
import com.sannong.domain.entities.District;
import com.sannong.domain.entities.Province;

/**
 * Created by Bright Huang on 11/14/14.
 */
public class Region {
    private Province province;
    private City city;
    private District district;

    public Region(Province province, City city, District district) {
        this.province = province;
        this.city = city;
        this.district = district;
    }

    public Province getProvince() {
        return province;
    }

    public void setProvince(Province province) {
        this.province = province;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }
}
