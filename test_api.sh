#!/bin/bash

BASE_URL="http://localhost:8080/api/admin"

echo "Testing API Endpoints..."

echo "1. GET /drivers"
curl -s "$BASE_URL/drivers" | python3 -m json.tool

echo -e "\n\n2. GET /vehicles"
curl -s "$BASE_URL/vehicles" | python3 -m json.tool

echo -e "\n\n3. GET /products"
curl -s "$BASE_URL/products" | python3 -m json.tool

echo -e "\n\n4. GET /hubs"
curl -s "$BASE_URL/hubs" | python3 -m json.tool

echo -e "\n\n5. GET /terminals"
curl -s "$BASE_URL/terminals" | python3 -m json.tool

echo -e "\n\nDone."
