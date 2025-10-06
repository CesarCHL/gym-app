use askama::DynTemplate;
use axum::response::Html;
use crate::templates::{HomeTemplate, LearnTemplate};

pub async fn home() -> Html<String> {
    let template = HomeTemplate {
        title: "Rust Gym App",
        description: "Built with Axum and Askama",
    };
    
    Html(template.dyn_render().unwrap())
}

pub async fn learn() -> Html<String> {
    let template = LearnTemplate {
        topic: "Rust Web Development",
        content: "Learn how to build web applications with Rust!",
    };
    
    Html(template.dyn_render().unwrap())
}
