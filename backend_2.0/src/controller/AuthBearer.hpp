#ifndef AuthBearer_hpp
#define AuthBearer_hpp

#include <iostream>

#include "oatpp/core/macro/component.hpp"

#include "db/DbConnection.hpp"
#include "dto/UserDto.hpp"
#include "dto/StatusDto.hpp"

using namespace oatpp::web::server::handler;

class AuthBearerObject : public UserDto, public AuthorizationObject
{

public:
    AuthBearerObject(const oatpp::Object<UserDto> user)
    {
        _id = user->_id;
        email = user->email;
        name = user->name;
        updated_at = user->updated_at;
        created_at = user->created_at;
    }
};

class AuthBearerHandler : public BearerAuthorizationHandler
{
private:
    typedef oatpp::web::protocol::http::Status Status;

private:
    OATPP_COMPONENT(std::shared_ptr<DbConnection>, m_database);

public:
    AuthBearerHandler() : BearerAuthorizationHandler("token")
    {
    }

    std::shared_ptr<AuthorizationObject> authorize(const oatpp::String &token) override
    {
        if (token)
        {
            auto dbResult = m_database->getSessionByToken(*token);
            OATPP_ASSERT_HTTP(dbResult->isSuccess(), Status::CODE_500, dbResult->getErrorMessage());
            OATPP_ASSERT_HTTP(dbResult->hasMoreToFetch(), Status::CODE_401, "Not authorized");

            auto result = dbResult->fetch<oatpp::Vector<oatpp::Object<UserDto>>>();
            OATPP_ASSERT_HTTP(result->size() == 1, Status::CODE_500, "Unknown error");
            return std::make_shared<AuthBearerObject>(result[0]);
        }

        return nullptr;
    }
};

#endif
