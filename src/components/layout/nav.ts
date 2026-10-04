/**
 * @module components/layout/nav
 * Single source of truth for the primary navigation groups.
 * Shared by the desktop Sidebar, the mobile Sheet and the command palette.
 */
import {
  ArrowLeftRight,
  BarChart3,
  BookOpen,
  Code2,
  Database,
  Dumbbell,
  Flame,
  FolderKanban,
  Home,
  Map,
  Network,
  Search,
  Send,
  Terminal,
  Trophy,
  User,
  Video,
  Zap,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  hint?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    label: "Learn",
    items: [
      { href: "/", label: "Home", icon: Home, hint: "Bảng điều khiển" },
      { href: "/roadmap", label: "Roadmap", icon: Map, hint: "Lộ trình kỹ năng" },
      { href: "/courses", label: "Courses", icon: BookOpen, hint: "Khoá học" },
      { href: "/languages", label: "Languages", icon: Code2, hint: "Ngôn ngữ lập trình" },
    ],
  },
  {
    label: "Practice",
    items: [
      { href: "/algorithms", label: "Algorithms", icon: Zap, hint: "Trực quan thuật toán" },
      { href: "/data-structures", label: "Data Structures", icon: Database, hint: "CTDL minh hoạ" },
      { href: "/playground", label: "Playground", icon: Terminal, hint: "Chạy code" },
      { href: "/exercises", label: "Exercises", icon: Dumbbell, hint: "Bài tập" },
      { href: "/daily-challenge", label: "Daily Challenge", icon: Flame, hint: "Thử thách hôm nay" },
      { href: "/projects", label: "Projects", icon: FolderKanban, hint: "Dự án" },
      { href: "/submissions", label: "Submissions", icon: Send, hint: "Bài nộp" },
    ],
  },
  {
    label: "Explore",
    items: [
      { href: "/compare", label: "Compare", icon: ArrowLeftRight, hint: "So sánh ngôn ngữ" },
      { href: "/concept-graph", label: "Concept Graph", icon: Network, hint: "Bản đồ khái niệm" },
      { href: "/videos", label: "Videos", icon: Video, hint: "Video bài giảng" },
      { href: "/search", label: "Search", icon: Search, hint: "Tìm kiếm" },
    ],
  },
  {
    label: "You",
    items: [
      { href: "/progress", label: "Progress", icon: BarChart3, hint: "Tiến độ học" },
      { href: "/achievements", label: "Achievements", icon: Trophy, hint: "Thành tựu" },
      { href: "/profile", label: "Profile", icon: User, hint: "Trang cá nhân" },
    ],
  },
];

/** Flattened list — used by the command palette. */
export const navItems: NavItem[] = navGroups.flatMap((group) => group.items);
