# 🚀 PROJECT PROMPT — INTERACTIVE PROGRAMMING ACADEMY

Bạn là một **Senior Full-Stack Engineer + Software Architect + Computer Science Educator + UI/UX Designer + Algorithm Visualization Engineer**.

Hãy xây dựng một nền tảng web học lập trình tương tác có tên tạm thời:

# 🧠 CODEVERSE ACADEMY

Mục tiêu:

> Biến việc học lập trình từ "đọc lý thuyết → xem code → tự đoán" thành "quan sát → tương tác → viết code → chạy thử → sửa lỗi → làm bài tập → xây project → tiến bộ".

Website phải có cảm giác giống một **hệ thống đào tạo lập trình chuyên nghiệp**, không phải một blog chứa bài viết.

---

# 1. MỤC TIÊU CỐT LÕI

Website phải giải quyết 6 vấn đề:

1. Người mới không biết nên học lập trình từ đâu.
2. Học syntax nhưng không hiểu chương trình thực sự chạy như thế nào.
3. Học thuật toán nhưng khó hình dung từng bước.
4. Xem video nhưng thiếu tương tác.
5. Viết code nhưng không có môi trường luyện tập.
6. Học nhiều ngôn ngữ nhưng không biết lộ trình giữa chúng.

Vì vậy hệ thống phải kết hợp:

* Learning Roadmap
* Programming Courses
* Interactive Lessons
* Algorithm Visualizer
* Code Playground
* Code Execution
* Video Learning
* Exercises
* Quizzes
* Projects
* Progress Tracking
* Skill Tree
* Achievement System

---

# 2. CẤU TRÚC WEBSITE

Thiết kế website theo kiến trúc:

```text
/
├── Home
├── Roadmap
├── Languages
├── Algorithms
├── Data Structures
├── Playground
├── Courses
├── Exercises
├── Projects
├── Videos
├── Progress
├── Profile
└── Search
```

---

# 3. TRANG HOME

Trang chủ phải giải thích ngay:

## "Bạn muốn trở thành gì?"

Cho người dùng lựa chọn:

* Software Engineer
* Full-Stack Developer
* Backend Developer
* Frontend Developer
* Mobile Developer
* AI Engineer
* Data Scientist
* Cybersecurity Engineer
* Network Engineer
* Embedded/IoT Developer
* Game Developer
* Algorithm/Competitive Programmer

Sau khi chọn mục tiêu:

→ hệ thống đề xuất Roadmap phù hợp.

Ví dụ:

```text
Software Engineer
        ↓
Programming Fundamentals
        ↓
Python / C++
        ↓
Data Structures
        ↓
Algorithms
        ↓
Git & GitHub
        ↓
Database
        ↓
Backend
        ↓
API
        ↓
System Design
        ↓
Testing
        ↓
Deployment
        ↓
Real Projects
```

---

# 4. ROADMAP ENGINE

Tạo hệ thống Roadmap trực quan.

Mỗi roadmap là một cây kỹ năng:

```text
BEGINNER
   │
   ├── Programming Fundamentals
   │
   ├── Git
   │
   └── Basic Computer Science
          │
          ▼
INTERMEDIATE
   │
   ├── Data Structures
   ├── Algorithms
   ├── Database
   ├── Networking
   └── Operating Systems
          │
          ▼
ADVANCED
   │
   ├── System Design
   ├── Architecture
   ├── Distributed Systems
   ├── Security
   └── Cloud
```

Mỗi node phải có:

* tên kỹ năng
* mô tả
* prerequisite
* độ khó
* thời gian dự kiến
* lessons
* exercises
* projects
* trạng thái:

```text
Locked
Available
In Progress
Completed
Mastered
```

---

# 5. HỆ THỐNG HỌC NGÔN NGỮ

Mỗi ngôn ngữ là một khóa học riêng.

Các ngôn ngữ ban đầu:

### Core

* Python
* C
* C++
* Java
* JavaScript
* TypeScript

### Web

* HTML
* CSS
* JavaScript
* TypeScript

### Database

* SQL

### Sau này có thể mở rộng:

* C#
* Go
* Rust
* Kotlin
* Swift
* PHP
* Dart
* Lua
* R

---

# 6. CẤU TRÚC MỖI KHÓA HỌC

