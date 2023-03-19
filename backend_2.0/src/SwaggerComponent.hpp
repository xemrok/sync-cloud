#ifndef SwaggerComponent_hpp
#define SwaggerComponent_hpp

#include "oatpp-swagger/Model.hpp"
#include "oatpp-swagger/Resources.hpp"
#include "oatpp/core/utils/ConversionUtils.hpp"
#include "oatpp/core/macro/component.hpp"

#include "dto/ConfigDto.hpp"

class SwaggerComponent
{
public:
  /**
   *  General API docs info
   */
  OATPP_CREATE_COMPONENT(std::shared_ptr<oatpp::swagger::DocumentInfo>, swaggerDocumentInfo)
  ([]
   {
     OATPP_COMPONENT(oatpp::Object<ConfigDto>, config);

     oatpp::swagger::DocumentInfo::Builder builder;

     builder
         .setTitle("Sync-cloud API")
         .setDescription("File synchronization service")
         .setVersion("1.0")
         .setContactName("Zhdanov Vladislav")
         .setContactUrl("https://oatpp.io/")

         .addServer("http://localhost:" + oatpp::utils::conversion::int32ToStr(config->port), "server on localhost");

     return builder.build(); }());

  /**
   *  Swagger-Ui Resources (<oatpp-examples>/lib/oatpp-swagger/res)
   */
  OATPP_CREATE_COMPONENT(std::shared_ptr<oatpp::swagger::Resources>, swaggerResources)
  ([]
   {
    // Make sure to specify correct full path to oatpp-swagger/res folder !!!
    return oatpp::swagger::Resources::loadResources(OATPP_SWAGGER_RES_PATH); }());
};

#endif
