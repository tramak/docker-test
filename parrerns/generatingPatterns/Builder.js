"use strict";
/**
 * Строитель (англ. Builder) — порождающий шаблон проектирования предоставляет способ создания составного объекта.
 */
var Format;
(function (Format) {
    Format[Format["PNG"] = 0] = "PNG";
    Format[Format["JPG"] = 1] = "JPG";
})(Format || (Format = {}));
class Builder {
    constructor() {
        this.resolutions = [];
    }
    setFormat(format) {
        this.format = format;
        return this;
    }
    addResolution(width, height) {
        this.resolutions.push({
            width,
            height,
        });
        return this;
    }
    build() {
        return {
            format: this.format,
            resolutions: this.resolutions,
        };
    }
}
const data = new Builder()
    .addResolution(100, 200)
    .setFormat(Format.JPG)
    .addResolution(50, 100)
    .build();
console.log({ data });
