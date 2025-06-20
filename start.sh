#!/bin/bash

echo "Startuję frontend..."
(cd frontend && npm install && npm start) &

echo "Startuję backend..."
(cd backend && ./mvnw spring-boot:run)
