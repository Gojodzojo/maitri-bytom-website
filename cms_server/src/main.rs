use rocket::fs::FileServer;
use std::env::current_dir;

#[rocket::get("/proxy?<path>")]
async fn proxy(path: String) -> Option<String> {
    reqwest::get(path).await.ok()?.text().await.ok()
}

#[rocket::launch]
fn rocket() -> _ {
    println!("Wejdź na stronę localhost:8000");
    rocket::build()
        .mount("/", rocket::routes![proxy])
        .mount("/", FileServer::from(current_dir().unwrap()))
}
