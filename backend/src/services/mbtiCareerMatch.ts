import { createReadStream } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { parse } from "csv-parse";

// 以本文件位置定位 CSV，避免依赖 process.cwd()（换运行目录就找不到职业表）
// 本文件位于 backend/src/services/，需上溯三级到项目根
const __dirname = dirname(fileURLToPath(import.meta.url));
const CSV_PATH = resolve(__dirname, "..", "..", "..", "MBTI Job Planning.csv");

export class MBTICareerMatch {
  private careers: Map<string, string[]> = new Map();
  private loaded = false;

  async load(): Promise<void> {
    if (this.loaded) return;

    return new Promise((res, rej) => {
      const careers: Map<string, string[]> = new Map();
      let headers: string[] = [];

      createReadStream(CSV_PATH, { encoding: "utf-8" })
        .pipe(parse({ trim: true }))
        .on("data", (row: string[]) => {
          if (headers.length === 0) {
            headers = row.map((h) => h.trim()).filter(Boolean);
            headers.forEach((h) => careers.set(h, []));
          } else {
            headers.forEach((h, i) => {
              const val = row[i]?.trim();
              if (val) careers.get(h)!.push(val);
            });
          }
        })
        .on("end", () => {
          this.careers = careers;
          this.loaded = true;
          res();
        })
        .on("error", rej);
    });
  }

  getCareers(mbti: string): string[] {
    return this.careers.get(mbti) ?? [];
  }
}

export const mbtiCareerMatch = new MBTICareerMatch();
