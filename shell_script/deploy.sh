#!/usr/bin/env bash
echo "deploy start"
echo "Project Name : kunwoo-kim-aka"


if find ../build/kunwoo-kim-aka/ -mindepth 1 | read; then
	#Copy build file to Deploy
	rsync -av ../build/ ../deploy/

	#Change the IP of Database
	node dp_ip_change.js


	#rsunc : File Transfer
	while read ssh_user ssh_ip;
	do
	    echo "scp($(dirname "$PWD") to ${ssh_user}@${ssh_ip}:/home1/${ssh_user}"
	    rsync -arlvz -e ssh ../deploy/kunwoo-kim-aka --exclude '*nohup*' "${ssh_user}@${ssh_ip}:~/"
#	    scp -prq ../deploy "${ssh_user}@${ssh_ip}:/home1/${ssh_user}"
#	    scp -prq ../deploy/kunwoo-kim-aka "${ssh_user}@${ssh_ip}:/home/${ssh_user}"
	done < server_list

	while read ssh_user ssh_ip;
	do
	    echo "ssh to ${ssh_user}@${ssh_ip}:/home1/${ssh_user}"
	    ssh "${ssh_user}@${ssh_ip}" sh > ssh_shell.sh
#	    scp -prq ../deploy "${ssh_user}@${ssh_ip}:/home1/${ssh_user}"
#	    scp -prq ../deploy/kunwoo-kim-aka "${ssh_user}@${ssh_ip}:/home/${ssh_user}"
	done < server_list

	echo "deploy end"
	exit 0
else
	echo "You must execute 'build.sh' preparatory to execute 'deploy.sh'"
	exit 1;
fi