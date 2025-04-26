module.exports = {

"[project]/packages/monitoring/sentry/src/sentry.client.config.ts [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "initializeSentryBrowserClient": (()=>initializeSentryBrowserClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$lib$2f$dev$2d$mock$2d$modules$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/lib/dev-mock-modules.ts [instrumentation] (ecmascript)");
;
function initializeSentryBrowserClient(props = {}) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$lib$2f$dev$2d$mock$2d$modules$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["init"])({
        dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
        // Replay may only be enabled for the client-side
        integrations: [],
        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: props?.tracesSampleRate ?? 1.0,
        // Capture Replay for 10% of all sessions,
        // plus for 100% of sessions with an error
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
        // ...
        // Note: if you want to override the automatic release value, do not set a
        // `release` value here - use the environment variable `SENTRY_RELEASE`, so
        // that it will also get attached to your source maps,
        ...props
    });
}
}}),

};

//# sourceMappingURL=packages_monitoring_sentry_src_sentry_client_config_ts_1627f5c8._.js.map