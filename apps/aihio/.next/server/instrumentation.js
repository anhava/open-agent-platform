const CHUNK_PUBLIC_PATH = "server/instrumentation.js";
const runtime = require("./chunks/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/packages_monitoring_api_src_6901e072._.js");
runtime.loadChunk("server/chunks/apps_aihio_instrumentation_ts_6b1757fe._.js");
runtime.getOrInstantiateRuntimeModule("[project]/apps/aihio/instrumentation.ts [instrumentation] (ecmascript)", CHUNK_PUBLIC_PATH);
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/apps/aihio/instrumentation.ts [instrumentation] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
