package application

import (
	"database/sql"
)

type Container struct {
}

func NewContainer(db *sql.DB) *Container {
	return &Container{}
}
