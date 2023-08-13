/**
 * Строитель (англ. Builder) — порождающий шаблон проектирования предоставляет способ создания составного объекта.
 */

enum Format {
  PNG,
  JPG,
}

interface IResolution {
  width: number;
  height: number;
}

class Builder {
  format?: Format;
  resolutions: IResolution[] = [];

  public setFormat(format: Format) {
    this.format = format;

    return this;
  }

  addResolution(width: number, height: number) {
    this.resolutions.push({
      width,
      height,
    });

    return this;
  }

  public build() {
    return {
      format: this.format,
      resolutions: this.resolutions,
    }
  }
}

const data = new Builder()
  .addResolution(100, 200)
  .setFormat(Format.JPG)
  .addResolution(50, 100)
  .build();

console.log({ data });
