#!/bin/bash

echo "Starting HemoGlobe Java Backend..."

# Set environment variables
export DATABASE_URL=${DATABASE_URL}
export JAVA_OPTS="-Xmx512m -Xms256m"

# Build and run the application
cd java-backend
mvn spring-boot:run -Dspring-boot.run.profiles=dev