#include "users_User.h"
#include "bcrypt.h"
#include <string>
// #include "../models/Users.h"

using namespace users;
using namespace drogon;
using namespace drogon::orm;
using namespace drogon_model::sync_cloud;

// Add definition of your processing function here

void User::signIn(const HttpRequestPtr &req,
                  std::function<void(const HttpResponsePtr &)> &&callback)
{
    auto json = req->getJsonObject();

    std::string email = (*json)["email"].asString();
    std::string password = (*json)["password"].asString();

    auto clientPtr = app().getDbClient();

    try
    {
        auto result = clientPtr->execSqlSync("select * from users"); // Block until we get the result or catch the exception;
        size_t num_users = result[0][0].as<size_t>();
        std::cout << result.size() << " rows updated!" << std::endl;
    }
    catch (const DrogonDbException &e)
    {
        std::cerr << "error:" << e.base().what() << std::endl;
    }

    // Json::Value jsonBody;
    // jsonBody["users"] = num_users;

    auto resp = HttpResponse::newHttpJsonResponse();
    resp->setBody(num_users);
    callback(resp);

    // try
    // {
    // auto result = clientPtr->execSqlSync("select * from users", "default"); // Block until we get the result or catch the exception;
    // std::cout << result.size() << " rows updated!" << std::endl;
    // }
    // catch ()
    // {
    //     std::cerr << "error:" << std::endl;
    // }

    // drogon::orm::Mapper<Users> mapper(dbClientPtr);

    // auto users = mapper.orderBy(Users::Cols::_name).limit(25).offset(0).findAll();

    // auto sql = app().getDbClient();

    // auto result = co_await sql->execSqlCoro("SELECT COUNT(*) FROM users;");
    // size_t num_users = result[0][0].as<size_t>();

    // std::cout << num_users << std::endl;

    // std::cout << email << std::endl;
    // std::cout << password << std::endl;

    // std::string hash = bcrypt::generateHash(password);
    // std::cout << "Hash: " << hash << std::endl;

    // auto body = req->getBody();

    // auto email = req->getParameter("email");

    // std::cout << email << std::endl;
}

void User::signUp(const HttpRequestPtr &req,
                  std::function<void(const HttpResponsePtr &)> &&callback)
{

    auto json = req->getJsonObject();

    // std::string email = (*json).asString();
    // std::string password = (*json)["password"].asString();

    // LOG_DEBUG<<"User "<<userId<<" login";
    // //Authentication algorithm, read database, verify, identify, etc...
    // //...
    // Json::Value ret;
    // ret["result"]="ok";
    // ret["token"]=drogon::utils::getUuid();
    // auto resp=HttpResponse::newHttpJsonResponse(ret);
    // callback(resp);
    // Формируем JSON-объект

    Json::Value jsonBody;
    jsonBody["message"] = "Hello, world";

    auto resp = HttpResponse::newHttpJsonResponse(jsonBody);
    callback(resp);
}
