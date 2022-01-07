package br.com.mybreakfast.cafeDaManha.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import br.com.mybreakfast.cafeDaManha.model.Postagem;

@Repository
@Transactional(readOnly = true)
public interface PostagemRepository extends JpaRepository<Postagem, Long> {
	
	public List <Postagem> findAllByItemContainingIgnoreCase (String item);
	
	public Optional<Postagem> findByItem(String item);
	
	@Query(value = "select count(item_id) from tb_postagem where item_id = :id", nativeQuery = true)
	public int countPosts2(@Param("id") long id);

	

}
