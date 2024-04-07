import { Container, Rectangle } from "pixi.js";
import { Item } from "./item";

type ReturnType = [Item | null, boolean];

export function getColidingObject(
  container: Container,
  rect: Rectangle
): ReturnType {
  for (const child of container.children) {
    if (child.label === "selection") continue;
    const childBounds = child.getBounds();
    if (childBounds.rectangle.intersects(rect)) {
      return [child as Item, true];
    }
  }
  return [null, false];
}

export function pointIsInside(
  container: Container,
  x: number,
  y: number,
  targetLabel: string
): ReturnType {
  for (const child of container.children) {
    if (child.label !== targetLabel) continue;
    const childBounds = child.getBounds();
    if (childBounds.containsPoint(x, y)) {
      return [child as Item, true];
    }
  }
  return [null, false];
}
