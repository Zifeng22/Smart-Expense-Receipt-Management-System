package com.example.demo;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpensesRepository extends JpaRepository<Expenses, Long> {
    List<Expenses> findByUser_Userid(Long userid);
}
