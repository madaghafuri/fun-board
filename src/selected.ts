import { Container, Graphics } from "pixi.js";
import { Item } from "./item";

export class SelectContainer extends Container {
  selected: Item[] = [];
  isResizing = false;
  isDragging = false;
  border: Graphics;
  lastPosition = { x: 0, y: 0 };
  constructor() {
    super();
    this.eventMode = "static";
    this.label = "selected";
    this.border = new Graphics();
    this.border.visible = false;
    this.addChild(this.border);

    this.onpointerdown = (e) => {
      if (e.button === 0) {
        this.isDragging = true;
        this.lastPosition = { x: e.offsetX, y: e.offsetY };
      }
    };

    this.onpointermove = (e) => {
      if (this.isDragging) {
        this.parent.toLocal(
          { x: e.globalX - this.width / 2, y: e.globalY - this.height / 2 },
          undefined,
          this.position
        );
        console.log("ternyata ini");
      }
    };

    this.onpointerup = (e) => {
      this.isDragging = false;
      this.lastPosition = { x: e.offsetX, y: e.offsetY };
    };
  }

  showBorder(item: Item) {
    if (!this.border.visible) {
      // const itemGlobalPos = item.toGlobal(item.position);

      this.addChild(item);
      // const itemLocalPos = this.toLocal(itemGlobalPos);
      // item.position.set(itemLocalPos.x, itemLocalPos.y);

      this.border.clear();
      this.border.stroke({ width: 1, color: 0xd234eb });
      this.border.rect(this.x, this.y, this.width, this.height);
      this.border.visible = true;
    }
  }

  onPointerOutside(e: PointerEvent, isInContainer: boolean) {
    if (isInContainer || e.button === 1 || this.children.length == 0) return;

    const selectedChild = this.getChildAt(1);
    const childGlobalPos = selectedChild.toGlobal(selectedChild.position);

    this.border.clear();
    this.border.visible = false;
    this.parent.getChildByLabel("global-container")?.addChild(selectedChild);
    const childLocalPos = this.parent
      .getChildByLabel("global-container")
      ?.toLocal(childGlobalPos);
    selectedChild.position.set(childLocalPos?.x, childLocalPos?.y);
  }
}
