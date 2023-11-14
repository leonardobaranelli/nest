export interface User {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: number;
    personalId?: number;
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
    token?:string;
    storedToken?:string;
}

export interface UserState {
    isAuthenticated: boolean;
    user: User | null;
    rol:string
  }
