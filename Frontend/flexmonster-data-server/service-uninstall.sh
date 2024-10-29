#!/bin/sh

PLIST_FILE=~/Library/LaunchAgents/com.flexmonster.DataServer.plist

if test -f "$PLIST_FILE"; then
    launchctl unload -w $PLIST_FILE
    rm $PLIST_FILE
fi

echo "Flexmonster Data Server service is uninstalled."
