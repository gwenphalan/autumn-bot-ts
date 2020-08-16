#!/bin/bash
echo "***********[ Removing IP from logs ]***********"
sshpass -p "$SERVER_PASS" ssh "$SERVER_USERNAME"@"$SERVER_NAME" "echo Hidden" > /dev/null 2>&1
echo "***********[ Updating Container ]***********"
sshpass -p "$SERVER_PASS" ssh "$SERVER_USERNAME"@"$SERVER_NAME" "cd ~/$WORK_DIR && git pull && sudo docker build -t autumnbot . && sudo docker-compose stop && sudo docker-compose up -d"
