import { Algorithm } from "@/types";

function generateBubbleSortSteps(arr: number[]): Algorithm["steps"] {
  const steps: Algorithm["steps"] = [];
  const a = [...arr];
  const n = a.length;

  steps.push({
    array: [...a],
    lineHighlight: 0,
    description: "Bắt đầu Bubble Sort",
    variables: { i: 0, j: 0 },
  });

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...a],
        comparing: [j, j + 1],
        lineHighlight: 3,
        description: `So sánh arr[${j}]=${a[j]} và arr[${j + 1}]=${a[j + 1]}`,
        variables: { i, j, "arr[j]": a[j], "arr[j+1]": a[j + 1] },
      });

      if (a[j] > a[j + 1]) {
        steps.push({
          array: [...a],
          swapping: [j, j + 1],
          lineHighlight: 4,
          description: `${a[j]} > ${a[j + 1]}, cần swap`,
          variables: { i, j, "arr[j]": a[j], "arr[j+1]": a[j + 1] },
        });

        [a[j], a[j + 1]] = [a[j + 1], a[j]];

        steps.push({
          array: [...a],
          swapped: [j, j + 1],
          lineHighlight: 5,
          description: `Swap thành công: [${a.join(", ")}]`,
          variables: { i, j },
        });
      }
    }
  }

  steps.push({
    array: [...a],
    sorted: a.map((_, idx) => idx),
    lineHighlight: 7,
    description: "Hoàn thành Bubble Sort!",
    variables: {},
  });

  return steps;
}

function generateBinarySearchSteps(arr: number[], target: number): Algorithm["steps"] {
  const steps: Algorithm["steps"] = [];
  const sorted = [...arr].sort((a, b) => a - b);
  let left = 0;
  let right = sorted.length - 1;

  steps.push({
    array: [...sorted],
    lineHighlight: 0,
    description: `Tìm ${target} trong mảng đã sắp xếp`,
    variables: { left, right, target },
  });

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    steps.push({
      array: [...sorted],
      comparing: [mid],
      lineHighlight: 2,
      description: `mid = ${mid}, arr[${mid}] = ${sorted[mid]}`,
      variables: { left, right, mid, "arr[mid]": sorted[mid], target },
    });

    if (sorted[mid] === target) {
      steps.push({
        array: [...sorted],
        found: mid,
        lineHighlight: 3,
        description: `Tìm thấy ${target} tại index ${mid}!`,
        variables: { left, right, mid, found: mid },
      });
      return steps;
    } else if (sorted[mid] < target) {
      steps.push({
        array: [...sorted],
        lineHighlight: 4,
        description: `${sorted[mid]} < ${target}, tìm bên phải`,
        variables: { left, right, mid, target },
      });
      left = mid + 1;
    } else {
      steps.push({
        array: [...sorted],
        lineHighlight: 5,
        description: `${sorted[mid]} > ${target}, tìm bên trái`,
        variables: { left, right, mid, target },
      });
      right = mid - 1;
    }
  }

  steps.push({
    array: [...sorted],
    lineHighlight: 7,
    description: `Không tìm thấy ${target}`,
    variables: { left, right, target },
  });

  return steps;
}

function generateLinearSearchSteps(arr: number[], target: number): Algorithm["steps"] {
  const steps: Algorithm["steps"] = [];

  steps.push({
    array: [...arr],
    lineHighlight: 0,
    description: `Tìm ${target} trong mảng`,
    variables: { target, i: 0 },
  });

  for (let i = 0; i < arr.length; i++) {
    steps.push({
      array: [...arr],
      comparing: [i],
      lineHighlight: 2,
      description: `Kiểm tra arr[${i}] = ${arr[i]}`,
      variables: { i, "arr[i]": arr[i], target },
    });

    if (arr[i] === target) {
      steps.push({
        array: [...arr],
        found: i,
        lineHighlight: 3,
        description: `Tìm thấy ${target} tại index ${i}!`,
        variables: { i, found: i },
      });
      return steps;
    }
  }

  steps.push({
    array: [...arr],
    lineHighlight: 5,
    description: `Không tìm thấy ${target}`,
    variables: { target },
  });

  return steps;
}

export const algorithms: Algorithm[] = [
  {
    id: "bubble-sort",
    name: "Bubble Sort",
    category: "sorting",
    description: "Bubble Sort repeatedly compares adjacent elements and swaps them when they are in the wrong order. The pass through the list is repeated until the list is sorted.",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
    language: "python",
    steps: generateBubbleSortSteps([5, 3, 8, 1, 2]),
  },
  {
    id: "binary-search",
    name: "Binary Search",
    category: "searching",
    description: "Binary Search finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.",
    timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
    spaceComplexity: "O(1)",
    code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
    language: "python",
    steps: generateBinarySearchSteps([5, 3, 8, 1, 2, 7, 4], 7),
  },
  {
    id: "linear-search",
    name: "Linear Search",
    category: "searching",
    description: "Linear Search sequentially checks each element of the list until a match is found or the whole list has been searched.",
    timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(1)",
    code: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
    language: "python",
    steps: generateLinearSearchSteps([5, 3, 8, 1, 2], 8),
  },
];

export function generateSteps(algorithmId: string, input: number[], target?: number): Algorithm["steps"] {
  switch (algorithmId) {
    case "bubble-sort":
      return generateBubbleSortSteps(input);
    case "binary-search":
      return generateBinarySearchSteps(input, target ?? input[0]);
    case "linear-search":
      return generateLinearSearchSteps(input, target ?? input[0]);
    default:
      return algorithms[0].steps;
  }
}
