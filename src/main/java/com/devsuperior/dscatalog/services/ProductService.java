package com.devsuperior.dscatalog.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.dto.CategoryDTO;
import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.entities.Product;
import com.devsuperior.dscatalog.repositories.CategoryRepository;
import com.devsuperior.dscatalog.repositories.ProductRepository;
import com.devsuperior.dscatalog.services.exception.DataBaseException;
import com.devsuperior.dscatalog.services.exception.ResourceNotFoundException;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private CategoryRepository categoryRepository;

	@Transactional(readOnly = true)
	public Page<ProductDTO> findAllPaged(PageRequest pageRequest) {

		return productRepository.findAll(pageRequest).map(x -> new ProductDTO(x));
	}

	@Transactional(readOnly = true)
	public ProductDTO findById(Long id) {

		Optional<Product> obj = productRepository.findById(id);
		Product entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new ProductDTO(entity, entity.getCategories());

	}

	@Transactional
	public ProductDTO insert(ProductDTO productDTO) {

		Product entity = new Product();
		copyDtoToEntity(productDTO, entity);
		entity = productRepository.save(entity);

		return new ProductDTO(entity);

	}

	private void copyDtoToEntity(ProductDTO dto, Product entity) {
		entity.setName(dto.getName());
		entity.setDescription(dto.getDescription());
		entity.setDate(dto.getDate());
		entity.setPrice(dto.getPrice());
		entity.setImgUrl(dto.getImgUrl());

		dto.getCategories().clear();
		for (CategoryDTO catDto : dto.getCategories()) {
			Category category = categoryRepository.getOne(catDto.getId());

			entity.getCategories().add(category);
		}

	}

	@Transactional
	public ProductDTO update(Long id, ProductDTO productDTO) {

		try {
			Product entity = productRepository.getOne(id);
			copyDtoToEntity(productDTO, entity);
			entity = productRepository.save(entity);
			return new ProductDTO(entity);

		} catch (EntityNotFoundException e) {

			throw new ResourceNotFoundException("Id not found " + id);
		}

	}

	public void delete(Long id) {

		try {
			productRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + id);

		} catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integrty violation");

		}

	}

}
