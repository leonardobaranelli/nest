enum Rols {
    admin = "admin",
    user = "user",
  }
  type RolType = Rols;

export interface User {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: number;
    personalId?: number;
//<<<<<<< nueva_rama_para_trabajar
    rol?: string;
//=======
//    rol:RolType;
//>>>>>>> dev
}  

export interface Register {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: number;
    personalId?: number;
}

export interface Login {
    email: string;
    password: string;
}

export interface UserState {
    isAuthenticated: boolean;
    user: User | null;
    keys: { token: string, email: string, responseData?:string, cookies?:string  } | null;
  }
