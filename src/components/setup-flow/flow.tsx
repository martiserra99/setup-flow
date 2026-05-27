import type { UnionToIntersection } from "type-fest";
import type { s, Flow } from "@formity/react";

import { z } from "zod";

import type { Steps, FormStep, ReviewStep } from "./types/steps";
import type { FormStatus } from "./types/status";

import { Form } from "./components/form";
import { Review } from "./components/review";

import * as constants from "./constants";
import * as format from "./utils/format";

type Values = UnionToIntersection<Fields[keyof Fields]>;

type Fields = {
  team: {
    team: string;
  };
  project: {
    name: string;
    template: string;
  };
  role: {
    role: string;
    members: string[];
  };
  config: {
    theme: string;
    timezone: string;
    language: string;
    emailNotifications: boolean;
    slackIntegration: boolean;
    weeklyDigest: boolean;
  };
};

const team: FormStep<Fields["team"]> = {
  id: "team",
  label: "Your team",
  subtitle: "Tell us about your team",
  zod: z.object({
    team: z.string().nonempty("Please select a team type"),
  }),
};

const project: FormStep<Fields["project"]> = {
  id: "project",
  label: "First project",
  subtitle: "Create your first form",
  zod: z.object({
    name: z
      .string()
      .trim()
      .nonempty("Please enter a project name")
      .max(100, "Project name must be at most 100 characters"),
    template: z.string().nonempty("Please select a template"),
  }),
};

const role: FormStep<Fields["role"]> = {
  id: "role",
  label: "Your role",
  subtitle: "Role and teammates",
  zod: z.object({
    role: z.string().nonempty("Please select your role"),
    members: z.array(z.email("Please enter a valid email address")),
  }),
};

const config: FormStep<Fields["config"]> = {
  id: "config",
  label: "Configure basics",
  subtitle: "Theme and preferences",
  zod: z.object({
    theme: z.string().nonempty("Please select a theme"),
    timezone: z.string().nonempty("Please select a timezone"),
    language: z.string().nonempty("Please select a language"),
    emailNotifications: z.boolean(),
    slackIntegration: z.boolean(),
    weeklyDigest: z.boolean(),
  }),
};

const review: ReviewStep = {
  id: "review",
  label: "Review & launch",
  subtitle: "Confirm and launch",
};

export const steps: Steps = [team, project, role, config, review];

export type Schema = {
  render: { step: number; form: React.ReactNode };
  struct: [
    s.Jump<s.Form<Fields["team"]>>,
    s.Jump<s.Form<Fields["project"]>>,
    s.Jump<s.Form<Fields["role"]>>,
    s.Jump<s.Form<Fields["config"]>>,
    s.Jump<s.Form<Record<never, never>>>,
    s.Return<Values>,
  ];
  inputs: Values;
  params: {
    status: FormStatus;
    values: Values;
    onValuesChange: (values: Values) => void;
    ref: React.Ref<{ jump: (id: string) => void }>;
  };
};

