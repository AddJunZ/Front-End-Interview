str="aBC"
t="$(echo $str | cut -c1 | tr '[:lower:]' '[:upper:]')"
t2="$(echo $str | cut -c2-3 | tr '[:upper:]' '[:lower:]')"
echo "$t$t2"