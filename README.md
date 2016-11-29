# race-users
A Node.js web API.

## Frameworks
API-framework:
- express

Test-framwork:
- mocha, chai, chai-http

Datastorage:
- mongoose
- Mongodb

Infrastructure:
- deployment: docker
- Datastorage: mLab (MongoDB)


## References
### express
On express folder structure best practices:
https://www.terlici.com/2014/08/25/best-practices-express-structure.html

### On authentication/authorizaton
For authentication:
https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
alternatively:
https://github.com/jwtk/njwt

jwt should be sent in the Authorization header using the Bearer schema:
https://jwt.io/introduction/

### On testing
Refer to following two articles:
https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai/#.WD3MXXUrKV4