Mỗi language phải được chia thành:

```text
Language
│
├── Level 0 — Orientation
│
├── Level 1 — Fundamentals
│
├── Level 2 — Core Syntax
│
├── Level 3 — Control Flow
│
├── Level 4 — Functions
│
├── Level 5 — Data Structures
│
├── Level 6 — OOP
│
├── Level 7 — Error Handling
│
├── Level 8 — Modules & Packages
│
├── Level 9 — File & Data
│
├── Level 10 — Advanced
│
├── Level 11 — Algorithms
│
├── Level 12 — Real-world Programming
│
└── Final Projects
```

Không được chỉ có lý thuyết.

Mỗi chapter phải có nhiều loại nội dung.

---

# 7. CẤU TRÚC MỘT LESSON

Mỗi bài học nên gồm:

```text
Lesson
│
├── 1. Learning Objective
├── 2. Concept
├── 3. Why it matters
├── 4. Visual Explanation
├── 5. Syntax
├── 6. Example
├── 7. Code Playground
├── 8. Step-by-step Execution
├── 9. Common Mistakes
├── 10. Debugging
├── 11. Quiz
├── 12. Practice
├── 13. Challenge
├── 14. Mini Project
└── 15. Summary
```

---

# 8. ALGORITHM VISUALIZER — TÍNH NĂNG QUAN TRỌNG NHẤT

Xây một hệ thống mô phỏng thuật toán trực quan.

Người dùng có thể:

* Play
* Pause
* Step Forward
* Step Backward
* Restart
* Speed Control
* Randomize Input

Ví dụ:

## Bubble Sort

Hiển thị:

```text
[5] [2] [8] [1] [3]

     ↓ compare

[5] [2]
 ↑   ↑

5 > 2

     ↓ swap

[2] [5] [8] [1] [3]
```

Sau mỗi bước phải hiển thị:

```text
Current Step: 3

Comparing:
index 1
index 2

Operation:
SWAP

Array:
[2, 5, 8, 1, 3]
```

---

# 9. ALGORITHM VISUALIZER PHẢI CÓ CODE EXECUTION

Không chỉ animation.

Phải liên kết animation với code.

Ví dụ:

```python
for i in range(len(arr)):
    for j in range(len(arr) - i - 1):
        if arr[j] > arr[j + 1]:
            arr[j], arr[j + 1] = arr[j + 1], arr[j]
```

Khi chương trình chạy:

→ dòng code đang thực thi được highlight.

Ví dụ:

```text
Line 3
if arr[j] > arr[j + 1]:
```

Visualizer đồng thời highlight:

```text
[5] [2] [8] [1]

 ↑   ↑
 j  j+1
```

Người học phải nhìn thấy:

```text
SOURCE CODE
     ↓
PROGRAM STATE
     ↓
VARIABLES
     ↓
MEMORY
     ↓
VISUALIZATION
```

---

# 10. CODE EXECUTION ENGINE

Tạo Code Playground.

Giao diện:

```text
┌──────────────────────────────────────┐
│ Code Editor                          │
│                                      │
│ 1  arr = [5,2,8,1]                   │
│ 2                                      │
│ 3  for i in range(...):              │
│                                      │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ Output                               │
│                                      │
│ [1,2,5,8]                            │
└──────────────────────────────────────┘
```

Các tính năng:

* syntax highlighting
* autocomplete
* run
* stop
* reset
* input
* output
* error output
* execution time
* memory usage nếu khả thi
* line highlighting
* variable inspector
* call stack
* memory visualization

---

# 11. MEMORY VISUALIZER

Đây là tính năng nâng cao.

Cho phép người học nhìn thấy:

```text
STACK
────────────────
main()
x = 10
arr → 0x001

────────────────

HEAP
────────────────
0x001
[10,20,30]
```

Khi gọi function:

```text
main()
   ↓
calculate()
   ↓
helper()
```

Call stack phải thay đổi trực quan.

Mục tiêu:

> Người học hiểu chương trình thực sự hoạt động trong memory như thế nào.

---

# 12. DATA STRUCTURE VISUALIZER

Xây visualizer cho:

### Array

### Linked List

```text
[10] → [20] → [30] → NULL
```

### Stack

```text
TOP
 ↓
[30]
[20]
[10]
```

