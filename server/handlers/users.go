package handlers

import (
	"encoding/json"
	"fmt"
	dto "go-batch2/dto/result"
	usersdto "go-batch2/dto/users"
	"go-batch2/models"
	bcryptpkg "go-batch2/pkg/bcrypt"
	"go-batch2/repositories"
	"net/http"
	"os"
	"strconv"

	"github.com/gorilla/mux"
)

type handler struct {
	UserRepository repositories.UserRepository
}

func HandlerUser(UserRepository repositories.UserRepository) *handler {
	return &handler{UserRepository}
}

func (h *handler) GetUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	users, err := h.UserRepository.GetUsers()

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Status: "Failed", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	for i, p := range users {
		users[i].Image = os.Getenv("UPLOAD_PATH_NAME") + p.Image
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "Success", Data: users}
	json.NewEncoder(w).Encode(response)

}

func (h *handler) FindUserById(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	user, err := h.UserRepository.FindUserById(id)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Status: "Failed", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	user.Image = os.Getenv("UPLOAD_PATH_NAME") + user.Image


	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "Success", Data: user}
	json.NewEncoder(w).Encode(response)
}

func (h *handler) UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	dataUpload := r.Context().Value("dataFile")
	filename := ""
	fmt.Println(dataUpload)

	if dataUpload != nil {
		filename = dataUpload.(string)
	}
	
	request := usersdto.UpdateUserRequest{
		FullName: r.FormValue("fullname"),
		Email:    r.FormValue("email"),
		Password: r.FormValue("password"),
		Phone:   r.FormValue("phone"),
		Gender:  r.FormValue("gender"),
		Location: r.FormValue("location"),
		Role: r.FormValue("role"),
		Image: filename,
	} 


	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	user, err := h.UserRepository.FindUserById(int(id))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Status: "Failed", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	password,err := bcryptpkg.HashingPassword(request.Password)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Status: "Failed", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return	
	}
	
	if request.FullName != "" {
		user.FullName = request.FullName
	}

	if request.Email != "" {
		user.Email = request.Email
	}

	if request.Password != "" {
		user.Password = password
	}

	if request.Phone != "" {
		user.Phone = request.Phone
	}

	if request.Gender != "" {
		user.Gender = request.Gender
	}

	if request.Location != "" {
		user.Location = request.Location
	}

	
	if request.Role != "" {
		user.Role = request.Role
	}
	
	if request.Image != "" {
		user.Image = request.Image
	}
	data, err := h.UserRepository.UpdateUser(user, id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Status: "failed", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "success", Data: convertResponse(data)}
	json.NewEncoder(w).Encode(response)

}

// delete
func (h *handler) DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	user := models.User{}

	deletedUser, err := h.UserRepository.DeleteUser(user, id)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Status: "Failed", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "Success", Data: deletedUser}
	json.NewEncoder(w).Encode(response)
}

func convertResponse(u models.User) usersdto.UserResponse {
	return usersdto.UserResponse{
		ID:       u.ID,
		Email:    u.Email,
		Password: u.Password,
		Fullname: u.FullName,
		Gender:   u.Gender,
		Phone:    u.Phone,
		Location: u.Location,
		Role:     u.Role,
		Image:    u.Image,
	}
}

