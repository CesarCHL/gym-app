# Migration from Next.js to Spring Boot

This document explains the migration from the original Next.js application to Spring Boot.

## Overview

The application has been converted from a Next.js (React) frontend framework to a Spring Boot Java web application with Thymeleaf templates. The visual design and functionality remain similar.

## Key Changes

### Technology Stack

**Before (Next.js):**
- Next.js 15.5.4
- React 19.1.0
- TypeScript
- Tailwind CSS
- Node.js runtime

**After (Spring Boot):**
- Spring Boot 3.2.0
- Java 17
- Thymeleaf template engine
- Custom CSS
- Maven build system

### File Structure Comparison

**Next.js Structure:**
```
src/app/
├── page.tsx          # Main page component
├── layout.tsx        # Root layout
└── globals.css       # Global styles
```

**Spring Boot Structure:**
```
src/main/
├── java/com/gym/app/
│   ├── GymApplication.java              # Main application
│   └── controller/
│       └── HomeController.java          # Home controller
└── resources/
    ├── templates/
    │   └── index.html                   # Thymeleaf template
    ├── static/css/
    │   └── styles.css                   # CSS styles
    └── application.properties           # Configuration
```

### Component Mapping

| Next.js | Spring Boot | Description |
|---------|-------------|-------------|
| `src/app/page.tsx` | `src/main/resources/templates/index.html` | Main page content |
| `src/app/layout.tsx` | HTML `<html>` and `<body>` in template | Page layout structure |
| `src/app/globals.css` | `src/main/resources/static/css/styles.css` | Styling |
| N/A | `HomeController.java` | Server-side controller |
| N/A | `GymApplication.java` | Application entry point |

## Running the Application

### Next.js (Original)
```bash
npm run dev
# Runs on http://localhost:3000
```

### Spring Boot (New)
```bash
mvn spring-boot:run
# Runs on http://localhost:8080
```

## Development Workflow

### Next.js
- Hot reload with fast refresh
- TypeScript type checking
- Component-based development

### Spring Boot
- Hot reload with Spring DevTools
- Server-side rendering with Thymeleaf
- MVC pattern development

## Building for Production

### Next.js
```bash
npm run build
npm start
```

### Spring Boot
```bash
mvn clean package
java -jar target/gym-app-0.1.0.jar
```

## Testing

### Next.js
- Not implemented in original project

### Spring Boot
```bash
mvn test
```
- Unit tests for controllers
- Integration tests for application context

## Key Features Preserved

1. **Visual Design**: Similar layout and styling
2. **Responsive Design**: Works on mobile and desktop
3. **Dark Mode**: CSS-based dark mode support
4. **Navigation Links**: Updated to Spring Boot resources
5. **Clean UI**: Minimal, modern interface

## Advantages of Spring Boot Version

1. **Type Safety**: Java strong typing
2. **Enterprise Ready**: Built for production use
3. **Testing**: Comprehensive test framework
4. **Performance**: Efficient server-side rendering
5. **Scalability**: Easy to extend with REST APIs, databases, etc.

## Next Steps

Possible enhancements:
- Add database integration (JPA/Hibernate)
- Implement REST API endpoints
- Add user authentication (Spring Security)
- Create additional pages and features
- Add API documentation (Swagger/OpenAPI)
