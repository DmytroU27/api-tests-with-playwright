import 'dotenv/config';

export const getApiKey = () => {
    const NASA_API_KEY = process.env.NASA_API_KEY;
    if (!NASA_API_KEY) {
        throw new Error('NASA_API_KEY is not set in the environment variables!');
    }
    return NASA_API_KEY;
}