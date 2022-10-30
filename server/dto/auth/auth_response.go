package authdto

type AuthResponse struct {
	Email    string `json:"email"`
	FullName string `json:"fullName"`
	Token    string `json:"token"`
	Role     string `json:"role"`
}

type CheckAuthResponse struct {
	Id    int    `gorm:"type: int" json:"id"`
	Name  string `gorm:"type: varchar(255)" json:"name"`
	Email string `gorm:"type: varchar(255)" json:"email"`
	Role  string `gorm:"type: varchar(255)"  json:"role"`
}
