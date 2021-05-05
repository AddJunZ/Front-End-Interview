# str="value=123=456"
# echo $str | cut -d= -f1 # value
# echo $str | cut -d= -f2 # 123
# echo $str | cut -d= -f3 # 456
# echo $str | cut -d= -f1- # value=123=456
# # echo $str | cut -d= -f1- --output-delimiter="/"# value/123/456
# echo $str | cut -d= -f1-2 # value=123
# echo $str | cut -d= -f2-3 # 123=456

echo "var=value1=value2"| cut -f1-2 -d= --output-delimiter "/"