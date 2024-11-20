interface UserResponse {
  ok: boolean
  user: User
}

interface User {
  email: string
  lastname: string
  name: string
}

export {UserResponse, User}
