use axum::response::Html;
use crate::templates::{HomeTemplate, LearnTemplate};

pub async fn home() -> Html<String> {
    let template = HomeTemplate {
        title: "Rust Gym App",
        description: "Built with Axum and Askama",
    };
    
    Html(template.render().unwrap())
}

pub async fn learn() -> Html<String> {
    let template = LearnTemplate {
        topic: "Rust Web Development",
        content: "Learn how to build web applications with Rust!",
    };
    
    Html(template.render().unwrap())
}

pub async fn examples() -> Html<&'static str> {
    Html(
        r#"
        <h1>Examples</h1>
        <p>Check out various Rust web development examples.</p>
        <a href="/">Back to Home</a>
        "#
    )
}

pub async fn docs() -> Html<&'static str> {
    Html(
        r#"
        <h1>Documentation</h1>
        <p>Learn more about Rust web frameworks.</p>
        <a href="/">Back to Home</a>
        "#
    )
}
