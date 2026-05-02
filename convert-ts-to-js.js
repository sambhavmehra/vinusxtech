const ts = require("typescript");
const fs = require("fs");
const path = require("path");

function convertToJSX(filePath) {
    const code = fs.readFileSync(filePath, "utf-8");
    const result = ts.transpileModule(code, {
        compilerOptions: {
            target: ts.ScriptTarget.ESNext,
            module: ts.ModuleKind.ESNext,
            jsx: ts.JsxEmit.Preserve,
            removeComments: false
        }
    });
    const newFilePath = filePath.replace(/\.tsx?$/, (ext) => ext === '.ts' ? '.js' : '.jsx');
    fs.writeFileSync(newFilePath, result.outputText);
    if (newFilePath !== filePath) {
        fs.unlinkSync(filePath);
    }
}

function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith(".tsx") || fullPath.endsWith(".ts")) {
            console.log("Converting", fullPath);
            convertToJSX(fullPath);
        }
    }
}

walk("app");
walk("components");
walk("lib");
walk("hooks");
