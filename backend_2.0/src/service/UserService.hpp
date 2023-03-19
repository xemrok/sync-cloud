#ifndef UserService_hpp
#define UserService_hpp

#include "oatpp/web/protocol/http/Http.hpp"
#include "oatpp/core/macro/component.hpp"

#include "db/DbConnection.hpp"

#include "dto/StatusDto.hpp"
#include "dto/ConfigDto.hpp"
#include "dto/UserDto.hpp"

class UserService
{
private:
  typedef oatpp::web::protocol::http::Status Status;

private:
  OATPP_COMPONENT(std::shared_ptr<DbConnection>, m_database);
  OATPP_COMPONENT(oatpp::Object<ConfigDto>, config);

public:
  oatpp::Object<UserDto> signUp(const oatpp::Object<SignUpDto> &dto);
  oatpp::Object<SessionUserDto> signIn(const oatpp::Object<SignInDto> &dto);
  oatpp::Object<UserDto> getUserById(const oatpp::UInt32 &id);
};

#endif
