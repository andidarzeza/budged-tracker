package com.adprod.inventar.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
public class Incoming {

    @Id
    private String id;
    private Date createdTime = new Date();
    private String name;
    private Double incoming;
    private String description;
    private String categoryID;
    private String user;

    public Incoming(String id, String name, Double incoming, String description, String categoryID, String user) {
        this.id = id;
        this.name = name;
        this.incoming = incoming;
        this.description = description;
        this.categoryID = categoryID;
        this.user = user;
    }

    public Incoming() {
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }

    public Double getIncoming() {
        return incoming;
    }

    public void setIncoming(Double incoming) {
        this.incoming = incoming;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategoryID() {
        return categoryID;
    }

    public void setCategoryID(String categoryID) {
        this.categoryID = categoryID;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }
}
