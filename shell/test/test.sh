number="12345"
echo ${number#} # 12345
echo ${number#?} # 2345
echo ${number%${number#?}} # 1