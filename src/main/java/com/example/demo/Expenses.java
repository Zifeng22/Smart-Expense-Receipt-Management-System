package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity     //link to database table
@Table(name = "expenses")

public class Expenses {

    @Id    //pk
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String category;
    private String date;
    private double amount;
    private String description ;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Expenses(){

    }

    public Expenses(Long id, String category, String date, double amount, String description){
        this.id = id;
        this.category = category;
        this.date = date;
        this.amount = amount;
        this.description  = description ;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getAmount(){
        return amount;
    }

    public void setAmount(double amount){
        this.amount = amount;
    }

    public String getDescription(){
        return description ;
    }

    public void setDescription(String description ){
        this.description  = description ;
    }


}
