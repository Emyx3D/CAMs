export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
  googleId?: string;
  twoFactorEnabled?: boolean;
  campusAccess: string[]; // Campus IDs user has access to
}

export type UserRole = 
  | 'campus_admin'
  | 'maintenance_supervisor'
  | 'technician'
  | 'staff';

export interface Campus {
  id: string;
  name: string;
  location: string;
  address: string;
  adminIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Asset {
  id: string;
  name: string;
  campusId: string;
  category: AssetCategory;
  subCategory: string;
  location: string;
  status: 'operational' | 'maintenance' | 'repair' | 'offline';
  lastMaintenance: string;
  nextMaintenance: string;
  assignedTo?: string;
}

export type AssetCategory = 
  | 'buildings'
  | 'electrical'
  | 'hvac'
  | 'safety'
  | 'it'
  | 'vehicles'
  | 'furniture'
  | 'specialized'
  | 'maintenance';

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (email?: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  campus_admin: 'Campus Administrator',
  maintenance_supervisor: 'Maintenance Supervisor',
  technician: 'Technician',
  staff: 'Staff Member'
};