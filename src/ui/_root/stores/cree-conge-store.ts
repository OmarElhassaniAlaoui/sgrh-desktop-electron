import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  username: string;
  isAuthenticated: boolean;
}

interface AuthStore {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      login: async (username: string, password: string) => {
        // For demo purposes, hardcoded credentials
        if (username === 'admin' && password === 'admin') {
          set({ user: { username, isAuthenticated: true } });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

interface Employee {
  id: string;
  matricule: string;
  nom_fr: string;
  department: string;
}

interface LeaveRequest {
  id: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  type: string;
  notes?: string;
}

interface LeaveStore {
  requests: LeaveRequest[];
  employees: Employee[];
  addRequest: (request: Omit<LeaveRequest, 'id' | 'status'>) => Promise<boolean>;
  updateRequestStatus: (id: string, status: LeaveRequest['status']) => void;
}

// Mock employee data
const mockEmployees = [
  { id: '1', matricule: 'EMP001', nom_fr: 'John Doe', department: 'IT' },
  { id: '2', matricule: 'EMP002', nom_fr: 'Jane Smith', department: 'HR' },
  { id: '3', matricule: 'EMP003', nom_fr: 'Ahmed Alami', department: 'Finance' },
];

export const useLeaveStore = create<LeaveStore>()((set) => ({
  requests: [],
  employees: mockEmployees,
  addRequest: async (request) => {
    try {
      // Simulate API call
      console.log('Creating leave request:', request);
      
      // In a real app, this would be an API call
      // await fetch('/api/leave_requests', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(request),
      // });

      set((state) => ({
        requests: [
          ...state.requests,
          { 
            ...request, 
            id: Math.random().toString(36).substring(7),
            status: 'pending'
          },
        ],
      }));
      return true;
    } catch (error) {
      console.error('Error creating leave request:', error);
      return false;
    }
  },
  updateRequestStatus: (id, status) =>
    set((state) => ({
      requests: state.requests.map((request) =>
        request.id === id ? { ...request, status } : request
      ),
    })),
}));