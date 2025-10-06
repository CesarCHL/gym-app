# Gym App - Spring Boot

This is a Spring Boot web application for gym management.

## Prerequisites

- Java 17 or higher
- Maven 3.6+

## Getting Started

### Run the application

```bash
# Using Maven
mvn spring-boot:run

# Or build and run the JAR
mvn clean package
java -jar target/gym-app-0.1.0.jar
```

Open [http://localhost:8080](http://localhost:8080) with your browser to see the application.

You can start editing the page by modifying `src/main/resources/templates/index.html` or the controller at `src/main/java/com/gym/app/controller/HomeController.java`.

## Project Structure

```
gym-app/
├── src/
│   ├── main/
│   │   ├── java/com/gym/app/
│   │   │   ├── GymApplication.java          # Main application class
│   │   │   └── controller/
│   │   │       └── HomeController.java       # Home page controller
│   │   └── resources/
│   │       ├── templates/
│   │       │   └── index.html               # Thymeleaf template
│   │       ├── static/css/
│   │       │   └── styles.css               # CSS styles
│   │       └── application.properties        # Configuration
│   └── test/                                # Test files
└── pom.xml                                  # Maven configuration
```

## Building for Production

```bash
mvn clean package
```

The executable JAR will be created in the `target/` directory.

## Running Tests

```bash
mvn test
```

## Learn More

To learn more about Spring Boot, check out these resources:

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Boot Guides](https://spring.io/guides)
- [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)

## Technology Stack

- **Spring Boot 3.2.0** - Application framework
- **Thymeleaf** - Template engine for HTML rendering
- **Maven** - Build and dependency management
- **Java 17** - Programming language
