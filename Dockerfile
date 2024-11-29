FROM maven:3.8-openjdk-17-slim AS build
WORKDIR /app
COPY . /app
RUN mvn clean install -DskipTests
FROM eclipse-temurin:17-jre-alpine
COPY --from=build /app/target/*.jar /app/my-spring-boot-app.jar
WORKDIR /app
EXPOSE 8080
# CMD ["java", "-jar", "my-spring-boot-app.jar"]
CMD ["sh", "-c", "if [ \"$RUN_TESTS\" = \"true\" ]; then mvn test; else java -jar my-spring-boot-app.jar; fi"]
