#!/bin/bash
validAlphaNum()
{
  # [:alnum:]代表所有的字母数字字符
  validchars="$(echo $1 | sed -e 's/[^[:alnum:]]//g')"

  if [ "$validchars" = "$1" ] ; then 
    return 0
  else
    return 1
  fi
}
# validAlphaNum 'asbd123'
# echo $? # 0
# validAlphaNum 'asbd123A_'
# echo $? # 1

echo -n "Enter input: "
read input
validAlphaNum $input
case "$?" in
  0 ) echo "valid"    ;;
  1 ) echo "invalid"  ;;
esac