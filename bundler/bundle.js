const fs = require("fs");
const path = require("path");
//
const parser = require("@babel/parser"); // 7.2.3
// 遍历
const traverse = require("@babel/traverse").default;
// 将es6代码转化为浏览器可以识别的代码
const babel = require("@babel/core"); // 7.2.2

// const preset = require('@babel/preset') // 7.2.3

const moduleAnalyser = (filename) => {
  const content = fs.readFileSync(filename, "utf8");
  // 抽象语法树
  const ast = parser.parse(content, { sourceType: "module" });
  const dependencies = {};
  traverse(ast, {
    ImportDeclaration({ node }) {
      // console.log(node)
      const dirname = path.dirname(filename);
      const newFile = "./" + path.join(dirname, node.source.value);
      // console.log(dirname)
      dependencies[node.source.value] = newFile;
    },
  });
  const { code } = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"],
  });
  // console.log(dependencies)
  // console.log(ast.program.body);
  // console.log(content);
  console.log(code);
  return {
    filename,
    dependencies,
    code,
  };
};

const makeDependenciesGraph = (entry) => {
  const entryMoudle = moduleAnalyser(entry);
  const graphArr = [entryMoudle];
  for (let i = 0; i < graphArr.length; i++) {
    const item = graphArr[i];
    const { dependencies } = item;
    if (dependencies) {
      for (let j in dependencies) {
        const module = moduleAnalyser(dependencies[j]);
        graphArr.push(module);
      }
    }
  }
  const graph = {};
  graphArr.forEach((item) => {
    graph[item.filename] = {
      dependencies: item.dependencies,
      code: item.code,
    };
  });
  // console.log(graphArr, graph, 'graph')
  return graph;
};

const generateCode = (entry) => {
  const graph = JSON.stringify(makeDependenciesGraph(entry));
  // return `
  // (function(graph){
  //   function require(module) {
  //     function localRequire(relativePath) {
  //       return require(graph[module].dependencies[relativePath])
  //     }
  //     var exports = {};
  //     (function(require, exports, code){
  //       eval(code)
  //     })(localRequire, exports, graph[module].code)
  //     return exports;
  //   };
  //   require('${entry})
  // })(${graph})`;
  return `
		(function(graph){
			function require(module) { 
				function localRequire(relativePath) {
					return require(graph[module].dependencies[relativePath]);
				}
				var exports = {};
				(function(require, exports, code){
					eval(code)
				})(localRequire, exports, graph[module].code);
				return exports;
			};
			require('${entry}')
		})(${graph});
	`;
};

const code = generateCode("./src/index.js");
console.log(code);
