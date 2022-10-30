package usersdto

type UserResponse struct {
	ID       int    `json:"id"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Fullname string `json:"fullname"`
	Gender   string `json:"gender"`
	Phone    string `json:"phone"`
	Location string `json:"location"`
	Role     string `json:"role"`
	Image    string `json:"image"`
}