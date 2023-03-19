# Описание

 //TODO ....

# Сборка и запуск

- Для корректной работы необходимо установить следующие компоненты postgresql
  - `$ apt-get install postgresql-server-dev-all`

Затем необходимо выполнить слудующие скрипты

```
cd utility
sudo bash ./install.sh
cd ..
bash ./run.sh
```

Если всё прошло успешно Backend запустится по адресу [http://localhost:8000](http://localhost:8000)

# TODO

1) Удаление истёкшей сессии
2) Загрузка/Скачивание файлов
3) Улучшение bash скриптов запуска и установки
4) Добавить описание

# Swagger

Перейдите [http://localhost:8000/swagger/ui](http://localhost:8000/swagger/ui) опробовать конечные точки
