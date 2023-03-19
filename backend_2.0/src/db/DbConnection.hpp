#ifndef DbConnection_hpp
#define DbConnection_hpp

#include "oatpp-postgresql/orm.hpp"

#include "dto/UserDto.hpp"

#include OATPP_CODEGEN_BEGIN(DbClient)

class DbConnection : public oatpp::orm::DbClient
{
public:
      DbConnection(const std::shared_ptr<oatpp::orm::Executor> &executor)
          : oatpp::orm::DbClient(executor)
      {
            // TODO make migrations

            //     oatpp::orm::SchemaMigration migration(executor);
            //     migration.addFile(1 /* start from version 1 */, DATABASE_MIGRATIONS "/001_init.sql");
            //     migration.migrate(); // <-- run migrations. This guy will throw on error.

            //     auto version = executor->getSchemaVersion();
            //     OATPP_LOGD("UserDb", "Migration - OK. Version=%d.", version);
      }

      /*##################### User Table #####################*/

      QUERY(createUser,
            "INSERT INTO users"
            "(email, name, password) VALUES "
            "(:user.email, :user.name, :user.password)"
            "RETURNING _id, email, name, updated_at, created_at;",
            PREPARE(true),
            PARAM(oatpp::Object<SignUpDto>, user))

      QUERY(getUserByEmail,
            "SELECT * FROM users WHERE email=:email",
            PREPARE(true),
            PARAM(oatpp::String, email))

      QUERY(getUserById,
            "SELECT _id, email, name, updated_at, created_at FROM users WHERE _id=:_id",
            PREPARE(true),
            PARAM(oatpp::UInt32, _id))

      /*##################### Session Table #####################*/

      QUERY(createSession,
            "INSERT INTO sessions"
            "(token, user_id) VALUES "
            "(:token, :user_id)",
            PREPARE(true),
            PARAM(oatpp::String, token),
            PARAM(oatpp::UInt32, user_id))

      QUERY(getSessionByToken,
            "SELECT users._id, users.email, users.name, users.updated_at, users.created_at "
            "FROM sessions, users "
            "WHERE sessions.user_id=users._id AND token=:token",
            PREPARE(true),
            PARAM(oatpp::String, token))

      /*##################### File Table #####################*/
      //TODO ...
};

#include OATPP_CODEGEN_END(DbClient)

#endif
