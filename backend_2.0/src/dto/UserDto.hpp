#ifndef UserDto_hpp
#define UserDto_hpp

#include "oatpp/core/macro/codegen.hpp"
#include "oatpp/core/Types.hpp"

#include OATPP_CODEGEN_BEGIN(DTO)

class SignUpDto : public oatpp::DTO
{
  DTO_INIT(SignUpDto, DTO)

  DTO_FIELD(String, email, "email");
  DTO_FIELD(String, name, "name");
  DTO_FIELD(String, password, "password");
};

class SignInDto : public oatpp::DTO
{
  DTO_INIT(SignInDto, DTO)

  DTO_FIELD(String, email, "email");
  DTO_FIELD(String, password, "password");
};

class BaseUserDto : public oatpp::DTO
{
  DTO_INIT(BaseUserDto, DTO)

  DTO_FIELD(oatpp::UInt32, _id, "_id");
  DTO_FIELD(String, email, "email");
  DTO_FIELD(String, password, "password");
  DTO_FIELD(String, name, "name");
  DTO_FIELD(String, updated_at, "updated_at");
  DTO_FIELD(String, created_at, "created_at");
};

class UserDto : public oatpp::DTO
{
  DTO_INIT(UserDto, DTO)

  DTO_FIELD(oatpp::UInt32, _id, "_id");
  DTO_FIELD(String, email, "email");
  DTO_FIELD(String, name, "name");
  DTO_FIELD(String, updated_at, "updated_at");
  DTO_FIELD(String, created_at, "created_at");
};

class SessionUserDto : public oatpp::DTO
{
  DTO_INIT(SessionUserDto, DTO)

  DTO_FIELD(oatpp::UInt32, _id, "_id");
  DTO_FIELD(String, email, "email");
  DTO_FIELD(String, name, "name");
  DTO_FIELD(String, updated_at, "updated_at");
  DTO_FIELD(String, created_at, "created_at");
  DTO_FIELD(String, token, "token");
};

#include OATPP_CODEGEN_END(DTO)

#endif
