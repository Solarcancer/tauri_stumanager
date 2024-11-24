use serde::{Deserialize, Serialize};
use tauri::command;
use crate::get_dbuser_info::{get_user_info, UseInfoType};

#[derive(Serialize, Deserialize)]
pub struct UserParams {
    username: String,
    password: String,
}

#[derive(Serialize, Deserialize)]
pub struct UserInfoResponse {
    code: i32,
    data: Option<UseInfoType>,
    message: String,
}

#[command]
pub async fn login(user: UserParams) -> Result<UserInfoResponse, String> {
    match get_user_info(&user.username).await {
        Ok(Some((login_info, user_info))) => {
            if login_info.userpassword == user.password {
                Ok(UserInfoResponse {
                    code: 1,
                    data: Some(user_info),
                    message: "ok".to_string(),
                })
            } else {
                Ok(UserInfoResponse {
                    code: -1,
                    data: None,
                    message: "账号密码错误".to_string(),
                })
            }
        }
        Ok(None) => Ok(UserInfoResponse {
            code: -1,
            data: None,
            message: "用户不存在".to_string(),
        }),
        Err(err) => Err(format!("数据库错误: {}", err)),
    }
}