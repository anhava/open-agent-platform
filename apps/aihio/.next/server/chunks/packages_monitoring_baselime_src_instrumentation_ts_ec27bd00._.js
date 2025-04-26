module.exports = {

"[project]/packages/monitoring/baselime/src/instrumentation.ts [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @name registerInstrumentation
 * @description This file is used to register Baselime instrumentation for your Next.js application.
 *
 * Please set the MONITORING_PROVIDER environment variable to 'baselime' to register Baselime instrumentation.
 */ __turbopack_context__.s({
    "registerInstrumentation": (()=>registerInstrumentation)
});
async function registerInstrumentation() {
    if (process.env.ENABLE_MONITORING_INSTRUMENTATION !== 'true') {
        return;
    }
    const serviceName = process.env.INSTRUMENTATION_SERVICE_NAME;
    if (!serviceName) {
        throw new Error(`
      You have set the Baselime instrumentation provider, but have not set the INSTRUMENTATION_SERVICE_NAME environment variable. 
      Please set the INSTRUMENTATION_SERVICE_NAME environment variable.
    `);
    }
    if ("TURBOPACK compile-time truthy", 1) {
        const { BaselimeSDK, BetterHttpInstrumentation, VercelPlugin } = await __turbopack_context__.r("[project]/node_modules/@baselime/node-opentelemetry/dist/index.cjs [instrumentation] (ecmascript, async loader)")(__turbopack_context__.i);
        const sdk = new BaselimeSDK({
            serverless: true,
            service: serviceName,
            baselimeKey: process.env.NEXT_PUBLIC_BASELIME_KEY,
            instrumentations: [
                new BetterHttpInstrumentation({
                    plugins: [
                        new VercelPlugin()
                    ]
                })
            ]
        });
        sdk.start();
    }
}
}}),

};

//# sourceMappingURL=packages_monitoring_baselime_src_instrumentation_ts_ec27bd00._.js.map