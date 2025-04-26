module.exports = {

"[project]/packages/monitoring/sentry/src/services/sentry-monitoring.service.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "SentryMonitoringService": (()=>SentryMonitoringService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$lib$2f$dev$2d$mock$2d$modules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/lib/dev-mock-modules.ts [app-ssr] (ecmascript)");
;
class SentryMonitoringService {
    readyPromise;
    readyResolver;
    constructor(){
        this.readyPromise = new Promise((resolve)=>this.readyResolver = resolve);
        void this.initialize();
    }
    async ready() {
        return this.readyPromise;
    }
    captureException(error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$lib$2f$dev$2d$mock$2d$modules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["captureException"])(error);
    }
    captureEvent(event, extra) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$lib$2f$dev$2d$mock$2d$modules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["captureEvent"])({
            message: event,
            ...extra ?? {}
        });
    }
    identifyUser(user) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$lib$2f$dev$2d$mock$2d$modules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setUser"])(user);
    }
    async initialize() {
        const environment = process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT ?? process.env.VERCEL_ENV;
        if (typeof document !== 'undefined') {
            const { initializeSentryBrowserClient } = await __turbopack_context__.r("[project]/packages/monitoring/sentry/src/sentry.client.config.ts [app-ssr] (ecmascript, async loader)")(__turbopack_context__.i);
            initializeSentryBrowserClient({
                environment
            });
        } else {
            const { initializeSentryServerClient } = await __turbopack_context__.r("[project]/packages/monitoring/sentry/src/sentry.server.config.ts [app-ssr] (ecmascript, async loader)")(__turbopack_context__.i);
            initializeSentryServerClient({
                environment
            });
        }
        this.readyResolver?.();
    }
}
}}),
"[project]/packages/monitoring/sentry/src/components/provider.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "SentryProvider": (()=>SentryProvider)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$core$2f$src$2f$monitoring$2e$context$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/monitoring/core/src/monitoring.context.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$sentry$2f$src$2f$services$2f$sentry$2d$monitoring$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/monitoring/sentry/src/services/sentry-monitoring.service.ts [app-ssr] (ecmascript)");
;
;
;
const sentry = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$sentry$2f$src$2f$services$2f$sentry$2d$monitoring$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SentryMonitoringService"]();
function SentryProvider({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MonitoringProvider, {
        children: children
    }, void 0, false, {
        fileName: "[project]/packages/monitoring/sentry/src/components/provider.tsx",
        lineNumber: 8,
        columnNumber: 10
    }, this);
}
function MonitoringProvider(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$core$2f$src$2f$monitoring$2e$context$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MonitoringContext"].Provider, {
        value: sentry,
        children: props.children
    }, void 0, false, {
        fileName: "[project]/packages/monitoring/sentry/src/components/provider.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=packages_monitoring_sentry_src_b0fcd7b8._.js.map