import { Graphics } from "pixi.js";

export class SelectArea extends Graphics {
  isSelecting = false;

  start = { x: 0, y: 0 };
  constructor() {
    super();
  }

  onPointerDown(e: PointerEvent, bool: boolean) {
    if (e.button === 0 && !bool) {
      this.isSelecting = true;
      this.start.x = e.clientX;
      this.start.y = e.clientY;
    }
  }

  onPointerMove(e: PointerEvent) {
    if (!this.isSelecting) return;

    const selectionWidth = Math.abs(e.offsetX - this.start.x);
    const selectionHeight = Math.abs(e.offsetY - this.start.y);

    const rectX = Math.min(e.offsetX, this.start.x);
    const rectY = Math.min(e.offsetY, this.start.y);

    this.clear();
    this.stroke({ width: 1, color: 0xd234eb });
    this.rect(rectX, rectY, selectionWidth, selectionHeight);
    this.visible = true;
  }

  onPointerUpOut() {
    this.isSelecting = false;
    this.visible = false;
  }
}
