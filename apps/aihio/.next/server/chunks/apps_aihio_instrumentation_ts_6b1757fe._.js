module.exports = {

"[project]/apps/aihio/instrumentation.ts [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * This file is used to register monitoring instrumentation
 * for your Next.js application.
 */ __turbopack_context__.s({
    "onRequestError": (()=>onRequestError),
    "register": (()=>register)
});
async function register() {
    const { registerMonitoringInstrumentation } = await __turbopack_context__.r("[project]/packages/monitoring/api/src/instrumentation.ts [instrumentation] (ecmascript, async loader)")(__turbopack_context__.i);
    // Register monitoring instrumentation
    // based on the MONITORING_PROVIDER environment variable.
    await registerMonitoringInstrumentation();
}
const onRequestError = async (err)=>{
    const { getServerMonitoringService } = await __turbopack_context__.r("[project]/packages/monitoring/api/src/server.ts [instrumentation] (ecmascript, async loader)")(__turbopack_context__.i);
    const service = await getServerMonitoringService();
    await service.ready();
    await service.captureException(err);
};
}}),

};

//# sourceMappingURL=apps_aihio_instrumentation_ts_6b1757fe._.js.map