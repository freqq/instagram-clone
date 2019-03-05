package com.freq.auth.payload;

public class UserSummary {
    private Long id;
    private String username;
    private String name;
    private String imagePath;

    public UserSummary(){}

    public UserSummary(Long id, String username, String name, String imagePath) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.imagePath = imagePath;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}