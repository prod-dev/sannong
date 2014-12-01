package com.sannong.domain.repositories;

import com.sannong.domain.entities.City;
import com.sannong.domain.entities.District;
import com.sannong.domain.entities.Province;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by Bright Huang on 10/24/14.
 */
@Repository
@Transactional
public interface RegionRepository {
	
    List<Province> getProvinces();
    
    List<Province> getProvinceByCountryCode(String countryCode);
    
    List<City> getCityByProvinceIndex(Long provinceIndex);
    
    List<District> getDistrictByCityIndex(Long cityIndex);

    Province getProvince(Long provinceIndex);

    City getCity(Long cityIndex);

    District getDistrict(Long districtIndex);


}
