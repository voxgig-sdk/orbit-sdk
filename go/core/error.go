package core

type OrbitError struct {
	IsOrbitError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewOrbitError(code string, msg string, ctx *Context) *OrbitError {
	return &OrbitError{
		IsOrbitError: true,
		Sdk:              "Orbit",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *OrbitError) Error() string {
	return e.Msg
}
