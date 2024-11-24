import { useMessage } from '@/hooks/web/useMessage';
//import { deffHttp } from '@/utils/axios';
import { invoke } from '@tauri-apps/api/core';
import type { RoleEnum } from '@/enum/role';
const { createErrorModal, createErrorMsg } = useMessage();

export interface UseInfoType {
  name: string;
  userid: string;
  email: string;
  signature: string;
  introduction: string;
  title: string;
  token: string;
  role: RoleEnum;
}

export interface UserInfoResponse {
  code: number;
  data: UseInfoType | null;
  message: string;
}

export interface UserParams {
  username: string;
  password: string;
}

/* export const getUserInfo = (user: string, pwd: string) =>
  deffHttp.post<UseInfoType, UserParams>(
    {
      url: '/mock_api/login',
      data: { username: user, password: pwd },
    },
    { errorMessageMode: 'modal', withToken: false },
  ); */
export const getUserInfo = async (username: string, password: string): Promise<UserInfoResponse> => {
  try {
    const response = await invoke<UserInfoResponse>('login', { user: { username, password } });
    if (response.code !== 1) {
      createErrorModal(response.message);
    }
    return response;
  } catch (error) {
    createErrorModal(error as string);
    return { code: -1, data: null, message: error as string };
  }
};
