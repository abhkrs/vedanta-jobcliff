import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Create Axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

const getToken = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return token;
  }
  return null;
};


// =========================
// 🔐 Login API
// =========================
export const login = async (data) => {
  try {
    const response = await api.post("/employees/users/login", data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || "Something went wrong",
      };
    }
    return { status: false, message: "Network error" };
  }
};

// =========================
// 📝 Register API (multipart form-data)
// =========================
export const register = async ({ fullName, email, phone, designation, password, resume, whatsappAlerts }) => {
  try {
    const formData = new FormData();
    formData.append("full_name", fullName || "");
    formData.append("email", email || "");
    formData.append("phone_number", phone || "");
    if (password) formData.append("password", password);
    formData.append("designation", designation || "");
    formData.append("whatsapp_alert", String(Boolean(whatsappAlerts)));
    if (resume) {
      formData.append("resume", resume);
    }

    // Let axios set Content-Type (with boundary) for multipart/form-data
    const response = await api.post("/employees/users", formData, {
      // no explicit Content-Type
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || "Something went wrong",
        errors: error.response.data.errors || undefined,
      };
    }
    return { status: false, message: "Network error" };
  }
};

// =========================
// 📝 Profile Details API (multipart form-data)
// =========================
export const submitProfileDetails = async ({ personalData, educationEntries, workEntries, selectedSkills, selectedCertifications, resume }) => {
  try {
    const token = getToken();

    const formData = new FormData();
    // Personal
    formData.append('first_name', personalData.firstName);
    formData.append('last_name', personalData.lastName);
    formData.append('email', personalData.email);
    formData.append('country', personalData.country);
    formData.append('state', personalData.state);
    formData.append('city', personalData.city);
    formData.append('designation', personalData.designation);
    formData.append('mobile', personalData.mobile);
    formData.append('whatsapp_alert', String(Boolean(personalData.whatsappAlerts)));
    // Education
    formData.append('education', JSON.stringify(educationEntries));
    // Work
    formData.append('work', JSON.stringify(workEntries));
    // Skills/Certifications
    formData.append('skills', JSON.stringify(selectedSkills));
    formData.append('certifications', JSON.stringify(selectedCertifications));
    // Resume
    if (resume) formData.append('resume', resume);

    // Let Axios set Content-Type with the proper boundary
    const response = await api.post('/employees/users/profile-details', formData, {
     headers: {
        "employee-token": token || "",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || 'Something went wrong',
        errors: error.response.data.errors || undefined,
      };
    }
    return { status: false, message: 'Network error' };
  }
};

// =========================
// 📝 Fetch Profile Details API
// =========================
export const fetchProfileDetails = async () => {
  try {
    const token = getToken();
    const response = await api.get('/employees/users/get-detail', {
      headers: {
        "employee-token": token || "",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || 'Something went wrong',
        errors: error.response.data.errors || undefined,
      };
    }
    return { status: false, message: 'Network error' };
  }
};

// =========================
// 📚 Public lookups (no auth required)
// =========================
export const fetchSkills = async () => {
  try {
    // Assumes an endpoint that returns available skills
    const response = await api.get('/common/skills');
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || 'Something went wrong',
        errors: error.response.data.errors || undefined,
      };
    }
    return { status: false, message: 'Network error' };
  }
};

export const fetchCertifications = async () => {
  try {
    // Assumes an endpoint that returns available certifications
    const response = await api.get('/common/certificates');
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || 'Something went wrong',
        errors: error.response.data.errors || undefined,
      };
    }
    return { status: false, message: 'Network error' };
  }
};

export const fetchstates = async () => {
  try {
    // Assumes an endpoint that returns available certifications
    const response = await api.get('/common/states');
    
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || 'Something went wrong',
        errors: error.response.data.errors || undefined,
      };
    }
    return { status: false, message: 'Network error' };
  }
};

export const getcity = async (state_name) => {
  try {
    const response = await api.post('/common/cities', { state_name });
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || 'Something went wrong',
        errors: error.response.data.errors || undefined,
      };
    }
    return { status: false, message: 'Network error' };
  }
};