### Queue

```text
FRONT → [10][20][30] ← REAR
```

### Tree

```text
       10
      /  \
     5    20
    / \
   2   7
```

### Binary Search Tree

### Heap

### Hash Table

### Graph

### Trie

Mỗi cấu trúc phải có animation cho:

* insert
* delete
* search
* update
* traversal

---

# 13. ALGORITHM LIBRARY

Tạo thư viện thuật toán.

## Sorting

* Bubble Sort
* Selection Sort
* Insertion Sort
* Merge Sort
* Quick Sort
* Heap Sort
* Counting Sort
* Radix Sort

## Searching

* Linear Search
* Binary Search

## Graph

* BFS
* DFS
* Dijkstra
* Bellman-Ford
* Floyd-Warshall
* A*
* Topological Sort

## Dynamic Programming

* Fibonacci
* Knapsack
* Longest Common Subsequence
* Coin Change
* LIS

## Greedy

* Activity Selection
* Fractional Knapsack
* Huffman Coding

---

# 14. VIDEO LEARNING

Mỗi lesson có khu vực:

```text
VIDEO LESSON
──────────────────────

▶ Video

00:00 ───────── 12:35
```

Bên dưới:

* transcript
* timestamps
* key concepts
* notes
* related lesson

Video không được thay thế nội dung tương tác.

Video chỉ là một layer bổ sung.

---

# 15. HỆ THỐNG BÀI TẬP

Tạo nhiều loại bài tập.

## Type 1 — Multiple Choice

Ví dụ:

```text
Độ phức tạp của Binary Search là?

A. O(n)
B. O(log n)
C. O(n²)
D. O(2ⁿ)
```

## Type 2 — Predict Output

```python
x = 5
x += 2
print(x)
```

Hỏi:

```text
Output?
```

## Type 3 — Fill The Code

```python
for i in range(____):
```

## Type 4 — Debugging

Cho code sai.

Người học phải tìm bug.

## Type 5 — Code Challenge

Người học tự viết code.

## Type 6 — Algorithm Tracing

Cho trạng thái:

```text
[5,2,8,1]
```

Hỏi bước tiếp theo.

## Type 7 — Drag & Drop

Sắp xếp các bước thuật toán.

## Type 8 — Matching

Match:

```text
Algorithm → Complexity
```

## Type 9 — SQL Challenge

Viết query.

## Type 10 — Project Challenge

Xây chương trình hoàn chỉnh.

---

# 16. HỆ THỐNG ĐÁNH GIÁ

Mỗi lesson có:

```text
Understanding: 85%
Syntax: 90%
Problem Solving: 72%
Algorithm: 60%
```

Tổng:

```text
Mastery Score: 78%
```

Nếu dưới 70%:

→ đề xuất học lại.

70–85%:

→ có thể tiếp tục.

85–95%:

→ proficient.

95%+:

→ mastery.

---

# 17. LEARNING ADAPTATION

Hệ thống phải phát hiện điểm yếu.

Ví dụ:

```text
Your weakest skills:

1. Recursion      42%
2. Pointers       55%
3. Big-O           61%
```

Sau đó tự đề xuất:

```text
Recommended Review

→ Recursion Fundamentals
→ Stack & Call Stack
→ Recursive Tree Visualization
→ 5 Practice Problems
```

---

# 18. PROJECT-BASED LEARNING

Mỗi level phải có project.

Ví dụ Python:

### Beginner

* Calculator
* Number Guessing Game
* To-do CLI
* Password Generator

### Intermediate

* File Organizer
* Web Scraper
* REST API
* CLI Management System

### Advanced

* Web Application
* Chat Application
* Task Management API
* Mini Search Engine
* Recommendation System

---

# 19. FINAL PROJECT

Mỗi language có Final Project.

Ví dụ:

```text
Python
↓
Build a CLI Banking System
```

JavaScript:

```text
Build a Web Application
```

C++:

```text
Build a Data Structure Library
```

Java:

```text
Build a Backend Management System
```

---

# 20. CROSS-LANGUAGE COMPARISON

Tạo tính năng:

# "Learn Once — Understand Everywhere"

Ví dụ:

```text
Python                  C++                  JavaScript

for i in range(10)      for(int i=0;          for(let i=0;
                           i<10; i++)             i<10; i++)
```

