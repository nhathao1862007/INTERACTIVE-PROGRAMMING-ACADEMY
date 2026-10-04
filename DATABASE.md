# CODEVERSE Academy — Database Schema

## ER Diagram

```
users
├── user_progress (1:1)
├── submissions (1:N)
├── study_sessions (1:N)
└── achievements (N:M)

courses
└── chapters (1:N)
    └── lessons (1:N)
        ├── sections (JSONB)
        └── exercises (1:N)

algorithms
└── algorithm_steps (JSONB)

career_paths
└── roadmap (JSONB)

projects
└── project_submissions (1:N)
```

## Tables

### users
| Column | Type | Description |
|--------|------|-------------|
| id | UUID PK | User ID |
| email | VARCHAR(255) | Email (unique) |
| name | VARCHAR(255) | Display name |
| avatar_url | TEXT | Avatar URL |
| created_at | TIMESTAMP | Account creation |

### courses
| Column | Type | Description |
|--------|------|-------------|
| id | UUID PK | Course ID |
| language | VARCHAR(50) | python, cpp, javascript... |
| title | VARCHAR(255) | Course title |
| description | TEXT | Course description |
| icon | VARCHAR(50) | Emoji icon |
| color | VARCHAR(20) | Theme color |
| level | VARCHAR(50) | Difficulty level |

### chapters
| Column | Type | Description |
|--------|------|-------------|
| id | UUID PK | Chapter ID |
| course_id | UUID FK | Parent course |
| title | VARCHAR(255) | Chapter title |
| description | TEXT | Chapter description |
| order | INTEGER | Display order |

### lessons
| Column | Type | Description |
|--------|------|-------------|
| id | UUID PK | Lesson ID |
| chapter_id | UUID FK | Parent chapter |
| title | VARCHAR(255) | Lesson title |
| description | TEXT | Lesson description |
| difficulty | ENUM | beginner/intermediate/advanced |
| duration | INTEGER | Estimated minutes |
| objectives | JSONB | Learning objectives |
| sections | JSONB | Lesson sections |
| code_example | TEXT | Example code |
| language | VARCHAR(50) | Programming language |
| order | INTEGER | Display order |

### exercises
| Column | Type | Description |
|--------|------|-------------|
| id | UUID PK | Exercise ID |
| lesson_id | UUID FK | Parent lesson |
| type | ENUM | multiple_choice, predict_output... |
| title | VARCHAR(255) | Exercise title |
| description | TEXT | Exercise description |
| difficulty | ENUM | beginner/intermediate/advanced |
| points | INTEGER | XP reward |
| code | TEXT | Starter code |
| language | VARCHAR(50) | Programming language |
| options | JSONB | Multiple choice options |
| correct_answer | JSONB | Correct answer |
| hint | TEXT | Hint for learners |
| explanation | TEXT | Explanation after solving |
| test_cases | JSONB | Test cases for code challenges |

### algorithms
| Column | Type | Description |
|--------|------|-------------|
| id | UUID PK | Algorithm ID |
| name | VARCHAR(255) | Algorithm name |
| category | VARCHAR(50) | sorting/searching/graph/dp/greedy |
| description | TEXT | Description |
| time_complexity | JSONB | {best, average, worst} |
| space_complexity | VARCHAR(50) | Space complexity |
| code | TEXT | Implementation code |
| language | VARCHAR(50) | Programming language |
| steps | JSONB | Visualization steps |

### career_paths
| Column | Type | Description |
|--------|------|-------------|
| id | UUID PK | Path ID |
| title | VARCHAR(255) | Career title |
| description | TEXT | Description |
| icon | VARCHAR(50) | Emoji icon |
| roadmap | JSONB | Roadmap nodes |

### user_progress
| Column | Type | Description |
|--------|------|-------------|
| id | UUID PK | Progress ID |
| user_id | UUID FK | Owner |
| overall_progress | INTEGER | 0-100 |
| streak | INTEGER | Days in a row |
| xp | INTEGER | Total XP |
| level | INTEGER | Current level |
| completed_lessons | JSONB | Lesson IDs |
| solved_exercises | JSONB | Exercise IDs |
| mastered_concepts | JSONB | Concept names |
| projects_completed | JSONB | Project IDs |
| achievements | JSONB | Achievement IDs |
| course_progress | JSONB | {courseId: percent} |
| skill_progress | JSONB | {skill: percent} |
| weakest_skills | JSONB | [{skill, score}] |
| daily_plan | JSONB | Daily learning plan |

### submissions
| Column | Type | Description |
|--------|------|-------------|
| id | UUID PK | Submission ID |
| user_id | UUID FK | Submitter |
| exercise_id | UUID FK | Exercise |
| code | TEXT | Submitted code |
| language | VARCHAR(50) | Programming language |
| is_correct | BOOLEAN | Result |
| output | TEXT | Execution output |
| execution_time | INTEGER | Milliseconds |
| submitted_at | TIMESTAMP | Submission time |

### achievements
| Column | Type | Description |
|--------|------|-------------|
| id | UUID PK | Achievement ID |
| title | VARCHAR(255) | Achievement name |
| description | TEXT | Description |
| icon | VARCHAR(50) | Emoji icon |
| condition | VARCHAR(255) | Unlock condition |
| xp_reward | INTEGER | XP reward |

### study_sessions
| Column | Type | Description |
|--------|------|-------------|
| id | UUID PK | Session ID |
| user_id | UUID FK | User |
| date | TIMESTAMP | Session date |
| duration | INTEGER | Minutes studied |
| lessons_completed | INTEGER | Count |
| exercises_solved | INTEGER | Count |
| xp_earned | INTEGER | XP earned |

## Indexes

- `users(email)` — unique
- `chapters(course_id, order)`
- `lessons(chapter_id, order)`
- `exercises(lesson_id)`
- `submissions(user_id, exercise_id)`
- `user_progress(user_id)` — unique
- `study_sessions(user_id, date)`
