import { Container } from "pixi.js";

export class CustomContainer extends Container {
  constructor() {
    super();

    this.on("childAdded", (child, parent) => {
      const childGLobalPosition = child.toGlobal(child.position);
      const childLocalPosition = parent.toLocal(childGLobalPosition);
      child.position.set(childLocalPosition.x, childLocalPosition.y);
    });
  }
}
