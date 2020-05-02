# Install
1 - Install Docker Engine on your machine.

2 - Install Docker-Compose on your machine.

3 - Clone the project: `git clone https://github.com/charlanalves/origin.git`

4 - `cd origin`

5 - `docker-compose up -d`

6 - To Import Postman Collection (file present at the root of this project) Risk Calculation.postman_collection.json and on raw tab change the body type from Text to JSON

OR try with CURL: curl -X POST   http://localhost:8084/api/risk   -H 'cache-control: no-cache'   -H 'content-type: application/json'   -H 'postman-token: 1a7d7cce-d8d9-827b-dc88-21f13c5f0fe0'   -d '{
"age": 35,
"dependents": 2,
"house": {"ownership_status": "owned"},
"income": 0,
"marital_status": "married",
"risk_questions": [0, 1, 0],
"vehicle": {"year": 2018}
}'

# Runing tests
for running tests: `docker exec -it origin_test /TDD/node_modules/.bin/mocha`

# Reasons why to choose Module pattern and config file app/rules.js for calculating risk scores and decide what insurance plan eligible for each lines of insurance.

1 - Modular code.Install Docker Engine on your machine.

2 - Reusability of the code.

3 - Neat and clean- ease for developer and debugger.


# Bouns $$ :)
I also have created another version of docker-compose with an API gateway.
Using it an API gateway has the following benefits:

- Insulates the clients from how the application is partitioned into microservices
- Insulates the clients from the problem of determining the locations of service instances
- Provides the optimal API for each client
- Reduces the number of requests/roundtrips. For example, the API gateway enables clients to retrieve data from multiple services with a single round-trip. Fewer requests also means less overhead and improves the user experience. An API gateway is essential for mobile applications.
-Simplifies the client by moving logic for calling multiple services from the client to API gateway
-Translates from a “standard” public web-friendly API protocol to whatever protocols are used internally

# Install

1 - `docker-compose -f docker-compose-with-api-gateway.yml up -d`

2 - Wait for the services up (about 1 minute)

3 - to Acess Store Api and type username: admin and password: admin
`https://localhost:9443/store/site/pages/login.jag`


