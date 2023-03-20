#include <iostream>
#include <ctime>

#include "bcrypt.h"
#include "jwt/jwt.hpp"
#include "oatpp/parser/json/mapping/ObjectMapper.hpp"

#include "UserService.hpp"

using namespace jwt::params;

oatpp::Object<UserDto> UserService::signUp(const oatpp::Object<SignUpDto> &dto)
{
    dto->password = bcrypt::generateHash(dto->password);

    auto dbResult = m_database->createUser(dto);
    OATPP_ASSERT_HTTP(dbResult->isSuccess(), Status::CODE_500, dbResult->getErrorMessage());

    auto result = dbResult->fetch<oatpp::Vector<oatpp::Object<UserDto>>>();
    OATPP_ASSERT_HTTP(result->size() == 1, Status::CODE_500, "Unknown error");

    return result[0];
}

oatpp::Object<SessionUserDto> UserService::signIn(const oatpp::Object<SignInDto> &dto)
{
    auto dbResult = m_database->getUserByEmail(dto->email);
    OATPP_ASSERT_HTTP(dbResult->isSuccess(), Status::CODE_500, dbResult->getErrorMessage());
    OATPP_ASSERT_HTTP(dbResult->hasMoreToFetch(), Status::CODE_404, "User not found");

    auto result = dbResult->fetch<oatpp::Vector<oatpp::Object<BaseUserDto>>>();
    OATPP_ASSERT_HTTP(result->size() == 1, Status::CODE_500, "Unknown error");

    OATPP_ASSERT_HTTP(bcrypt::validatePassword(dto->password, result[0]->password), Status::CODE_400, "Incorrect password");

    auto jsonObjectMapper = oatpp::parser::json::mapping::ObjectMapper::createShared();
    oatpp::String user_id = jsonObjectMapper->writeToString(result[0]->_id);
    oatpp::String secretKey = jsonObjectMapper->writeToString(config->secretKey);

    jwt::jwt_object obj{
        algorithm("HS256"),
        payload({{"_id", user_id->c_str()}, {"time", std::to_string(time(0))}}),
        secret(secretKey->c_str())};

    auto user = SessionUserDto::createShared();
    user->_id = result[0]->_id;
    user->email = result[0]->email;
    user->name = result[0]->name;
    user->updated_at = result[0]->updated_at;
    user->created_at = result[0]->created_at;
    user->token = obj.signature();

    auto dbSessionResult = m_database->createSession(user->token, user->_id);
    OATPP_ASSERT_HTTP(dbSessionResult->isSuccess(), Status::CODE_500, dbSessionResult->getErrorMessage());

    return user;
}

oatpp::Object<UserDto> UserService::getUserById(const oatpp::UInt32 &id)
{
    auto dbResult = m_database->getUserById(id);
    OATPP_ASSERT_HTTP(dbResult->isSuccess(), Status::CODE_500, dbResult->getErrorMessage());
    OATPP_ASSERT_HTTP(dbResult->hasMoreToFetch(), Status::CODE_404, "User not found");

    auto result = dbResult->fetch<oatpp::Vector<oatpp::Object<UserDto>>>();
    OATPP_ASSERT_HTTP(result->size() == 1, Status::CODE_500, "Unknown error");

    return result[0];
}

oatpp::Object<StatusDto> UserService::deleteSessionById(const oatpp::UInt32 &id, const oatpp::String &token) {
  auto dbResult = m_database->deleteSessionById(id, token);
  OATPP_ASSERT_HTTP(dbResult->isSuccess(), Status::CODE_500, dbResult->getErrorMessage());

  auto status = StatusDto::createShared();
  status->status = "OK";
  status->code = 200;
  status->message = "User successfully logged out";
  return status;
}
