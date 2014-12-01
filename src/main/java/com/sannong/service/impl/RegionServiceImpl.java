package com.sannong.service.impl;

import com.sannong.domain.entities.City;
import com.sannong.domain.entities.District;
import com.sannong.domain.entities.Province;
import com.sannong.domain.repositories.RegionRepository;
import com.sannong.service.IRegionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by Bright Huang on 10/26/14.
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class RegionServiceImpl implements IRegionService {
    @Autowired
    private RegionRepository regionRepository;


    public List<Province> getProvinces() {
        return regionRepository.getProvinceByCountryCode("zh");
    }


    public List<City> getCities(Long provinceIndex) {
        return regionRepository.getCityByProvinceIndex(provinceIndex);
    }


    public List<District> getDistricts(Long cityIndex) {
        return regionRepository.getDistrictByCityIndex(cityIndex);
    }

    @Override
    public Province getProvince(long provinceIndex) {
        return null;
    }

    @Override
    public City getCity(long cityIndex) {
        return null;
    }

    @Override
    public District getDistrict(long districtIndex) {
        return null;
    }


}
