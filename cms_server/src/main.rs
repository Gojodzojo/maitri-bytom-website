use rocket::{
    fs::FileServer,
    http::ContentType,
    response::{self, Responder},
    Request, Response,
};
use std::{env::current_dir, io::Cursor, str::FromStr};

struct Res {
    text: String,
    content_type: Option<String>,
}

impl<'a> Responder<'a, 'static> for Res {
    fn respond_to(self, _: &Request) -> response::Result<'static> {
        let content_type = match self.content_type {
            Some(ct) => ContentType::from_str(&ct).unwrap(),
            None => ContentType::Plain,
        };

        Response::build()
            .header(content_type)
            .sized_body(self.text.len(), Cursor::new(self.text))
            .ok()
    }
}

async fn from_url(url: &str) -> Option<Res> {
    let resp = reqwest::get(url).await.ok()?;
    let headers = resp.headers();
    let content_type = match headers.get("Content-Type") {
        Some(ct) => Some(ct.to_str().unwrap().to_string()),
        None => None,
    };
    let text = resp.text().await.ok()?;

    Some(Res { content_type, text })
}

#[rocket::get("/")]
async fn index() -> Option<Res> {
    let url = "https://raw.githubusercontent.com/Gojodzojo/maitri-bytom-website/main/netlify_cms/index_github_resources.html";
    let mut x = from_url(url).await;

    match &mut x {
        Some(x) => x.content_type = Some("text/html".to_string()),
        None => {}
    };

    x
}

#[rocket::get("/proxy?<path>")]
async fn proxy(path: String) -> Option<Res> {
    from_url(&path).await
}

#[rocket::launch]
fn rocket() -> _ {
    println!("Wejdź na stronę localhost:8000");
    println!();

    let _ = webbrowser::open("http://localhost:8000");

    rocket::build()
        .mount("/", FileServer::from(current_dir().unwrap()))
        .mount("/", rocket::routes![proxy, index])
}
