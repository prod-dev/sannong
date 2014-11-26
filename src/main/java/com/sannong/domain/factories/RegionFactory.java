package com.sannong.domain.factories;

import com.sannong.domain.valuetypes.Region;
import com.sannong.infrastructure.persistance.entity.City;
import com.sannong.infrastructure.persistance.entity.District;
import com.sannong.infrastructure.persistance.entity.Province;
import com.sannong.infrastructure.persistance.repository.RegionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Created by Bright Huang on 11/14/14.
 */
@Component
public class RegionFactory {
    @Autowired
    private RegionRepository regionRepository;

    public Region build(Long provinceIndex, Long cityIndex, Long districtIndex){
        Province province = regionRepository.getProvince(provinceIndex);
        City city = regionRepository.getCity(cityIndex);
        District district = regionRepository.getDistrict(districtIndex);

        return new Region(province, city, district);
    }


}
