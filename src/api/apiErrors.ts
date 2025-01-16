// Define error types
export enum ApiErrorType {
    NOT_FOUND = "NOT_FOUND",
    UNAUTHORIZED = "UNAUTHORIZED",
    SERVER_ERROR = "SERVER_ERROR",
    BAD_REQUEST = "BAD_REQUEST",
    // Add more as needed
}

// ApiError class
export class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
        public type: ApiErrorType
    ) {
        super(message);
        this.name = "ApiError";
    }
}

// Error factory function
export function createApiError(status: number, message: string): ApiError {
    let type: ApiErrorType;
    switch (status) {
        case 400:
            type = ApiErrorType.BAD_REQUEST;
            break;
        case 401:
        case 403:
            type = ApiErrorType.UNAUTHORIZED;
            break;
        case 404:
            type = ApiErrorType.NOT_FOUND;
            break;
        default:
            type = ApiErrorType.SERVER_ERROR;
    }
    return new ApiError(status, message, type);
}
