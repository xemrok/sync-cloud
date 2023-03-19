#!/bin/bash
project_name="backend-exe"


if ! [ -d build ]; then
    mkdir build
fi

clear

cd build

echo -e "Cmake started!\n"
cmake ..
echo -e "\n"

echo -e "Make started!\n"
make
echo -e "\n"

./$project_name
