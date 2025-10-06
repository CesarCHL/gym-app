# Quick Start Guide - Spring Boot Gym App

## 🚀 Getting Started in 3 Steps

### 1. Prerequisites
Make sure you have installed:
- **Java 17** or higher
- **Maven 3.6+**

Check your installation:
```bash
java -version
mvn -version
```

### 2. Run the Application
```bash
# Navigate to project directory
cd gym-app

# Run with Maven
mvn spring-boot:run
```

The application will start on: **http://localhost:8080**

### 3. Access the Application
Open your web browser and go to:
```
http://localhost:8080
```

## 📦 Building the Application

### Create an executable JAR
```bash
mvn clean package
```

### Run the JAR file
```bash
java -jar target/gym-app-0.1.0.jar
```

## 🧪 Running Tests

```bash
# Run all tests
mvn test

# Run tests with build
mvn clean verify
```

## 📝 Making Changes

### Modify the Home Page
Edit the template file:
```
src/main/resources/templates/index.html
```

### Modify the Styles
Edit the CSS file:
```
src/main/resources/static/css/styles.css
```

### Add New Controllers
Create new controllers in:
```
src/main/java/com/gym/app/controller/
```

### Change Server Port
Edit `src/main/resources/application.properties`:
```properties
server.port=8080  # Change to your desired port
```

## 🛠️ Development Tips

### Auto-reload (Hot Reload)
The application includes Spring DevTools for automatic restart when you make changes. Just:
1. Make your changes
2. Save the file
3. Maven will automatically recompile and restart the app

### Debugging
Run with debug enabled:
```bash
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005"
```

Then attach your IDE debugger to port 5005.

### View Application Logs
Logs are displayed in the console. To change log level, edit `application.properties`:
```properties
logging.level.com.gym.app=DEBUG
```

## 📚 Project Structure

```
gym-app/
├── src/
│   ├── main/
│   │   ├── java/              # Java source files
│   │   │   └── com/gym/app/
│   │   │       ├── GymApplication.java        # Main class
│   │   │       └── controller/                # Controllers
│   │   └── resources/
│   │       ├── templates/     # HTML templates (Thymeleaf)
│   │       ├── static/        # CSS, JS, images
│   │       └── application.properties         # Configuration
│   └── test/                  # Test files
├── pom.xml                    # Maven configuration
└── README.md                  # Documentation
```

## 🎯 Common Tasks

### Add a New Page
1. Create a new controller method
2. Create a new Thymeleaf template in `templates/`
3. Add CSS styling if needed

Example:
```java
@GetMapping("/about")
public String about(Model model) {
    return "about";  // Will look for templates/about.html
}
```

### Add Static Resources
Place files in:
- CSS: `src/main/resources/static/css/`
- JavaScript: `src/main/resources/static/js/`
- Images: `src/main/resources/static/images/`

Access in templates:
```html
<link rel="stylesheet" th:href="@{/css/styles.css}">
<img th:src="@{/images/logo.png}" alt="Logo">
```

## 🔧 Troubleshooting

### Port Already in Use
If port 8080 is busy, change it in `application.properties`:
```properties
server.port=8081
```

### Build Fails
Clean and rebuild:
```bash
mvn clean install
```

### Tests Fail
Run tests with more details:
```bash
mvn test -X
```

## 📖 Learn More

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Thymeleaf Documentation](https://www.thymeleaf.org/documentation.html)
- [Maven Documentation](https://maven.apache.org/guides/)

## 🆘 Need Help?

Check out:
- `README.md` - Full documentation
- `MIGRATION.md` - Details about the Next.js to Spring Boot conversion
- [Spring Boot Guides](https://spring.io/guides)
