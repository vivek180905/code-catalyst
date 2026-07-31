import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

const NAMES = [
  "Uday Pratap Yadav", "Utsav Kumar", "Uttam Singh", "Vaibhav", "Vaibhav Gupta",
  "Vaibhav Kanojia", "Vaibhav Prakash", "Varun Gupta", "Vatsalya Soni", "Vikash Kumar",
  "Vishal", "Vishal Gupta", "Vishvendra Yadav", "Vivek", "Vivek Kumar",
  "Vivek Kumar Meena", "Vivek Raj", "Yash Goyal", "Yash Kumar Gola", "Yash Kumar Sharma",
  "Yash Rana", "Yash Shah", "Yashraj", "Yogesh Kumar", "Yugank Jain"
];

const SNIPPET_TEMPLATES = [
  { title: "Binary Search", language: "python", code: "def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1" },
  { title: "Fibonacci Sequence", language: "javascript", code: "function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}" },
  { title: "Quick Sort", language: "cpp", code: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid quickSort(vector<int>& arr, int low, int high) {\n    if (low < high) {\n        int pivot = arr[high];\n        int i = (low - 1);\n        for (int j = low; j <= high - 1; j++) {\n            if (arr[j] < pivot) {\n                i++;\n                swap(arr[i], arr[j]);\n            }\n        }\n        swap(arr[i + 1], arr[high]);\n        int pi = i + 1;\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}" },
  { title: "Two Sum", language: "java", code: "import java.util.HashMap;\nimport java.util.Map;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> numMap = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (numMap.containsKey(complement)) {\n                return new int[] { numMap.get(complement), i };\n            }\n            numMap.put(nums[i], i);\n        }\n        return new int[] {};\n    }\n}" },
  { title: "Reverse String", language: "python", code: "def reverse_string(s):\n    return s[::-1]\n\nprint(reverse_string(\"Hello World\"))" },
  { title: "Palindrome Check", language: "javascript", code: "const isPalindrome = (str) => {\n  const cleaned = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();\n  return cleaned === cleaned.split('').reverse().join('');\n};" },
  { title: "Factorial", language: "cpp", code: "#include <iostream>\nusing namespace std;\n\nlong long factorial(int n) {\n    if (n == 0 || n == 1) return 1;\n    return n * factorial(n - 1);\n}" },
  { title: "FizzBuzz", language: "java", code: "class FizzBuzz {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 100; i++) {\n            if (i % 15 == 0) System.out.println(\"FizzBuzz\");\n            else if (i % 3 == 0) System.out.println(\"Fizz\");\n            else if (i % 5 == 0) System.out.println(\"Buzz\");\n            else System.out.println(i);\n        }\n    }\n}" },
  { title: "Merge Sort", language: "python", code: "def merge_sort(arr):\n    if len(arr) > 1:\n        mid = len(arr) // 2\n        L = arr[:mid]\n        R = arr[mid:]\n        merge_sort(L)\n        merge_sort(R)\n        i = j = k = 0\n        while i < len(L) and j < len(R):\n            if L[i] < R[j]:\n                arr[k] = L[i]\n                i += 1\n            else:\n                arr[k] = R[j]\n                j += 1\n            k += 1\n        while i < len(L):\n            arr[k] = L[i]\n            i += 1\n            k += 1\n        while j < len(R):\n            arr[k] = R[j]\n            j += 1\n            k += 1" },
  { title: "Debounce Function", language: "javascript", code: "function debounce(func, wait) {\n  let timeout;\n  return function executedFunction(...args) {\n    const later = () => {\n      clearTimeout(timeout);\n      func(...args);\n    };\n    clearTimeout(timeout);\n    timeout = setTimeout(later, wait);\n  };\n}" }
];

// Dec 1, 2025
const START_DATE = 1764547200000;
// July 31, 2026
const END_DATE = 1785542399000;

export const seedSnippets = internalMutation({
  args: {},
  handler: async (ctx) => {
    let count = 0;
    
    for (const name of NAMES) {
      // Create a dummy user ID based on the name
      const dummyUserId = `user_seeded_${name.replace(/\\s+/g, "_").toLowerCase()}`;
      
      // Select 3 random snippets
      const selectedSnippets = [];
      const templatesCopy = [...SNIPPET_TEMPLATES];
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * templatesCopy.length);
        selectedSnippets.push(templatesCopy[randomIndex]);
        templatesCopy.splice(randomIndex, 1);
      }
      
      for (const snippet of selectedSnippets) {
        // Random date between Dec 2025 and July 2026
        const randomDate = Math.floor(Math.random() * (END_DATE - START_DATE + 1)) + START_DATE;
        
        await ctx.db.insert("snippets", {
          userId: dummyUserId,
          userName: name,
          title: snippet.title,
          language: snippet.language,
          code: snippet.code,
          createdAt: randomDate
        });
        count++;
      }
    }
    
    return `Successfully seeded ${count} snippets!`;
  }
});
