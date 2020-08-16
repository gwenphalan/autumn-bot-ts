#!/bin/bash
echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
docker push autumnbot:dev-"$TRAVIS_BUILD_NUMBER"