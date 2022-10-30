package authdto

type AuthResponse struct {
	Email    string `json:"email"`
	FullName string `json:"fullName"`
	Token    string `json:"token"`
	Role     string `json:"role"`
}

type CheckAuthResponse struct {
	Id       int    `json:"id"`
	Email    string `json:"email"`
	FullName string `json:"fullName"`
	Password string `json:"password"`
	Gender   string `json:"gender"`
	Phone    string `json:"phone"`
	Role     string `json:"role"`
	Image    string `json:"image"`
}
