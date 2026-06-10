package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
public class ExpensesController {

    @Autowired
    private ExpensesRepository repo;

    @PostMapping("/expenses")
    public Expenses CreateExpense(@RequestBody Expenses exp){
        return repo.save(exp);
    }

    @GetMapping("/expenses/{user_id}")
    public List<Expenses> getExpense(@PathVariable Long user_id){
        return repo.findByUser_Userid(user_id);
    }

    @PutMapping("/expenses/{id}")
    public Expenses updateExpenses(@PathVariable Long id ,@RequestBody Expenses exp){
        
        Expenses existing = repo.findById(id).orElseThrow(() -> new RuntimeException("Expense not found"));

        existing.setCategory(exp.getCategory());
        existing.setDate(exp.getDate());
        existing.setAmount(exp.getAmount());
        existing.setDescription(exp.getDescription());
        
        return repo.save(existing);
    }

    @DeleteMapping("/expenses/{id}")
    public String deleteExpenses(@PathVariable Long id){
        repo.deleteById(id);
        return "Deleted successfully";
    }
}
