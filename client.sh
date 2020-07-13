#!/bin/bash
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  nc -l -p 10000 -q 1 > out.zip < /dev/null &
fi
echo "Sending 68MB file over"
START=`perl -MTime::HiRes=time -e 'printf "%.3f\n", time'`
nc 127.0.0.1 10000 < a.zip
END=`perl -MTime::HiRes=time -e 'printf "%.3f\n", time'`

ELAPSED=$( printf "%.0f" `echo "($END - $START) * 1000" | bc`)

echo ""
echo "Language: BASH (nc)"
echo "Size in bytes: 68780375"
echo "Elapsed in ms: $ELAPSED"
