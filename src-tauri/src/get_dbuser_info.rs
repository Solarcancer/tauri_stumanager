use mysql_async::prelude::*;
use mysql_async::Pool;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, FromRow)]
pub struct UseInfoType {
    pub name: String,
    pub userid: String,
    pub email: String,
    pub signature: String,
    pub introduction: String,
    pub title: String,
    pub token: String,
    pub role: String,
}

#[derive(Debug, FromRow)]
pub struct UserLoginInfo {
    pub username: String,
    pub userpassword: String,
}

pub async fn get_user_info(username: &str) -> Result<Option<(UserLoginInfo, UseInfoType)>, mysql_async::Error> {
    let database_url = "mysql://root:swjtu2048@47.113.231.58:56888/DBCOURSE";
    let pool = Pool::new(database_url);
    let mut conn = pool.get_conn().await?;

    let login_info: Option<UserLoginInfo> = conn
        .exec_first(
            "SELECT username, userpassword FROM loginUser WHERE username = :username",
            params! {
                "username" => username,
            },
        )
        .await?;

    if let Some(login_info) = login_info {
        let user_info: Option<UseInfoType> = conn
            .exec_first(
                "SELECT name, userid, email, signature, introduction, title, token, role FROM userInfo WHERE username = :username",
                params! {
                    "username" => username,
                },
            )
            .await?;

        if let Some(user_info) = user_info {
            return Ok(Some((login_info, user_info)));
        }
    }

    Ok(None)
}
