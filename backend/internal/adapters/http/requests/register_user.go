package requests

type RegisterUserRequest struct {
	Name            string `json:"name"             binding:"required"`
	Username        string `json:"username"         binding:"required"`
	Email           string `json:"email"            binding:"required,email"`
	Password        string `json:"password"         binding:"required"`
	ConfirmPassword string `json:"confirm_password" binding:"required"`
}
