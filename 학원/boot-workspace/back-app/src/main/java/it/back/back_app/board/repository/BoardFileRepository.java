package it.back.back_app.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import it.back.back_app.board.entity.BoardFileEntity;

public interface BoardFileRepository extends JpaRepository<BoardFileEntity, Integer> {
    
}
