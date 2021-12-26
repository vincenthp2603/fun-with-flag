const socketBaseURL = process.env.NODE_ENV === 'development' ? 'ws://localhost:8080' : '';

export default socketBaseURL;