// =========================
// 📊 Job Statistics API
// =========================
export const fetchJobStats = async () => {
  try {
    const token = getToken();
    const response = await api.get('/employees/jobs/jobs/stats', {
      headers: {
        "employee-token": token || "",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || 'Something went wrong',
        errors: error.response.data.errors || undefined,
      };
    }
    return { status: false, message: 'Network error' };
  }
};

// =========================
// 📋 Jobs List API
// =========================
export const fetchJobs = async (filters = {}, page = 1, limit = 10) => {
  try {
    const token = getToken();
    
    // Build query parameters
    const params = new URLSearchParams();
    
    // Add pagination parameters
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    // Add filter parameters
    if (filters.location) params.append('location', filters.location);
    if (filters.skills) params.append('skills', filters.skills);
    if (filters.applicationProgress) params.append('application_progress', filters.applicationProgress);
    if (filters.salary) params.append('salary', filters.salary);
    if (filters.job_name) params.append('job_name', filters.job_name);
    if (filters.status) params.append('status', filters.status);
    
    const response = await api.get(`/employees/jobs/jobs?${params.toString()}`, {
      headers: {
        "employee-token": token || "",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || 'Something went wrong',
        errors: error.response.data.errors || undefined,
      };
    }
    return { status: false, message: 'Network error' };
  }
};

// =========================
// 💾 Saved Jobs API
// =========================
export const fetchSavedJobs = async (page = 1, limit = 10, filters = {}) => {
  try {
    const token = getToken();
    
    // Build query parameters
    const params = new URLSearchParams();
    
    // Add pagination parameters
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    // Add filter parameters
    if (filters.job_name) params.append('job_name', filters.job_name);
    if (filters.location) params.append('location', filters.location);
    if (filters.skills) params.append('skills', filters.skills);
    if (filters.salary) params.append('salary', filters.salary);
    
    const response = await api.get(`/employees/jobs/jobs/saved-jobs?${params.toString()}`, {
      headers: {
        "employee-token": token || "",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || 'Something went wrong',
        errors: error.response.data.errors || undefined,
      };
    }
    return { status: false, message: 'Network error' };
  }
};

// =========================
// 📥 Jobs Export API
// =========================
export const exportJobs = async (filters = {}) => {
  try {
    const token = getToken();
    
    // Build query parameters
    const params = new URLSearchParams();
    
    // Add filter parameters
    if (filters.location) params.append('location', filters.location);
    if (filters.skills) params.append('skills', filters.skills);
    if (filters.applicationProgress) params.append('application_progress', filters.applicationProgress);
    if (filters.salary) params.append('salary', filters.salary);
    if (filters.job_name) params.append('job_name', filters.job_name);
    if (filters.status) params.append('status', filters.status);
    
    const response = await api.get(`/employees/jobs/jobs/export?${params.toString()}`, {
      headers: {
        "employee-token": token || "",
      },
      responseType: 'blob', // Important for file downloads
    });
    
    return {
      success: true,
      data: response.data,
      headers: response.headers
    };
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || 'Something went wrong',
        errors: error.response.data.errors || undefined,
      };
    }
    return { status: false, message: 'Network error' };
  }
};

// =========================
// 📄 Job Detail API
// =========================
export const fetchJobDetail = async (jobId) => {
  try {
    const token = getToken();
    const response = await api.get(`/employees/jobs/jobs/${jobId}`, {
      headers: {
        "employee-token": token || "",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || 'Something went wrong',
        errors: error.response.data.errors || undefined,
      };
    }
    return { status: false, message: 'Network error' };
  }
};

// =========================
// 📝 Apply Job API
// =========================
export const applyJob = async (jobId) => {
  try {
    const token = getToken();
    const response = await api.post(`/employees/jobs/jobs/${jobId}/apply`, {}, {
      headers: {
        "employee-token": token || "",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || 'Something went wrong',
        errors: error.response.data.errors || undefined,
      };
    }
    return { status: false, message: 'Network error' };
  }
};

// =========================
// 💾 Save Job API
// =========================
export const saveJob = async (jobId) => {
  try {
    const token = getToken();
    const response = await api.post(`/employees/jobs/jobs/${jobId}/save`, {}, {
      headers: {
        "employee-token": token || "",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || 'Something went wrong',
        errors: error.response.data.errors || undefined,
      };
    }
    return { status: false, message: 'Network error' };
  }
};

// =========================
// 🗑️ Unsave Job API
// =========================
export const unsaveJob = async (jobId) => {
  try {
    const token = getToken();
    const response = await api.delete(`/employees/jobs/jobs/${jobId}/save`, {
      headers: {
        "employee-token": token || "",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || 'Something went wrong',
        errors: error.response.data.errors || undefined,
      };
    }
    return { status: false, message: 'Network error' };
  }
};

// =========================
// 📋 Assignment APIs
// =========================
export const fetchAssignments = async (page = 1, limit = 10, filters = {}) => {
  try {
    const token = getToken();
    
    // Build query parameters
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    // Add filter parameters
    if (filters.assignment_status) params.append('assignment_status', filters.assignment_status);
    if (filters.job_name) params.append('job_name', filters.job_name);
    if (filters.location) params.append('location', filters.location);
    if (filters.skills) params.append('skills', filters.skills);
    if (filters.salary) params.append('salary', filters.salary);
    
    const response = await api.get(`/employees/assignments/assignments?${params.toString()}`, {
      headers: {
        "employee-token": token || "",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || 'Something went wrong',
        errors: error.response.data.errors || undefined,
      };
    }
    return { status: false, message: 'Network error' };
  }
};

// =========================
// 📝 Submit Assignment API (multipart form-data)
// =========================
export const submitAssignment = async (assignmentId, submissionData) => {
  try {
    const token = getToken();
    
    // Create FormData for multipart submission
    const formData = new FormData();
    
    // Add message to form data
    if (submissionData.message) {
      formData.append('message', submissionData.message);
    }
    
    // Add attachment if provided
    if (submissionData.attachment) {
      formData.append('attachment', submissionData.attachment);
    }
    
    const response = await api.post(`/employees/assignments/assignments/${assignmentId}/submit`, formData, {
      headers: {
        "employee-token": token || "",
        // Let axios set Content-Type with proper boundary for multipart/form-data
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || 'Something went wrong',
        errors: error.response.data.errors || undefined,
      };
    }
    return { status: false, message: 'Network error' };
  }
};

// =========================
// 📋 Interview APIs
// =========================
export const fetchInterviews = async (page = 1, limit = 10, filters = {}) => {
  try {
    const token = getToken();
    
    // Build query parameters
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    // Add filter parameters
    if (filters.status) params.append('status', filters.status);
    if (filters.job_name) params.append('job_name', filters.job_name);
    if (filters.location) params.append('location', filters.location);
    if (filters.skills) params.append('skills', filters.skills);
    if (filters.salary) params.append('salary', filters.salary);
    if (filters.interview_type) params.append('interview_type', filters.interview_type);
    if (filters.interview_date_from) params.append('interview_date_from', filters.interview_date_from);
    if (filters.interview_date_to) params.append('interview_date_to', filters.interview_date_to);
    if (filters.created_from) params.append('created_from', filters.created_from);
    if (filters.created_to) params.append('created_to', filters.created_to);
    
    const response = await api.get(`/employees/interviews/interviews?${params.toString()}`, {
      headers: {
        "employee-token": token || "",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || 'Something went wrong',
        errors: error.response.data.errors || undefined,
      };
    }
    return { status: false, message: 'Network error' };
  }
};

// =========================
// 📝 Submit Interview API (multipart form-data)
// =========================
export const submitInterview = async (interviewId, submissionData) => {
  try {
    const token = getToken();
    
    // Create FormData for multipart submission
    const formData = new FormData();
    
    // Add message to form data
    if (submissionData.message) {
      formData.append('message', submissionData.message);
    }
    
    // Add attachment if provided
    if (submissionData.attachment) {
      formData.append('attachment', submissionData.attachment);
    }
    
    const response = await api.post(`/employees/interviews/interviews/${interviewId}/submit`, formData, {
      headers: {
        "employee-token": token || "",
        // Let axios set Content-Type with proper boundary for multipart/form-data
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || 'Something went wrong',
        errors: error.response.data.errors || undefined,
      };
    }
    return { status: false, message: 'Network error' };
  }
};

// =========================
// 📄 Interview Detail API
// =========================
export const fetchInterviewDetail = async (interviewId) => {
  try {
    const token = getToken();
    const response = await api.get(`/employees/interviews/interviews/${interviewId}`, {
      headers: {
        "employee-token": token || "",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || 'Something went wrong',
        errors: error.response.data.errors || undefined,
      };
    }
    return { status: false, message: 'Network error' };
  }
};

// =========================
// ✅❌ Update Interview Status API (Accept/Reject)
// =========================
export const updateInterviewStatus = async (interviewId, status, reason = '') => {
  try {
    const token = getToken();
    const response = await api.put(`/employees/interviews/interviews/${interviewId}/status`, {
      status: status,
      reason: reason
    }, {
      headers: {
        "employee-token": token || "",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || 'Something went wrong',
        errors: error.response.data.errors || undefined,
      };
    }
    return { status: false, message: 'Network error' };
  }
};