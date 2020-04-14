export type Resizability = "none" | "both" | "horizontal" | "vertical";
export type InputType = "text" | "textarea";
/** Controls how el-input component automatically sets size */
export type AutoSize = {
  /** Minimum rows to show */
  minRows: number;

  /** Maximum rows to show */
  maxRows: number;
};
