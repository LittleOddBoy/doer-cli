declare module "inquirer-checkbox-plus-prompt" {
  import { Interface } from "readline";
  import { Answers, CheckboxChoiceOptions, PromptModule } from "inquirer";

  interface CheckboxPlusPromptOptions extends CheckboxChoiceOptions {
    searchable?: boolean;
    highlight?: boolean;
    loop?: boolean;
    onState?: (state: any) => void;
  }

  interface CheckboxPlusPromptConstructor {
    new (
      questions: CheckboxPlusPromptOptions,
      rl: Interface,
      answers: Answers
    ): CheckboxPlusPrompt;
  }

  class CheckboxPlusPrompt {
    constructor(
      questions: CheckboxPlusPromptOptions,
      rl: Interface,
      answers: Answers
    );
  }

  const prompt: CheckboxPlusPromptConstructor;
  export = prompt;
}
