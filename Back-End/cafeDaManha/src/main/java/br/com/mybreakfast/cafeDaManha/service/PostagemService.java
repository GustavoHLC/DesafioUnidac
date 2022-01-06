package br.com.mybreakfast.cafeDaManha.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.com.mybreakfast.cafeDaManha.model.Postagem;
import br.com.mybreakfast.cafeDaManha.repository.PostagemRepository;

@Service
public class PostagemService {

	@Autowired
	private PostagemRepository postagemRepository;

	public Postagem buscarPostagemPeloId(Long id) {
		
		Postagem postagemSalva = postagemRepository.findById(id).orElse(null);
		
		if(postagemSalva == null) {
			throw new EmptyResultDataAccessException(1);
		}
		return postagemSalva;
	}

	public Optional<Postagem> filtrarPostagemPeloId(Postagem postagem){
		
		if(postagemRepository.findById(postagem.getId()).isPresent()) {
			
			Optional<Postagem> buscaPostagem = postagemRepository.findByItem(postagem.getItem());
			
			if((buscaPostagem.isPresent()) && (buscaPostagem.get().getId() != postagem.getId()))
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Item já adicionado!", null);
		}
		
		return Optional.empty();
	}
}
