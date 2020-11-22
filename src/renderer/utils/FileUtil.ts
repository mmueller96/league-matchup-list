import * as fs from "fs";
import { Matchup } from "../store/types";

export class FileUtil {
    static readFileNamesFromDataDirectory() {
        let fileNames: string[] = [];
        for (const file of fs.readdirSync(__dirname + "/../../../data")) {
            fileNames.push(FileUtil.parseToFileName(file));
        }
        return fileNames;
    }

    static parseToFileName(file: string): string {
        let lastDotIndex: number = file.lastIndexOf(".");
        if (lastDotIndex > 0) {
            let fileName = file.substring(0, lastDotIndex);
            return fileName;
        }
        return "";
    }

    static getSettingsFromMatchupFile(champion: string): Buffer {
        return fs.readFileSync(`${__dirname}/../../../data/${champion}.matchup`);
    }

    static writeFile(selectedMatchupData: Matchup.IMatchupData): void {
        return fs.writeFileSync(`${__dirname}/../../../data/${selectedMatchupData.champion}.matchup`, JSON.stringify(selectedMatchupData))
    }
}