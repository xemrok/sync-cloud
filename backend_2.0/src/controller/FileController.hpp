#ifndef FileController_hpp
#define FileController_hpp

#include <iostream>
#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fstream>
#include <cstring>

#include "oatpp/web/server/api/ApiController.hpp"
#include "oatpp/parser/json/mapping/ObjectMapper.hpp"
#include "oatpp/core/macro/codegen.hpp"

#include "oatpp/core/data/resource/TemporaryFile.hpp"

#include "oatpp/web/mime/multipart/TemporaryFileProvider.hpp"
#include "oatpp/web/mime/multipart/Reader.hpp"
#include "oatpp/web/mime/multipart/PartList.hpp"

#include "AuthBearer.hpp"

namespace multipart = oatpp::web::mime::multipart;

class FileController : public oatpp::web::server::api::ApiController
{
private:
    std::shared_ptr<AuthorizationHandler> m_authHandler = std::make_shared<AuthBearerHandler>();

public:
    FileController(const std::shared_ptr<ObjectMapper> &objectMapper) : oatpp::web::server::api::ApiController(objectMapper)
    {
    }

public:
    static std::shared_ptr<FileController> createShared(OATPP_COMPONENT(std::shared_ptr<ObjectMapper>, objectMapper))
    {
        return std::make_shared<FileController>(objectMapper);
    }

#include OATPP_CODEGEN_BEGIN(ApiController)

    ADD_CORS(upload)
    ENDPOINT("POST", "/upload", upload,
             REQUEST(std::shared_ptr<IncomingRequest>, request))
    {

        //TODO Make this request

        try
        {
            std::cout << 11111 << std::endl;
            multipart::PartList multipart(request->getHeaders());

            std::cout << 22222 << std::endl;
            multipart::Reader multipartReader(&multipart);

            std::cout << 33333 << std::endl;
            multipartReader.setDefaultPartReader(multipart::createTemporaryFilePartReader("/tmp"));

            std::cout << 44444 << std::endl;
            request->transferBody(&multipartReader);

            std::cout << 55555 << std::endl;
            auto parts = multipart.getAllParts();

            for (auto &p : parts)
            {
                OATPP_LOGD("part", "name=%s, location=%s", p->getName()->c_str(), p->getPayload()->getLocation()->c_str());

                auto stream = p->getPayload()->openInputStream();

                std::string path;
                path.append(".").append("/files").append("/").append(p->getName()->c_str());
                std::ofstream fout(path, std::ios::app);

                oatpp::v_io_size res;
                do
                {
                    v_char8 buff[1024];
                    res = stream->readSimple(buff, 1024);

                    if (res > 0)
                    {
                        fout << buff;

                        // std::cout << std::endl
                        //           << std::endl
                        //           << std::bitset<8>(c) << std::endl
                        //           << std::endl;

                        // std::byte bytes[res];
                        // std::memcpy(bytes, buff, res);

                        // fout << bytes;

                        OATPP_LOGD("Stream", "read %d bytes", res);
                    }
                } while (res > 0);
                fout.close();
            }

            std::cout << 66666 << std::endl;

            return createResponse(Status::CODE_200, "OK");
        }
        catch (const std::exception &e)
        {
            std::cerr << e.what() << '\n';
            return createResponse(Status::CODE_500, "OK");
        }
    }

    ADD_CORS(upload1)
    ENDPOINT("POST", "/upload1", upload1,
             REQUEST(std::shared_ptr<IncomingRequest>, request))
    {
        try
        {
            /* create random file in '/tmp' folder */
            oatpp::data::resource::TemporaryFile tmp("/tmp");

            /* transfer body to temporary file */
            request->transferBody(tmp.openOutputStream());

            /* move file to permanent storage */
            OATPP_ASSERT_HTTP(tmp.moveFile("/files/avatar.png"), Status::CODE_500, "Failed to save file")

            /* return 200 */
            return createResponse(Status::CODE_200, "OK");
            /* code */
        }
        catch (const std::exception &e)
        {
            std::cerr << e.what() << '\n';
            return createResponse(Status::CODE_500, "OK");
        }
    }
};

#include OATPP_CODEGEN_BEGIN(ApiController)

#endif
