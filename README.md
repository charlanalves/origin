# Install

1. [Install](https://docs.docker.com/engine/installation/) **`Docker Engine`** on your machine.
2. [Install](https://docs.docker.com/compose/install/) **`Docker-Compose`** on your machine.

3. Clone the project: https://github.com/charlanalves/origin.git
4. cd origin
5. docker-compose up -d
6. To Import Postman Collection (file present at the root of this project) `Risk Calculation.postman_collection.json` and on raw tab change the body type from `Text` to `JSON`

OR try with CURL:
`
curl -X POST \
  http://localhost:8084/api/risk \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 1a7d7cce-d8d9-827b-dc88-21f13c5f0fe0' \
  -d '{
"age": 35,
"dependents": 2,
"house": {"ownership_status": "owned"},
"income": 0,
"marital_status": "married",
"risk_questions": [0, 1, 0],
"vehicle": {"year": 2018}
}'`


# Runing tests

 for running tests: `docker exec -it origin_test /TDD/node_modules/.bin/mocha`


# Reasons why to choose Module pattern and config file app/rules.js for calculating risk scores and decide what insurance plan eligible for each lines of insurance.

1. Modular code.
2. Reusability of the code.
3. Neat and clean- ease for developer and debugger.
