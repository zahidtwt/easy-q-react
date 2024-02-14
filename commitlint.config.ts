import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

const configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],

  rules: {
    "body-leading-blank": [RuleConfigSeverity.Disabled, "always"],
    "body-max-line-length": [RuleConfigSeverity.Error, "always", 100],
    "footer-leading-blank": [RuleConfigSeverity.Warning, "always"],
    "footer-max-line-length": [RuleConfigSeverity.Error, "always", 100],
    "header-max-length": [RuleConfigSeverity.Error, "always", 100],
    "scope-case": [RuleConfigSeverity.Error, "always", "lower-case"],
    "scope-empty": [RuleConfigSeverity.Disabled, "always"],
    "subject-case": [RuleConfigSeverity.Error, "never", ["pascal-case", "upper-case"]],
    "subject-empty": [RuleConfigSeverity.Error, "never"],
    "subject-full-stop": [RuleConfigSeverity.Error, "never", "."],
    "type-case": [RuleConfigSeverity.Error, "always", "sentence-case"],
    "type-empty": [RuleConfigSeverity.Error, "never"],
    "type-enum": [
      RuleConfigSeverity.Error,
      "always",
      ["Build", "Feat", "Fix", "Merge", "Modify", "Optimize", "Refactor", "Setup"],
    ],
  },
  prompt: {
    messages: {
      skip: ":x",
      max: "upper %d characters",
      min: "%d characters at least",
      emptyWarning: "can not be empty",
      upperLimitWarning: "is going above limit",
      lowerLimitWarning: "is going below limit",
    },
    questions: {
      type: {
        description: "Select the type of change that you're committing:",
        enum: {
          Feat: {
            description: "Introduce a new capability or feature.",
            title: "Feat",
            emoji: "✨",
          },
          Modify: {
            description: "Modify or enhance an existing capability, configuration, or rule.",
            title: "Modify",
            emoji: "🚀",
          },

          Fix: {
            description: "Correct an issue, such as a bug, typo, or misstatement.",
            title: "Fix",
            emoji: "🐛",
          },
          Build: {
            description: "Change the build process, tooling, or infrastructure.",
            title: "Build",
            emoji: "🛠",
          },
          Refactor: {
            description: "Restructure the code without changing its external behavior.",
            title: "Refactor",
            emoji: "📦",
          },
          Optimize: {
            description: "Enhance performance, speeding up code or processes.",
            title: "Optimize",
            emoji: "⚙️",
          },
          Setup: {
            description: "Setting up configuration files and rules",
            title: "Setup",
            emoji: "📚",
          },
        },
      },
      subject: {
        description: "Write a short and concise description of the change",
      },
    },
  },
};
module.exports = configuration;
