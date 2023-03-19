#pragma once

#include <drogon/HttpController.h>
#include "Users.h"
using namespace drogon;
using namespace drogon_model::sync_cloud;

namespace users
{
  class User : public HttpController<User>
  {
  public:
    METHOD_LIST_BEGIN
    ADD_METHOD_TO(User::signIn, "/api/users/signIn", Post, Options);
    ADD_METHOD_TO(User::signUp, "/api/users/signUp", Post, Options);
    METHOD_LIST_END

    // use METHOD_ADD to add your custom processing function here;
    // METHOD_ADD(User::your_method_name, "/{1}/{2}/list", Get); // path is /users/User/{arg1}/{arg2}/list
    // ADD_METHOD_TO(User::your_method_name, "/absolute/path/{1}/{2}/list", Get); // path is /absolute/path/{arg1}/{arg2}/list

    // your declaration of processing function maybe like this:
    // void get(const HttpRequestPtr& req, std::function<void (const HttpResponsePtr &)> &&callback, int p1, std::string p2);
    // void your_method_name(const HttpRequestPtr& req, std::function<void (const HttpResponsePtr &)> &&callback, double p1, int p2) const;

    void signIn(const HttpRequestPtr &req, std::function<void(const HttpResponsePtr &)> &&callback);

    void signUp(const HttpRequestPtr &req, std::function<void(const HttpResponsePtr &)> &&callback);
  };
}
