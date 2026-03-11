package requests

type CreateExampleRequest struct {
	Name string `json:"name" binding:"required"`
}
