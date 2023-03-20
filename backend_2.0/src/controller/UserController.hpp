#ifndef UserController_hpp
#define UserController_hpp

#include <iostream>

#include "oatpp/web/server/api/ApiController.hpp"
#include "oatpp/parser/json/mapping/ObjectMapper.hpp"
#include "oatpp/core/macro/codegen.hpp"

#include "AuthBearer.hpp"
#include "service/UserService.hpp"

class UserController : public oatpp::web::server::api::ApiController
{
private:
  std::shared_ptr<AuthorizationHandler> m_authHandler = std::make_shared<AuthBearerHandler>();

private:
  UserService m_userService;

public:
  UserController(const std::shared_ptr<ObjectMapper> &objectMapper) : oatpp::web::server::api::ApiController(objectMapper)
  {
  }

public:
  static std::shared_ptr<UserController> createShared(OATPP_COMPONENT(std::shared_ptr<ObjectMapper>, objectMapper))
  {
    return std::make_shared<UserController>(objectMapper);
  }

#include OATPP_CODEGEN_BEGIN(ApiController)

  /*### POST /users/signUp ###*/
  ENDPOINT_INFO(signUp)
  {
    info->summary = "Signup";

    info->addConsumes<Object<SignUpDto>>("application/json");

    info->addResponse<Object<UserDto>>(Status::CODE_200, "application/json");
    info->addResponse<Object<StatusDto>>(Status::CODE_500, "application/json");
  }
  ADD_CORS(signUp)
  ENDPOINT("POST", "/users/signUp", signUp,
           BODY_DTO(Object<SignUpDto>, signUpDto))
  {
    return createDtoResponse(Status::CODE_200, m_userService.signUp(signUpDto));
  }

  /*### POST /users/signIn ###*/
  ENDPOINT_INFO(signIn)
  {
    info->summary = "Sign in";

    info->addConsumes<Object<SignInDto>>("application/json");

    info->addResponse<Object<SessionUserDto>>(Status::CODE_200, "application/json");
    info->addResponse<Object<StatusDto>>(Status::CODE_500, "application/json");
  }
  ADD_CORS(signIn)
  ENDPOINT("POST", "/users/signIn", signIn,
           BODY_DTO(Object<SignInDto>, signInDto))
  {
    auto jsonObjectMapper = oatpp::parser::json::mapping::ObjectMapper::createShared();
    oatpp::String json = jsonObjectMapper->writeToString(signInDto);
    std::cout << json->c_str() << std::endl;

    return createDtoResponse(Status::CODE_200, m_userService.signIn(signInDto));
  }

  /*### GET /users/me ###*/
  ENDPOINT_INFO(me)
  {
    info->summary = "Get current user";

    info->addResponse<Object<SessionUserDto>>(Status::CODE_200, "application/json");
    info->addResponse<Object<StatusDto>>(Status::CODE_401, "application/json");
    info->addResponse<Object<StatusDto>>(Status::CODE_500, "application/json");

    info->headers["token"].description = "User Identifier";
    info->addSecurityRequirement("token");
  }
  ADD_CORS(me)
  ENDPOINT("GET", "/users/me", me,
           AUTHORIZATION(std::shared_ptr<AuthBearerObject>, authUser, m_authHandler))
  {
    return createDtoResponse(Status::CODE_200, m_userService.getUserById(authUser->_id));
  }

  /*### GET /users/logout ###*/
  ENDPOINT_INFO(logout)
  {
    info->summary = "Delete session";

    info->addResponse<Object<StatusDto>>(Status::CODE_200, "application/json");
    info->addResponse<Object<StatusDto>>(Status::CODE_401, "application/json");
    info->addResponse<Object<StatusDto>>(Status::CODE_500, "application/json");

    info->headers["token"].description = "User Identifier";
    info->addSecurityRequirement("token");
  }
  ADD_CORS(logout)
  ENDPOINT("GET", "/users/logout", logout,
           AUTHORIZATION(std::shared_ptr<AuthBearerObject>, authUser, m_authHandler))
  {
    return createDtoResponse(Status::CODE_200, m_userService.deleteSessionById(authUser->_id, authUser->token));
  }
};

#include OATPP_CODEGEN_BEGIN(ApiController)

#endif
