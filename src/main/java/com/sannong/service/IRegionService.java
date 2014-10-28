package com.sannong.service;

import com.sannong.infrastructure.persistance.entity.City;
import com.sannong.infrastructure.persistance.entity.District;
import com.sannong.infrastructure.persistance.entity.Province;

import java.util.List;

/**
 * Created by Bright Huang on 10/26/14.
 */
public interface IRegionService {
    public List<Province> getProvinces();
    public List<City> getCities(Long provinceIndex);
    public List<District> getDistricts(Long cityIndex);
}
