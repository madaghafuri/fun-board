window.addEventListener("DOMContentLoaded", () => {
  const canvas = new fabric.Canvas("canvas-editor", {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "#dadcd6",
  });

  const rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: "red",
    width: 50,
    height: 50,
    borderColor: "#d234eb",
    cornerColor: "#d234eb",
    evented: true,
  });

  canvas.add(rect);

  fabric.Image.fromURL("https://pixijs.com/assets/bunny.png", (img) => {
    canvas.add(img);

    img.on("mouse:down", (e) => {
      console.log("");
    });
  });

  let isDragging = false;
  let lastPosX = 0,
    lastPosY = 0;

  canvas.on("mouse:down", (e) => {
    if (e.e.button === 1) {
      isDragging = false;
      canvas.selection = false;
      lastPosX = e.e.clientX;
      lastPosY = e.e.clientY;
    }
  });

  canvas.on("mouse:move", (e) => {
    if (isDragging) {
      const dX = e.e.clientX - lastPosX;
      const dY = e.e.clientY - lastPosY;

      const viewportTransform = canvas.viewportTransform;
      viewportTransform[4] += dX;
      viewportTransform[5] += dY;

      lastPosX = e.e.clientX;
      lastPosY = e.e.clientY;
    }

    canvas.on("mouse:up", (e) => {
      isDragging = false;
    });
  });

  document.body.onpaste = (e) => {
    const clipboardData = e.clipboardData;
    const items = clipboardData.items;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        const reader = new FileReader();

        reader.onload = (e) => {
          console.log(e);
          const image = new Image();
          image.src = e.target.result;

          image.onload = (e) => {
            const fabricImage = new fabric.Image(image);
            canvas.add(fabricImage);
          };
        };
        reader.readAsDataURL(file);
      }
    }
  };
});
