export interface User {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface Post {
  title: string;
  author: string;
  text: string;
  date: Date;
  id?: string;
}
