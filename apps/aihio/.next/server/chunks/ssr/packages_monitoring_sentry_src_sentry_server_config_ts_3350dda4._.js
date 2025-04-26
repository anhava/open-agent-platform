module.exports = {

"[project]/packages/monitoring/sentry/src/sentry.server.config.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "initializeSentryServerClient": (()=>initializeSentryServerClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$lib$2f$dev$2d$mock$2d$modules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/lib/dev-mock-modules.ts [app-ssr] (ecmascript)");
;
function initializeSentryServerClient(props = {}) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$lib$2f$dev$2d$mock$2d$modules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["init"])({
        dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
        // ...
        // Note: if you want to override the automatic release value, do not set a
        // `release` value here - use the environment variable `SENTRY_RELEASE`, so
        // that it will also get attached to your source maps,
        ...props
    });
}
}}),

};

//# sourceMappingURL=packages_monitoring_sentry_src_sentry_server_config_ts_3350dda4._.js.map