#!/usr/bin/env bash
cd ..
git fetch --all
git reset --hard origin/master
npm install
chmod -R 775 shell_script
chmod -R 775 data

rsync -avz --delete --exclude-from 'shell_script/exclude_files_list' . build/kunwoo-kim-aka

#Process Restart
cd build/kunwoo-kim-aka
sudo pm2 delete app
sudo pm2 start app.js

echo "build end"