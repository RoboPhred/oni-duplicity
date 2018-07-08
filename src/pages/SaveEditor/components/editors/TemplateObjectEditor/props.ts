export interface TemplateObjectEditorProps {
  templateName: string;
  templatePath: string[];

  // TODO: Replace this with a global editor property
  //  for target value path.
  valuePathHack?: string[];
}
