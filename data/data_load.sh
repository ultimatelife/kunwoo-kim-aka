#!/usr/bin/env bash
echo "This shell must be executed in your path which is '~/kunwoo-kim-aka/shell_script'"
echo "What is DB's IP?"
echo "1 : insert into Dev Database(localhost)"
echo "2 : insert into Service Database(localhost)"
echo "3 : drop collection of Dev Database"
echo "4 : drop collection of Service Database"

read choice
ip=""

echo "Your choice :$choice"

if [ "$choice" -eq 1  -o "$choice" -eq 3 ]
then
#    ip='10.110.240.13'
    ip='localhost'
elif [ "$choice" -eq 2 -o "$choice" -eq 4 ]
then
    ip='10.110.240.205'
fi

echo "DB's IP : $ip"
if [ "$choice" -eq 1  -o "$choice" -eq 2 ]
then
    mongoimport --host=$ip -d test -c products --type csv --file data.csv --headerline
    echo $?
    exit
elif [ "$choice" -eq 3 -o "$choice" -eq 4 ]
then
    echo Drop Collection
    echo "mongo drop collection $ip:27017/test drop_collection.js"
    mongo $ip:27017/test drop_collection.js
    echo $?
    exit
fi