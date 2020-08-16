#!/bin/bash
echo "***********[ Removing IP from logs ]***********"
sshpass -p "$SERVER_PASS" ssh "$SERVER_USERNAME"@"$SERVER_NAME" "echo Hidden" > /dev/null 2>&1
echo "***********[ Pulling latest images ]***********"
sshpass -p "$SERVER_PASS" ssh "$SERVER_USERNAME"@"$SERVER_NAME" "docker pull autumnbot:dev-$TRAVIS_BUILD_NUMBER"
echo "***********[ Updating images]***********"
BACKEND="docker service update --env-add VERSION='$TRAVIS_BUILD_NUMBER' --env-add COMMIT='$TRAVIS_COMMIT' --env-add COMMIT_MESSAGE='$TRAVIS_COMMIT_MESSAGE' --image autumnbot:dev-'${TRAVIS_BUILD_NUMBER}' autumnbot"
ssshpass -p "$SERVER_PASS" ssh "$SERVER_USERNAME"@"$SERVER_NAME" "$BACKEND"
echo "***********[ Cleanup ]***********"
CLEANUP="docker system prune -f"
IMAGE_CLEANUP="docker image prune --all -f"
sshpass -p "$SERVER_PASS" ssh "$SERVER_USERNAME"@"$SERVER_NAME" "$CLEANUP"
sshpass -p "$SERVER_PASS" ssh "$SERVER_USERNAME"@"$SERVER_NAME" "$IMAGE_CLEANUP"