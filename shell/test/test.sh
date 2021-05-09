# number="12345"
# echo ${number#} # 12345
# echo ${number#?} # 2345
# echo ${number%${number#?}} # 1
# t="345"
# echo ${number%${t}}
str="12345"
t="345"
k="123"
echo ${str%$t} # 12
echo ${str%$k} # 12345
echo ${str#$t} # 12345
echo ${str#$k} # 45