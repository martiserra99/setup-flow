import {
  UsersIcon,
  TerminalIcon,
  TrendingUpIcon,
  Building2Icon,
  UserIcon,
  LayoutGridIcon,
  FileTextIcon,
  UserPlusIcon,
  ZapIcon,
  BriefcaseIcon,
  SunIcon,
  MoonIcon,
  MonitorIcon,
  PenToolIcon,
} from "lucide-react";

export const teams = [
  { value: "product", label: "Product Team", icon: <UsersIcon /> },
  { value: "engineering", label: "Engineering", icon: <TerminalIcon /> },
  { value: "marketing", label: "Marketing", icon: <TrendingUpIcon /> },
  { value: "agency", label: "Agency", icon: <Building2Icon /> },
  { value: "freelance", label: "Freelancer", icon: <UserIcon /> },
  { value: "other", label: "Other", icon: <LayoutGridIcon /> },
];

export const templates = [
  {
    value: "survey",
    label: "Customer Survey",
    description: "Collect feedback and insights",
    icon: <FileTextIcon />,
  },
  {
    value: "onboarding",
    label: "Onboarding Flow",
    description: "Guide new users through setup",
    icon: <UserPlusIcon />,
  },
  {
    value: "lead",
    label: "Lead Capture",
    description: "Generate and qualify leads",
    icon: <ZapIcon />,
  },
  {
    value: "application",
    label: "Job Application",
    description: "Multi-step application form",
    icon: <BriefcaseIcon />,
  },
];

export const roles = [
  { value: "developer", label: "Developer", icon: <TerminalIcon /> },
  { value: "designer", label: "Designer", icon: <PenToolIcon /> },
  { value: "product", label: "Product", icon: <LayoutGridIcon /> },
  { value: "marketing", label: "Marketing", icon: <TrendingUpIcon /> },
  { value: "leadership", label: "Leadership", icon: <BriefcaseIcon /> },
  { value: "other", label: "Other", icon: <UserIcon /> },
];

export const themes = [
  { value: "light", label: "Light", icon: <SunIcon /> },
  { value: "dark", label: "Dark", icon: <MoonIcon /> },
  { value: "system", label: "System", icon: <MonitorIcon /> },
];

export const timezones = [
  { value: "utc", label: "UTC" },
  { value: "america/new_york", label: "America/New_York" },
  { value: "america/chicago", label: "America/Chicago" },
  { value: "america/denver", label: "America/Denver" },
  { value: "america/los_angeles", label: "America/Los_Angeles" },
  { value: "america/sao_paulo", label: "America/Sao_Paulo" },
  { value: "europe/london", label: "Europe/London" },
  { value: "europe/paris", label: "Europe/Paris" },
  { value: "europe/berlin", label: "Europe/Berlin" },
  { value: "europe/moscow", label: "Europe/Moscow" },
  { value: "asia/dubai", label: "Asia/Dubai" },
  { value: "asia/kolkata", label: "Asia/Kolkata" },
  { value: "asia/singapore", label: "Asia/Singapore" },
  { value: "asia/tokyo", label: "Asia/Tokyo" },
  { value: "asia/shanghai", label: "Asia/Shanghai" },
  { value: "australia/sydney", label: "Australia/Sydney" },
];

export const languages = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "portuguese", label: "Portuguese" },
  { value: "italian", label: "Italian" },
  { value: "dutch", label: "Dutch" },
  { value: "russian", label: "Russian" },
  { value: "japanese", label: "Japanese" },
  { value: "chinese", label: "Chinese" },
  { value: "korean", label: "Korean" },
  { value: "arabic", label: "Arabic" },
];
