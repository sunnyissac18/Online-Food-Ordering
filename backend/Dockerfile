FROM maven:3.9.11-eclipse-temurin-17 AS build
WORKDIR /app

COPY pom.xml ./
COPY .mvn .mvn
COPY mvnw mvnw
COPY mvnw.cmd mvnw.cmd
RUN mvn -B dependency:go-offline

COPY src src
RUN mvn -B clean package -DskipTests

FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

COPY --from=build /app/target/Online-Food-Ordering-0.0.1-SNAPSHOT.jar .

EXPOSE 5454

ENTRYPOINT ["java", "-jar", "/app/Online-Food-Ordering-0.0.1-SNAPSHOT.jar"]
