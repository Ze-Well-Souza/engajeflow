
export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  is_admin: boolean;
}

export interface AuthContextType {
  currentUser: UserProfile | null;
  session: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string, token?: string) => Promise<void>;
}
