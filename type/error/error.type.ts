export interface ErrorType{
    401 ?: string;
    400 ?: string;
    403 ?: string;
    404 ?: string;
    422 ?: string;
    500 ?: string;
    502 ?: string;
    503 ?: string;
    default ?: string;
    network ?: string;
    [key : number] : string | undefined;
}

export const DefaultErrorMessage : ErrorType = {
    400 : "잘못된 요청입니다",
    401 : '인증이 필요합니다',
    403 : '접근 권한이 없습니다',
    404 : '요청을 찾을 수 없습니다',
    422 : '입력 데이터를 확인해주세요',
    500 : '서버 오류가 발생했습니다',
    502 : '서버 연결에 문제가 있습니다',
    503 : '서비스를 일시적으로 사용할 수 없습니다',
    default : '알 수 없는 오류가 발생했습니다',
    network : '네트워크 연결을 확인해주세요'
}

export type VaildError = {
    value : boolean,
    message? : string
}