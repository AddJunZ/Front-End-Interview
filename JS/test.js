// public class Solution {
//   public int longestValidParentheses(String s) {
//       int maxans = 0;
//       int[] dp = new int[s.length()];
//       for (int i = 1; i < s.length(); i++) {
//           if (s.charAt(i) == ')') {
//               if (s.charAt(i - 1) == '(') {
//                   dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
//               } else if (i - dp[i - 1] > 0 && s.charAt(i - dp[i - 1] - 1) == '(') {
//                   dp[i] = dp[i - 1] + ((i - dp[i - 1]) >= 2 ? dp[i - dp[i - 1] - 2] : 0) + 2;
//               }
//               maxans = Math.max(maxans, dp[i]);
//           }
//       }
//       return maxans;
//   }
// }
var longestValidParentheses = function (s) {
  let max = 0;
  const len = s.length;
  // 1. dp[i] 表示以下标 i 字符结尾的最长有效括号的长度
  const dp = new Array(len).fill(0);
  for (let i = 1; i < len; i++) {
    if (s[i] == ')') {
      if (s[i - 1] == '(') {
        dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
      } 
      // 2. 如果前一位也是 ')'
      // 那就类似于 (()) 要判断 跳过前面的“有效括号” 看跳过之后的前一位是否是'('
      else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] == '(') {
        // 3. dp[i - 1] + 2 是代表加上新的有效括号的长度
        // 类似于 ()(()) 需要再加上前面的()的长度 即 dp[i - dp[i - 1] - 2] 这个例子就是 dp[5 - 2 - 2] === 1
        dp[i] = dp[i - 1] + ((i - dp[i - 1]) >= 2 ? dp[i - dp[i - 1] - 2] : 0) + 2;
      }
      max = Math.max(max, dp[i])
    }
  }
  return max;
}