Cho phép so sánh:

* syntax
* variables
* loops
* functions
* OOP
* arrays
* memory
* pointers
* error handling
* async
* performance

---

# 21. CONCEPT GRAPH

Mỗi kiến thức phải liên kết với kiến thức khác.

Ví dụ:

```text
Variable
   ↓
Memory
   ↓
Pointer
   ↓
Reference
   ↓
Data Structure
   ↓
Algorithm
   ↓
Complexity
```

Người học có thể click vào node để đi đến bài học.

---

# 22. SEARCH SYSTEM

Search toàn bộ:

* courses
* lessons
* algorithms
* concepts
* exercises
* projects
* code examples

Ví dụ:

```text
Search: recursion
```

Trả về:

```text
Concept
├── Recursion
├── Stack
├── Call Stack
├── Base Case

Lessons
├── Recursion Fundamentals
├── Recursive Algorithms

Algorithms
├── DFS
├── Factorial
├── Fibonacci

Exercises
├── 12 exercises
```

---

# 23. USER PROGRESS

Dashboard:

```text
WELCOME BACK, HÀU

Overall Progress
████████████░░ 78%

Python
██████████████ 92%

C++
████████░░░░░░ 61%

Algorithms
███████░░░░░░░ 52%

Data Structures
████████░░░░░░ 65%
```

Hiển thị:

* current streak
* completed lessons
* solved exercises
* mastered concepts
* projects completed
* XP
* achievements

---

# 24. GAMIFICATION

Có:

* XP
* Levels
* Streak
* Badges
* Achievements
* Daily Challenge
* Weekly Challenge

Ví dụ:

```text
🏆 First Algorithm
🏆 100 Problems Solved
🏆 7 Day Streak
🏆 Sorting Master
🏆 Debugging Detective
🏆 Data Structure Explorer
```

Gamification phải hỗ trợ học tập, không biến website thành game vô nghĩa.

---

# 25. DAILY LEARNING SYSTEM

Dashboard mỗi ngày:

```text
TODAY'S PLAN

□ 20 min — Python
□ 15 min — Algorithms
□ 3 exercises
□ 1 coding challenge
□ 10 min review
```

Hệ thống tự tạo daily plan dựa trên:

* mục tiêu
* tiến độ
* điểm yếu
* thời gian người dùng có
* lịch sử học tập

---

# 26. COURSE PAGE

Thiết kế:

```text
Python Programming
────────────────────────

Progress: 42%

[✓] Chapter 1
[✓] Chapter 2
[→] Chapter 3
[ ] Chapter 4
[🔒] Chapter 5

        ↓

Current Lesson

Variables & Memory

[Learn]
```

---

# 27. LESSON UI

Màn hình học phải chia thành:

```text
┌───────────────┬────────────────────────────┐
│ Course        │ Lesson                     │
│               │                            │
│ Chapter 1     │ Concept                    │
│ Chapter 2     │                            │
│ Chapter 3     │ Visualization              │
│ Chapter 4     │                            │
│               │ Code                       │
│               │                            │
│               │ Playground                 │
│               │                            │
│               │ Exercise                   │
└───────────────┴────────────────────────────┘
```

Responsive trên:

* Desktop
* Laptop
* Tablet
* Mobile

---

# 28. DESIGN SYSTEM

Phong cách:

* modern
* clean
* technical
* futuristic nhưng không lòe loẹt
* developer-oriented
* dễ đọc
* ít animation vô nghĩa

Không dùng:

* gradient quá mức
* glassmorphism quá nặng
* icon AI vô nghĩa
* UI giống landing page bán khóa học

Ưu tiên:

* typography
* code readability
* visualization
* information hierarchy
* keyboard accessibility

Dark mode là mặc định nhưng phải có Light mode.

---

# 29. TECH STACK

Nếu không có yêu cầu khác, sử dụng:

### Frontend

* Next.js
* TypeScript
* React
* Tailwind CSS
* shadcn/ui

### Code Editor

* Monaco Editor

### Visualization

* SVG
* Canvas
* React Flow nếu phù hợp
* Framer Motion cho animation cần thiết

### Backend

* Next.js API
* PostgreSQL

### ORM

* Drizzle ORM

### Authentication

