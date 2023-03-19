#include <drogon/drogon.h>

using namespace drogon;

int main()
{
    std::cout << "Server running on port 1024\n";

    app()
        .registerPostHandlingAdvice(
            [](const HttpRequestPtr &req, const HttpResponsePtr &resp)
            {
                resp->addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
                resp->addHeader("Access-Control-Allow-Methods", "OPTIONS,HEAD,GET,POST,PUT,DELETE");
            })
        .loadConfigFile("../config.json")
        .run();
    return 0;
}
