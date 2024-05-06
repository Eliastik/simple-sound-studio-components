import "reflect-metadata";
import { Container } from "inversify";

const audioEditorComponentsContainer = new Container({ defaultScope: "Singleton" });

export { audioEditorComponentsContainer };
