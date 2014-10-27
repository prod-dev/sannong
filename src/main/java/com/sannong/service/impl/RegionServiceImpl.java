package com.sannong.service.impl;

import com.sannong.infrastructure.persistance.entity.City;
import com.sannong.infrastructure.persistance.entity.District;
import com.sannong.infrastructure.persistance.entity.Province;
import com.sannong.infrastructure.persistance.repository.RegionRepository;
import com.sannong.service.IRegionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Bright Huang on 10/26/14.
 */
@Service
public class RegionServiceImpl implements IRegionService{
    @Autowired
    private RegionRepository regionRepository;

    @Override
    public List<Province> getProvinces() {
        return regionRepository.getProvinceByCountryCode("zh");
    }

    @Override
    public List<City> getCities(Long provinceIndex) {
        return regionRepository.getCityByProvinceIndex(provinceIndex);
    }

    @Override
    public List<District> getDistricts(Long cityIndex) {
        return regionRepository.getDistrictByCityIndex(cityIndex);
    }



}
