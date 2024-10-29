#!/bin/sh

PLIST_FILE=~/Library/LaunchAgents/com.flexmonster.DataServer.plist

if test -f "$PLIST_FILE"; then
    launchctl unload -w $PLIST_FILE
fi

echo '' > $PLIST_FILE
echo '<?xml version="1.0" encoding="UTF-8"?>' >> $PLIST_FILE
echo '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">' >> $PLIST_FILE
echo '<plist version="1.0">' >> $PLIST_FILE
echo '<dict>' >> $PLIST_FILE
echo '<key>Label</key>' >> $PLIST_FILE
echo '<string>com.flexmonster.DataServer</string>' >> $PLIST_FILE
echo '<key>RunAtLoad</key>' >> $PLIST_FILE
echo '<true/>' >> $PLIST_FILE
echo '<key>KeepAlive</key>' >> $PLIST_FILE
echo '<true/>' >> $PLIST_FILE
echo '<key>WorkingDirectory</key>' >> $PLIST_FILE
echo "<string>$PWD</string>" >> $PLIST_FILE
echo '<key>StandardErrorPath</key>' >> $PLIST_FILE
echo "<string>$PWD/logs/service.error.log</string>" >> $PLIST_FILE
echo '<key>ProgramArguments</key>' >> $PLIST_FILE
echo '<array>' >> $PLIST_FILE
echo "<string>$PWD/flexmonster-data-server</string>" >> $PLIST_FILE
echo '<string>--service</string>' >> $PLIST_FILE
echo '<string>--homedir</string>' >> $PLIST_FILE
echo "<string>$PWD</string>" >> $PLIST_FILE
echo '</array>' >> $PLIST_FILE
echo '</dict>' >> $PLIST_FILE
echo '</plist>' >> $PLIST_FILE

launchctl load -w $PLIST_FILE

echo "Flexmonster Data Server service is installed."
