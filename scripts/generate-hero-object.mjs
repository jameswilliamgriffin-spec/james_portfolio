import fs from "node:fs";
import zlib from "node:zlib";

const width = 1024;
const height = 1024;
const outputPath = new URL("../public/hero-object.png", import.meta.url);
const pixels = Buffer.alloc(width * height * 4, 0);

const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const mix = (from, to, amount) => from + (to - from) * amount;
const smoothstep = (edgeA, edgeB, value) => {
  const amount = clamp((value - edgeA) / (edgeB - edgeA));
  return amount * amount * (3 - 2 * amount);
};

function blendPixel(x, y, color) {
  if (x < 0 || x >= width || y < 0 || y >= height) return;

  const offset = (y * width + x) * 4;
  const sourceAlpha = color[3] / 255;
  const destinationAlpha = pixels[offset + 3] / 255;
  const outputAlpha = sourceAlpha + destinationAlpha * (1 - sourceAlpha);

  if (outputAlpha <= 0) return;

  pixels[offset] = Math.round(
    (color[0] * sourceAlpha +
      pixels[offset] * destinationAlpha * (1 - sourceAlpha)) /
      outputAlpha,
  );
  pixels[offset + 1] = Math.round(
    (color[1] * sourceAlpha +
      pixels[offset + 1] * destinationAlpha * (1 - sourceAlpha)) /
      outputAlpha,
  );
  pixels[offset + 2] = Math.round(
    (color[2] * sourceAlpha +
      pixels[offset + 2] * destinationAlpha * (1 - sourceAlpha)) /
      outputAlpha,
  );
  pixels[offset + 3] = Math.round(outputAlpha * 255);
}

function drawEllipse(cx, cy, rx, ry, rotation, startColor, endColor, alpha) {
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);
  const minX = Math.max(0, Math.floor(cx - rx * 1.45));
  const maxX = Math.min(width - 1, Math.ceil(cx + rx * 1.45));
  const minY = Math.max(0, Math.floor(cy - ry * 1.65));
  const maxY = Math.min(height - 1, Math.ceil(cy + ry * 1.65));

  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      const dx = x - cx;
      const dy = y - cy;
      const u = (dx * cos + dy * sin) / rx;
      const v = (-dx * sin + dy * cos) / ry;
      const distance = u * u + v * v;

      if (distance < 1.08) {
        const edge = 1 - smoothstep(0.84, 1.08, distance);
        const sheen = clamp(1 - Math.abs(u * 0.8 + v * 0.35));
        const amount = clamp((u + v + 1.4) / 2.8);
        const highlight = Math.pow(sheen, 8) * 72;

        blendPixel(x, y, [
          clamp(mix(startColor[0], endColor[0], amount) + highlight, 0, 255),
          clamp(mix(startColor[1], endColor[1], amount) + highlight, 0, 255),
          clamp(mix(startColor[2], endColor[2], amount) + highlight, 0, 255),
          alpha * edge,
        ]);
      }
    }
  }
}

function drawRibbon(cx, cy, rx, ry, rotation, thickness, startColor, endColor, alpha) {
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const dx = x - cx;
      const dy = y - cy;
      const u = (dx * cos + dy * sin) / rx;
      const v = (-dx * sin + dy * cos) / ry;
      const theta = Math.atan2(v, u);
      const ring = Math.abs(Math.hypot(u, v) - 1);
      const wave = 0.08 * Math.sin(theta * 3.2 + 1.1);
      const distance = Math.abs(ring + wave);

      if (distance < thickness) {
        const edge = 1 - smoothstep(thickness * 0.45, thickness, distance);
        const amount = (Math.sin(theta + 1) + 1) / 2;
        const highlight =
          Math.pow(clamp(Math.cos(theta - 0.8) * 0.5 + 0.5), 14) * 95;

        blendPixel(x, y, [
          mix(startColor[0], endColor[0], amount) + highlight,
          mix(startColor[1], endColor[1], amount) + highlight,
          mix(startColor[2], endColor[2], amount) + highlight,
          alpha * edge,
        ]);
      }
    }
  }
}

for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    const dx = (x - 520) / 360;
    const dy = (y - 560) / 260;
    const glow = Math.exp(-(dx * dx + dy * dy) * 2.2);

    if (glow > 0.003) {
      blendPixel(x, y, [30, 52, 70, Math.round(glow * 26)]);
    }
  }
}

drawRibbon(512, 505, 255, 150, -0.68, 0.105, [4, 22, 46], [169, 224, 230], 178);
drawRibbon(518, 520, 195, 292, 0.72, 0.09, [225, 236, 235], [32, 66, 90], 158);
drawEllipse(508, 520, 190, 142, -0.18, [235, 235, 226], [72, 125, 148], 184);
drawEllipse(414, 455, 92, 150, 0.5, [14, 31, 58], [205, 229, 225], 168);
drawEllipse(614, 585, 108, 174, -0.36, [245, 232, 202], [36, 87, 112], 158);
drawEllipse(542, 420, 122, 52, -0.18, [248, 248, 240], [120, 203, 212], 132);

for (const [cx, cy, radius, alpha] of [
  [412, 382, 18, 110],
  [594, 392, 14, 95],
  [662, 520, 12, 85],
  [485, 650, 16, 80],
]) {
  for (let y = cy - radius * 2; y <= cy + radius * 2; y += 1) {
    for (let x = cx - radius * 2; x <= cx + radius * 2; x += 1) {
      const distance = Math.hypot(x - cx, y - cy) / radius;
      if (distance < 1) {
        blendPixel(x, y, [255, 255, 246, Math.round((1 - distance) * alpha)]);
      }
    }
  }
}

function crc32(buffer) {
  let value = ~0;

  for (const byte of buffer) {
    value ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      value = (value >>> 1) ^ (0xedb88320 & -(value & 1));
    }
  }

  return ~value >>> 0;
}

function chunk(type, payload) {
  const typeBuffer = Buffer.from(type);
  const lengthBuffer = Buffer.alloc(4);
  const crcBuffer = Buffer.alloc(4);

  lengthBuffer.writeUInt32BE(payload.length);
  crcBuffer.writeUInt32BE(crc32(Buffer.concat([typeBuffer, payload])));

  return Buffer.concat([lengthBuffer, typeBuffer, payload, crcBuffer]);
}

const raw = Buffer.alloc((width * 4 + 1) * height);

for (let y = 0; y < height; y += 1) {
  raw[y * (width * 4 + 1)] = 0;
  pixels.copy(
    raw,
    y * (width * 4 + 1) + 1,
    y * width * 4,
    (y + 1) * width * 4,
  );
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(width, 0);
ihdr.writeUInt32BE(height, 4);
ihdr[8] = 8;
ihdr[9] = 6;

const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk("IHDR", ihdr),
  chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
  chunk("IEND", Buffer.alloc(0)),
]);

fs.writeFileSync(outputPath, png);
