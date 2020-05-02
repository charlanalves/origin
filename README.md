# Install

1. [Install](https://docs.docker.com/engine/installation/) **`Docker Engine`** on your machine.
2. [Install](https://docs.docker.com/compose/install/) **`Docker-Compose`** on your machine.

3. Clone the project: https://github.com/charlanalves/origin.git
4. cd origin
5. docker-compose up -d
6. To Import Postman Collection (file present at the root of this project) `Risk Calculation.postman_collection.json`


# Runing tests

 for running tests: `docker exec -it origin_test /TDD/node_modules/.bin/mocha`


# Reasons why to choose Module pattern and config file app/rules.js for calculating risk scores and decide what insurance plan eligible for each lines of insurance.

1. Modular code.
2. Reusability of the code.
3. Neat and clean- ease for developer and debugger.
