import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';  // Django's default port

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,  // Important for handling cookies
});

// Example API functions
export const attendanceApi = {
    // Get attendance records
    getAttendance: () => api.get('/attendance/'),
    
    // Create attendance record
    createAttendance: (data: any) => api.post('/create/', data),
    
    // Update attendance record
    updateAttendance: (id: number, data: any) => api.put(`/edit/${id}`, data),
    
    // Delete attendance record
    deleteAttendance: (id: number) => api.delete(`/delete/${id}`),
};

export default api; 