* Auth.js / NextAuth

### State

* Zustand

### Validation

* Zod

### Charts

* Recharts nếu cần

---

# 30. CODE EXECUTION SECURITY

Code execution phải được thiết kế an toàn.

KHÔNG chạy code người dùng trực tiếp trên server chính.

Kiến trúc ưu tiên:

```text
User
 ↓
API
 ↓
Execution Queue
 ↓
Sandbox / Isolated Runtime
 ↓
Resource Limits
 ↓
Output
```

Có:

* timeout
* memory limit
* CPU limit
* process isolation
* restricted filesystem
* restricted network
* maximum output size

Nếu chưa thể triển khai sandbox thật ở phiên bản MVP:

→ tạo mock execution engine nhưng thiết kế abstraction để sau này thay bằng sandbox thật.

---

# 31. CONTENT ARCHITECTURE

Không hard-code toàn bộ lesson vào component.

Dùng cấu trúc:

```text
content/
├── python/
│   ├── fundamentals/
│   ├── control-flow/
│   ├── functions/
│   ├── oop/
│   └── algorithms/
│
├── cpp/
├── javascript/
├── java/
└── sql/
```

Lesson có schema:

```ts
interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  prerequisites: string[];
  objectives: string[];
  sections: Section[];
  exercises: Exercise[];
  project?: Project;
}
```

---

# 32. ADMIN / CONTENT MANAGEMENT

Tạo CMS đơn giản để quản lý:

* courses
* chapters
* lessons
* exercises
* videos
* algorithms
* projects

Admin có thể:

```text
Create
Edit
Delete
Publish
Unpublish
Reorder
```

---

# 33. ACCESSIBILITY

Phải hỗ trợ:

* keyboard navigation
* screen reader
* focus state
* semantic HTML
* readable contrast
* reduced motion

---

# 34. PERFORMANCE

Website phải:

* lazy load visualization
* lazy load video
* code split
* optimize images
* avoid unnecessary re-render
* cache course data
* virtualize long lists nếu cần

---

# 35. MVP PHASE

Không cố xây toàn bộ ngay lập tức.

Phase 1:

```text
✓ Home
✓ Roadmap
✓ Python Course
✓ Lesson System
✓ Code Editor
✓ Basic Code Execution
✓ Exercises
✓ Progress
✓ Algorithm Visualizer
```

Chỉ cần hoàn thiện:

### Python

10–15 lessons đầu tiên.

### Algorithms

* Bubble Sort
* Binary Search
* Linear Search
* Stack
* Queue

Sau khi architecture ổn định:

Phase 2:

* C++
* JavaScript
* Data Structures
* More algorithms

Phase 3:

* Java
* TypeScript
* SQL
* Projects

Phase 4:

* AI adaptive learning
* Advanced sandbox
* collaboration
* leaderboard
* certificates

---

# 36. DEMO EXPERIENCE

Khi người dùng mở:

```text
Algorithms → Sorting → Bubble Sort
```

Hệ thống phải tạo trải nghiệm:

### Step 1

Giải thích:

> Bubble Sort repeatedly compares adjacent elements and swaps them when they are in the wrong order.

### Step 2

Hiển thị array:

```text
[5] [3] [8] [1] [2]
```

### Step 3

User bấm:

▶ PLAY

### Step 4

Animation:

```text
[5] [3] [8] [1] [2]
 ↑   ↑

Compare
```

### Step 5

```text
5 > 3

SWAP

[3] [5] [8] [1] [2]
```

### Step 6

Code line tương ứng sáng lên.

### Step 7

Variable state cập nhật.

### Step 8

Sau khi hoàn thành:

```text
Time Complexity
Best: O(n)
Average: O(n²)
Worst: O(n²)

Space Complexity
O(1)
```

### Step 9

Đưa bài tập:

> Implement Bubble Sort yourself.

---

# 37. AI LEARNING ASSISTANT

Có thể tích hợp AI assistant sau này.

AI không được lập tức đưa đáp án.

Thay vào đó:

```text
User:
Why is my code wrong?

AI:

Hint 1:
Look at your loop condition.

Hint 2:
What happens when j reaches the last element?

Hint 3:
Compare j with len(array) - 1.
```

Chỉ đưa full solution khi người học yêu cầu.

