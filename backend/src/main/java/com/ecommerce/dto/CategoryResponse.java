package com.ecommerce.dto;

import com.ecommerce.model.Category;

public class CategoryResponse {
    private Long id;
    private String name;

    public static CategoryResponse fromCategory(Category c) {
        CategoryResponse r = new CategoryResponse();
        r.id = c.getId();
        r.name = c.getName();
        return r;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
}
