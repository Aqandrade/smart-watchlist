package requests

type UpdateSubscriptionStatusRequest struct {
	Active *bool `json:"active" binding:"required"`
}