AI phải đóng vai:

> Tutor, not answer machine.

---

# 38. LEARNING SCIENCE

Thiết kế hệ thống dựa trên:

* Active Recall
* Spaced Repetition
* Retrieval Practice
* Interleaving
* Deliberate Practice
* Project-Based Learning

Sau mỗi lesson:

```text
Learn
 ↓
Recall
 ↓
Practice
 ↓
Apply
 ↓
Review
```

---

# 39. DATABASE MODEL

Thiết kế database có ít nhất:

```text
users
courses
chapters
lessons
sections
exercises
questions
answers
submissions
projects
algorithms
algorithm_steps
videos
skills
roadmaps
user_progress
user_skill_progress
achievements
user_achievements
study_sessions
```

Thiết kế quan hệ rõ ràng.

---

# 40. ERROR HANDLING

Không được để lỗi kỹ thuật xuất hiện trực tiếp với người dùng.

Có:

```text
Loading
Empty
Error
Retry
Success
```

Ví dụ:

```text
Something went wrong.

We couldn't load this lesson.

[Retry]
```

---

# 41. PROJECT QUALITY STANDARD

Không tạo prototype sơ sài.

Code phải:

* modular
* typed
* maintainable
* scalable
* reusable
* documented

Tách rõ:

```text
components/
features/
lib/
hooks/
services/
types/
content/
database/
```

Không tạo một file component 2000 dòng.

---

# 42. DEVELOPMENT PROCESS

Thực hiện theo thứ tự:

### STEP 1

Phân tích requirements.

### STEP 2

Thiết kế architecture.

### STEP 3

Thiết kế database.

### STEP 4

Thiết kế UI/UX.

### STEP 5

Tạo project structure.

### STEP 6

Implement core layout.

### STEP 7

Implement course system.

### STEP 8

Implement lesson system.

### STEP 9

Implement code editor.

### STEP 10

Implement algorithm visualizer.

### STEP 11

Implement exercise engine.

### STEP 12

Implement progress system.

### STEP 13

Seed educational content.

### STEP 14

Testing.

### STEP 15

Performance optimization.

---

# 43. QUY TẮC QUAN TRỌNG

Không được:

* tạo UI giả nhưng button không hoạt động
* tạo progress giả
* tạo code editor giả
* tạo algorithm animation chỉ để trang trí
* hard-code dữ liệu vào UI nếu có thể đưa vào content/data layer
* dùng lorem ipsum
* tạo các trang placeholder vô nghĩa

Nếu tính năng chưa implement:

→ ghi rõ TODO.

---

# 44. DOCUMENTATION

Tạo:

```text
README.md
ARCHITECTURE.md
DATABASE.md
ROADMAP.md
CONTRIBUTING.md
SECURITY.md
```

README phải có:

* project overview
* installation
* environment variables
* development
* database setup
* seed data
* testing
* deployment

---

# 45. FINAL REQUIREMENT

Hãy xây dựng hệ thống với tư duy:

> "Đây không phải website chứa tài liệu học lập trình."

Mà là:

> "Một môi trường đào tạo lập trình tương tác, nơi người học có thể nhìn thấy chương trình chạy như thế nào, tự viết code, tự mắc lỗi, tự sửa lỗi, luyện tập thuật toán, xây project và theo dõi quá trình trở thành programmer."

Ưu tiên theo thứ tự:

```text
Educational Quality
        ↓
Correctness
        ↓
Interactivity
        ↓
User Experience
        ↓
Performance
        ↓
Visual Design
```

Hãy bắt đầu bằng việc:

1. phân tích toàn bộ yêu cầu
2. đề xuất architecture
3. đề xuất folder structure
4. đề xuất database schema
5. tạo roadmap
6. tạo UI wireframe
7. implement MVP
8. tạo dữ liệu mẫu
9. test toàn bộ flow
10. sau mỗi phase báo cáo:

* đã hoàn thành gì
* còn gì
* bug
* technical debt
* bước tiếp theo

Không nhảy thẳng vào viết hàng nghìn dòng code.

Hãy xây dựng nền móng đủ tốt để sau này có thể mở rộng từ vài chục bài học thành **hàng nghìn lesson, hàng nghìn bài tập và nhiều ngôn ngữ lập trình**.
