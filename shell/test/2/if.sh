#!/bin/bash
echo "if test"
if [ -x /bin/ls ]
then 
/bin/ls
fi

echo "====="

echo "if test"
if [ -x /bin/ls ] ; then
/bin/ls
fi
