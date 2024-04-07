import * as PIXI from "pixi.js";

export class Item extends PIXI.Sprite {
  isDragging: boolean = false;
  startPosition: { x: number; y: number };
  isSelected = false;
  constructor(texture?: PIXI.Texture) {
    super(texture);
    this.startPosition = { x: this.position.x, y: this.position.y };
    this.eventMode = "static";
    this.cursor = "pointer";
    this.label = "Item";

    // this.on("added", (container) => {
    //   this.onpointerdown = (e) => {
    //     this.isDragging = true;
    //   };

    //   this.onpointermove = (e) => {
    //     if (!this.isDragging) return;
    //     this.parent.toLocal(e.global, undefined, this.position);
    //   };

    //   this.onpointerup = (e) => {
    //     this.isDragging = false;
    //   };
    // });
  }
}
