#include <drogon/drogon.h>

int main() {
    std::cout << "Server started" << "\n";

    //Set HTTP listener address and port
    drogon::app().addListener("0.0.0.0",1024);
    //Load config file
    //drogon::app().loadConfigFile("../config.json");
    //Run HTTP framework,the method will block in the internal event loop
    drogon::app().run();
    return 0;
}