package requests

type UpdateWatchlistItemStatusRequest struct {
	Status string `json:"status" binding:"required"`
}
