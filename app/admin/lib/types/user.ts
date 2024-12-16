interface RegisterUser {
  userName: string;
  email: string;
  password: string;
}

interface LoginUser {
  email: string;
  password: string;
}


export type { RegisterUser, LoginUser };
