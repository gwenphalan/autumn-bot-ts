#!/bin/bash
echo "***********[ Removing IP from logs ]***********"
sshpass -p "$SERVER_PASS" ssh "$SERVER_USERNAME"@"$SERVER_NAME" "echo Hidden" > /dev/null 2>&1
echo "***********[ Updating Container ]***********"
sshpass -p "$SERVER_PASS" ssh "$SERVER_USERNAME"@"$SERVER_NAME" "cd $WORK_DIR && git pull && sudo docker build -t autumnbot . && docker-compose restart"
echo "***********[ Cleanup ]***********"
CLEANUP="sudo docker system prune -f"
IMAGE_CLEANUP="sudo docker image prune --all -f"
sshpass -p "$SERVER_PASS" ssh "$SERVER_USERNAME"@"$SERVER_NAME" "$CLEANUP"
sshpass -p "$SERVER_PASS" ssh "$SERVER_USERNAME"@"$SERVER_NAME" "$IMAGE_CLEANUP"