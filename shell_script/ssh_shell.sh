#!/usr/bin/env bash

#Process Restart
cd kunwoo-kim-aka
sudo pm2 delete app
sudo pm2 start app.js
echo "node restart"