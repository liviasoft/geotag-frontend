export type User = {
  id: string;
  email: string | null;
  emailVisibility: boolean | null;
  verified: boolean | null;
  username: string | null;
  phone: string | null;
  phoneData?: {[key: string]: any};
  avatar: string | null;
  avatarUrl: string | null;
  roles?: UserRole[];
  created: Date;
  updated: Date | null;
}

export type UserRole = {
  id: string;
  name: string;
  isDefault: boolean;
  active: boolean;
  requiresAuth: boolean;
  description: string | null;
}