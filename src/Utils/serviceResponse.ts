export type ServiceMessage =  {message: string};

type ServiceResponseErrorType = 'INVALID_DATA'
| 'NOT_FOUND' 
| 'CONFLICT' 
| 'UNAUTHORIZED' 
| 'INTERNAL_SERVER_ERROR' 
| 'UNPROCESSABLE_ENTITY';

export type ServiceResponseError = {
  status: ServiceResponseErrorType;
  data: ServiceMessage;
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL' | 'CREATED';
  data: T;
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;