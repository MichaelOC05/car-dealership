@echo off
docker volume create beta-data
docker-compose build
docker-compose up
