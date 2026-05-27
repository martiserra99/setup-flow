import { CardChoiceView, type CardChoice } from "./card-choice";
import { DividerView, type Divider } from "./divider";
import { InputView, type Input } from "./input";
import { MembersView, type Members } from "./members";
import { RowsView, type Rows } from "./rows";
import { SelectView, type Select } from "./select";
import { SwitchView, type Switch } from "./switch";
import { TemplateChoiceView, type TemplateChoice } from "./template-choice";

export type Item =
  | CardChoice
  | Divider
  | Input
  | Members
  | Rows
  | Select
  | Switch
  | TemplateChoice;

export function ItemView(item: Item) {
  switch (item.type) {
    case "cardChoice": {
      return <CardChoiceView {...item} />;
    }
    case "divider": {
      return <DividerView {...item} />;
    }
    case "input": {
      return <InputView {...item} />;
    }
    case "members": {
      return <MembersView {...item} />;
    }
    case "rows": {
      return <RowsView {...item} />;
    }
    case "select": {
      return <SelectView {...item} />;
    }
    case "switch": {
      return <SwitchView {...item} />;
    }
    case "templateChoice": {
      return <TemplateChoiceView {...item} />;
    }
  }
}
