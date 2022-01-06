package br.com.mybreakfast.cafeDaManha.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.mybreakfast.cafeDaManha.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	
	public List <Usuario> findAllByNomeContainingIgnoreCase (String nome);
	
	public Optional <Usuario> findByCpf(String cpf);
	
	public Usuario findByNome(String nome);
	
}
