export interface I18NState {
  language: string;
}

export const defaultI18NState: Readonly<I18NState> = {
  language: "en"
};
Object.freeze(defaultI18NState);
