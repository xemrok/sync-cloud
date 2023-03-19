#include <iostream>

#include "oatpp-swagger/Controller.hpp"
#include "oatpp/network/Server.hpp"

#include "AppComponent.hpp"
#include "DatabaseComponent.hpp"
#include "ServiceComponent.hpp"
#include "SwaggerComponent.hpp"

#include "controller/UserController.hpp"

void run(const oatpp::base::CommandLineArguments &args)
{
  AppComponent appComponent(args);
  ServiceComponent serviceComponent;
  SwaggerComponent swaggerComponent;
  DatabaseComponent databaseComponent;

  auto router = serviceComponent.httpRouter.getObject();
  oatpp::web::server::api::Endpoints docEndpoints;

  docEndpoints.append(router->addController(UserController::createShared())->getEndpoints());

  router->addController(oatpp::swagger::Controller::createShared(docEndpoints));

  oatpp::network::Server server(serviceComponent.serverConnectionProvider.getObject(),
                                serviceComponent.serverConnectionHandler.getObject());

  OATPP_LOGD("Server", "Running on port %s...", serviceComponent.serverConnectionProvider.getObject()->getProperty("port").toString()->c_str());

  server.run();
}

int main(int argc, const char *argv[])
{
  oatpp::base::Environment::init();

  run(oatpp::base::CommandLineArguments(argc, argv));

  oatpp::base::Environment::destroy();

  return 0;
}
