#!/bin/bash

cleanup() {
    echo "Container stopped. Removing nginx configuration."
    rm /etc/nginx/sites-enabled/events-board.metaploy.conf
}

trap 'cleanup' SIGQUIT SIGTERM SIGHUP

"${@}" &

cp /app/metaploy/events-board.metaploy.conf /etc/nginx/sites-enabled

wait $!
