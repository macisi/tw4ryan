import path from 'path';
import crypto from 'crypto';
import Module from 'module';

function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
  }
  return content;
}

function md5(content) {
  const md5 = crypto.createHash('md5');
  return md5.update(content).digest('hex');
}



const templateFactory = () => {

  let fn;
  if (process.env.NODE_ENV === 'development') {
    const _module = new Module();
    const fileMap = new Map();
    fn = (filePath, ctx) => {
      const rawData = ctx.mfs.readFileSync(filePath, 'utf-8');
      const fileHash = md5(rawData);
      let compiledExports;
      try {
        if (!fileMap.has(filePath)) {
          _module._compile(stripBOM(rawData), filePath);
          compiledExports = _module.exports.default;
          fileMap.set(filePath, {
            hash: fileHash,
            compiledExports,
          });
        } else {
          const compileData = fileMap.get(filePath);
          if (compileData.hash === fileHash) {
            compiledExports = compileData.compiledExports;
          } else {
            _module._compile(stripBOM(rawData), filePath);
            compiledExports = _module.exports.default;
            fileMap.set(filePath, {
              hash: fileHash,
              compiledExports,
            });
          }
        }
      } catch (e) {
        throw Error(e);
      }
      return compiledExports;
    };
  } else {
    fn = filePath => require(filePath).default;
  }
  return fn;
}

const getTemplate = templateFactory();
export { getTemplate };