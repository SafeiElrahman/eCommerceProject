
# Run tests and generate allure report:
*************************************************
# all tests:        ./run.sh
# spesific file:    ./run.sh tests/TestCases/login.spec.js
# one test:         ./run.sh -g "login - valid"

rm -rf ./allure-results ; npx playwright test "$@" ; allure generate ./allure-results --clean -o ./allure-report ; allure open ./allure-report
