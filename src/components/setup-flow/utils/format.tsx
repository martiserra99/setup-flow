import * as constants from "../constants";

const mapTeams = Object.fromEntries(
  constants.teams.map(({ value, label }) => [value, label]),
);

const mapTemplates = Object.fromEntries(
  constants.templates.map(({ value, label }) => [value, label]),
);

const mapRoles = Object.fromEntries(
  constants.roles.map(({ value, label }) => [value, label]),
);

const mapThemes = Object.fromEntries(
  constants.themes.map(({ value, label }) => [value, label]),
);

const mapTimezones = Object.fromEntries(
  constants.timezones.map(({ value, label }) => [value, label]),
);

const mapLanguages = Object.fromEntries(
  constants.languages.map(({ value, label }) => [value, label]),
);

export function team(team: string): string {
  return mapTeams[team];
}

export function name(name: string): string {
  return name ? name : "-";
}

export function template(template: string): string {
  return mapTemplates[template];
}

export function theme(theme: string): string {
  return mapThemes[theme];
}

export function role(role: string): string {
  return mapRoles[role];
}

export function members(members: string[]): string {
  const filled = members.filter((s) => s.length > 0);
  if (filled.length === 0) return "None";
  return filled.length === 1 ? "1 person" : `${filled.length} people`;
}

export function timezone(timezone: string): string {
  return mapTimezones[timezone];
}

export function language(language: string): string {
  return mapLanguages[language];
}
