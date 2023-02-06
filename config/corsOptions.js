import allowedOrigins from './allowedOrigins.js';

const corsOptions = {
    // origin: (origin, callback) => {
    //     if (allowedOrigins.includes(origin) !== -1 || !origin) {
    //         callback(null, true);
    //     } else {
    //         callback(new Error('Not allowed by CORS'));
    //     }
    // },
    origin: allowedOrigins,
    // methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE", "PATCH"],
    credentials: true,
    optionsSuccessStatus: 200
};

export default corsOptions;