export const flow: Flow<Schema> = [
  {
    jump: {
      id: team.id,
      at: {
        form: {
          fields: (values) => ({
            team: [values.team, []],
          }),
          render: ({ fields, params, onNext, onJump }) => ({
            step: 0,
            form: (
              <Form
                key={team.id}
                defaultValues={fields}
                validate={team.zod}
                heading="What brings you to Formity?"
                message="We'll personalise your workspace based on your team type."
                content={[
                  {
                    type: "cardChoice",
                    name: "team",
                    label: "Team type",
                    options: constants.teams,
                    hideLabel: true,
                  },
                ]}
                buttons={{
                  back: null,
                  next: "Continue",
                }}
                onNext={onNext}
                onJump={onJump}
                prevId={null}
                values={params.values}
                onValuesChange={params.onValuesChange}
                ref={params.ref}
              />
            ),
          }),
        },
      },
    },
  },
  {
    jump: {
      id: project.id,
      at: {
        form: {
          fields: (values) => ({
            name: [values.name, []],
            template: [values.template, []],
          }),
          render: ({ fields, params, onNext, onJump }) => ({
            step: 1,
            form: (
              <Form
                key={project.id}
                defaultValues={fields}
                validate={project.zod}
                heading="Create your first project"
                message="Start with a template or build from scratch."
                content={[
                  {
                    type: "input",
                    name: "name",
                    label: "Project name",
                    placeholder: "My First Form",
                  },
                  {
                    type: "templateChoice",
                    name: "template",
                    label: "Start from a template",
                    options: constants.templates,
                  },
                ]}
                buttons={{
                  back: "Back",
                  next: "Continue",
                }}
                onNext={onNext}
                onJump={onJump}
                prevId={team.id}
                values={params.values}
                onValuesChange={params.onValuesChange}
                ref={params.ref}
              />
            ),
          }),
        },
      },
    },
  },
  {
    jump: {
      id: role.id,
      at: {
        form: {
          fields: (values) => ({
            role: [values.role, []],
            members: [values.members, []],
          }),
          render: ({ fields, params, onNext, onJump }) => ({
            step: 2,
            form: (
              <Form
                key={role.id}
                defaultValues={fields}
                validate={role.zod}
                heading="Tell us about yourself"
                message="Share your role and optionally invite your teammates."
                content={[
                  {
                    type: "cardChoice",
                    name: "role",
                    label: "Your role",
                    options: constants.roles,
                  },
                  {
                    type: "members",
                    name: "members",
                    label: "Invite members",
                  },
                ]}
                buttons={{
                  back: "Back",
                  next: "Continue",
                }}
                onNext={onNext}
                onJump={onJump}
                prevId={project.id}
                values={params.values}
                onValuesChange={params.onValuesChange}
                ref={params.ref}
              />
            ),
          }),
        },
      },
    },
  },
  {
    jump: {
      id: config.id,
      at: {
        form: {
          fields: (values) => ({
            theme: [values.theme, []],
            timezone: [values.timezone, []],
            language: [values.language, []],
            emailNotifications: [values.emailNotifications, []],
            slackIntegration: [values.slackIntegration, []],
            weeklyDigest: [values.weeklyDigest, []],
          }),
          render: ({ fields, params, onNext, onJump }) => ({
            step: 3,
            form: (
              <Form
                key={config.id}
                defaultValues={fields}
                validate={config.zod}
                heading="Configure basics"
                message="Set your theme, region, and notification preferences."
                content={[
                  {
                    type: "cardChoice",
                    name: "theme",
                    label: "Theme",
                    options: constants.themes,
                  },
                  {
                    type: "select",
                    name: "timezone",
                    label: "Timezone",
                    placeholder: "Select a timezone",
                    options: constants.timezones,
                  },
                  {
                    type: "select",
                    name: "language",
                    label: "Language",
                    placeholder: "Select a language",
                    options: constants.languages,
                  },
                  {
                    type: "divider",
                    label: "Notifications",
                  },
                  {
                    type: "rows",
                    rows: [
                      {
                        type: "switch",
                        name: "emailNotifications",
                        label: "Email notifications",
                        hint: "Get notified about responses and team activity",
                      },
                      {
                        type: "switch",
                        name: "slackIntegration",
                        label: "Slack integration",
                        hint: "Send responses directly to a Slack channel",
                      },
                      {
                        type: "switch",
                        name: "weeklyDigest",
                        label: "Weekly digest",
                        hint: "A summary of workspace activity every Monday",
                      },
                    ],
                  },
                ]}
                buttons={{
                  back: "Back",
                  next: "Continue",
                }}
                onNext={onNext}
                onJump={onJump}
                prevId={role.id}
                values={params.values}
                onValuesChange={params.onValuesChange}
                ref={params.ref}
              />
            ),
          }),
        },
      },
    },
  },
  {
    jump: {
      id: review.id,
      at: {
        form: {
          fields: () => ({}),
          render: ({ values, params, onNext, onJump }) => ({
            step: 4,
            form: (
              <Review
                key={review.id}
                heading="Review & launch"
                message="Everything look right? Launch to go live."
                content={[
                  {
                    text: "Workspace",
                    rows: [
                      {
                        label: "Team type",
                        value: format.team(values.team),
                      },
                    ],
                  },
                  {
                    text: "First project",
                    rows: [
                      {
                        label: "Name",
                        value: format.name(values.name),
                      },
                      {
                        label: "Template",
                        value: format.template(values.template),
                      },
                    ],
                  },
                  {
                    text: "Team",
                    rows: [
                      {
                        label: "Your role",
                        value: format.role(values.role),
                      },
                      {
                        label: "Members invited",
                        value: format.members(values.members),
                      },
                    ],
                  },
                  {
                    text: "Preferences",
                    rows: [
                      {
                        label: "Theme",
                        value: format.theme(values.theme),
                      },
                      {
                        label: "Timezone",
                        value: format.timezone(values.timezone),
                      },
                      {
                        label: "Language",
                        value: format.language(values.language),
                      },
                    ],
                  },
                ]}
                buttons={{
                  back: "Back",
                  next: "Launch workspace",
                }}
                onNext={onNext}
                onJump={onJump}
                prevId={config.id}
                status={params.status}
                ref={params.ref}
              />
            ),
          }),
        },
      },
    },
  },
  {
    return: (values) => values,
  },
];

export const inputs: Values = {
  team: "",
  name: "",
  template: "",
  role: "",
  members: [],
  theme: "",
  timezone: "",
  language: "",
  emailNotifications: false,
  slackIntegration: false,
  weeklyDigest: false,
};
