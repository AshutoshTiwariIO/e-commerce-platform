package com.ecommerce.dto;

import com.ecommerce.model.User;
import java.time.LocalDateTime;

public class UserProfileResponse {
    private Long id;
    private String email;
    private String displayName;
    private String role;
    private LocalDateTime createdAt;

    public static UserProfileResponse fromUser(User user) {
        UserProfileResponse r = new UserProfileResponse();
        r.id = user.getId();
        r.email = user.getEmail();
        r.displayName = user.getDisplayName();
        r.role = user.getRole();
        r.createdAt = user.getCreatedAt();
        return r;
    }

    public Long getId() { return id; }
    public String getEmail() { return email; }
    public String getDisplayName() { return displayName; }
    public String getRole() { return role; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
