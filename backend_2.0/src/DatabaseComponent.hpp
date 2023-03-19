#ifndef DatabaseComponent_hpp
#define DatabaseComponent_hpp

#include "dto/ConfigDto.hpp"

#include "db/DbConnection.hpp"

class DatabaseComponent
{
public:
  /**
   * Create database client
   */
  OATPP_CREATE_COMPONENT(std::shared_ptr<DbConnection>, dbConnection)
  ([]
   {
     OATPP_COMPONENT(oatpp::Object<ConfigDto>, config); // Get config component

     /* Create database-specific ConnectionProvider */
     auto connectionProvider = std::make_shared<oatpp::postgresql::ConnectionProvider>(config->dbConnectionString);

     /* Create database-specific ConnectionPool */
     auto connectionPool = oatpp::postgresql::ConnectionPool::createShared(connectionProvider, 10, std::chrono::seconds(5));

     /* Create database-specific Executor */
     auto executor = std::make_shared<oatpp::postgresql::Executor>(connectionPool);

     /* Create database client */
     return std::make_shared<DbConnection>(executor);
    }
  ());
};

#endif
