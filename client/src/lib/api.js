import api from './axios'

export const projectsApi = {
  getAll: () => api.get('/projects'),
  getBySlug: (slug) => api.get(`/projects/${slug}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  remove: (id) => api.delete(`/projects/${id}`),
}

export const skillsApi = {
  getAll: () => api.get('/skills'),
  create: (data) => api.post('/skills', data),
  update: (id, data) => api.put(`/skills/${id}`, data),
  remove: (id) => api.delete(`/skills/${id}`),
}

export const experienceApi = {
  getAll: () => api.get('/experience'),
  create: (data) => api.post('/experience', data),
  update: (id, data) => api.put(`/experience/${id}`, data),
  remove: (id) => api.delete(`/experience/${id}`),
}

export const educationApi = {
  getAll: () => api.get('/education'),
  create: (data) => api.post('/education', data),
  update: (id, data) => api.put(`/education/${id}`, data),
  remove: (id) => api.delete(`/education/${id}`),
}

export const settingsApi = {
  get: () => api.get('/settings'),
  update: (data) => api.put('/settings', data),
}

export const resumeApi = {
  upload: (file) => {
    const fd = new FormData()
    fd.append('resume', file)
    return api.post('/resume', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
  },
  remove: () => api.delete('/resume'),
}

export const contentApi = {
  getAll: () => api.get('/content'),
}

export const blogApi = {
  getAll: () => api.get('/blog'),
  getBySlug: (slug) => api.get(`/blog/${slug}`),
  create: (data) => api.post('/blog', data),
  update: (id, data) => api.put(`/blog/${id}`, data),
  remove: (id) => api.delete(`/blog/${id}`),
}

export const contactApi = {
  send: (data) => api.post('/contact', data),
}

export const adminApi = {
  login: (credentials) => api.post('/admin/login', credentials),
  getMessages: () => api.get('/admin/messages'),
}

export const chatApi = {
  send: (data) => api.post('/chat', data),
}
