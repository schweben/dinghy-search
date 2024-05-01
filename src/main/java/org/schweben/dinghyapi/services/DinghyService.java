package org.schweben.dinghyapi.services;

import org.schweben.dinghyapi.dto.DinghyDTO;
import org.schweben.dinghyapi.entities.Dinghy;
import org.schweben.dinghyapi.mappers.DinghyMapper;
import org.schweben.dinghyapi.repositories.DinghyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DinghyService {
	@Autowired
	private DinghyRepository dinghyRepository;

	@Autowired
	private DinghyMapper mapper;

	@Autowired
	private ServerUtils serverUtils;

	public List<DinghyDTO> getDinghies(String name, String manufacturer, Integer crew, Boolean symmetric,
			Boolean asymmetric, Boolean trapeze) {

		return mapper.map(getAllDinghies().stream()
				.filter(dinghy -> name == null || (dinghy.getName() != null) && (dinghy.getName().toLowerCase()
						.contains(name.toLowerCase()))).filter(dinghy -> manufacturer == null
						|| (dinghy.getManufacturer() != null) && (dinghy.getManufacturer().toLowerCase()
						.contains(manufacturer.toLowerCase())))
				.filter(dinghy -> crew == null || crew == 0 || dinghy.getCrew().equals(crew))
				.filter(dinghy -> symmetric == null || dinghy.isSymmetricSpinnaker() == symmetric)
				.filter(dinghy -> asymmetric == null || dinghy.isAsymmetricSpinnaker() == asymmetric)
				.filter(dinghy -> trapeze == null || dinghy.getTrapeze() > 0).toList(), serverUtils.getServerAddress());
	}

	public List<DinghyDTO> getDinghies(String name) {
		return mapper.map(
				getAllDinghies().stream().filter(dinghy -> dinghy.getName().toLowerCase().contains(name.toLowerCase()))
						.toList(), serverUtils.getServerAddress());
	}

	public List<DinghyDTO> getAllSymmetricDinghies() {
		return mapper.map(getAllDinghies().stream().filter(Dinghy::isSymmetricSpinnaker).toList(),
				serverUtils.getServerAddress());
	}

	public List<DinghyDTO> getAllAsymmetricDinghies() {
		return mapper.map(getAllDinghies().stream().filter(Dinghy::isAsymmetricSpinnaker).toList(),
				serverUtils.getServerAddress());
	}

	public List<DinghyDTO> getDinghiesWithTrapeze() {
		return mapper.map(getAllDinghies().stream().filter(dinghy -> dinghy.getTrapeze() > 0).toList(),
				serverUtils.getServerAddress());
	}

	public List<DinghyDTO> getDinghiesWithTrapeze(int trapezes) {
		return mapper.map(getAllDinghies().stream().filter(dinghy -> dinghy.getTrapeze() == trapezes).toList(),
				serverUtils.getServerAddress());
	}

	public List<DinghyDTO> getDinghiesFromManufacturer(String manufacturer) {
		return mapper.map(getAllDinghies().stream()
						.filter(dinghy -> dinghy.getManufacturer().toLowerCase().contains(manufacturer.toLowerCase())).toList(),
				serverUtils.getServerAddress());
	}

	public List<DinghyDTO> getDinghiesWithCrew(int numCrew) {
		return mapper.map(getAllDinghies().stream().filter(dinghy -> dinghy.getCrew() == numCrew).toList(),
				serverUtils.getServerAddress());
	}

	public List<DinghyDTO> getDinghiesWithHulls(int numHulls) {
		return mapper.map(getAllDinghies().stream().filter(dinghy -> dinghy.getHulls() == numHulls).toList(),
				serverUtils.getServerAddress());
	}

	@Cacheable("dinghies")
	private List<Dinghy> getAllDinghies() {
		return dinghyRepository.findAll();
	}
}
