use askama::Template;

#[derive(Template)]
#[template(path = "home.html")]
pub struct HomeTemplate {
    pub title: &'static str,
    pub description: &'static str,
}

#[derive(Template)]
#[template(path = "learn.html")]
pub struct LearnTemplate {
    pub topic: &'static str,
    pub content: &'static str,
}
