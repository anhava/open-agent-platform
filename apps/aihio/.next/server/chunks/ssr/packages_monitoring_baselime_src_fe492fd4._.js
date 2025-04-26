module.exports = {

"[project]/packages/monitoring/baselime/src/hooks/use-baselime.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "useBaselime": (()=>useBaselime)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$lib$2f$dev$2d$mock$2d$modules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/lib/dev-mock-modules.ts [app-ssr] (ecmascript)");
;
;
function useBaselime() {
    const { captureException, setUser, sendEvent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$lib$2f$dev$2d$mock$2d$modules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaselimeRum"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return {
            captureException (error, extra) {
                void captureException(error, extra);
            },
            identifyUser (params) {
                setUser(params.id);
            },
            captureEvent (event, extra) {
                return sendEvent(event, extra);
            },
            ready () {
                return Promise.resolve();
            }
        };
    }, [
        captureException,
        sendEvent,
        setUser
    ]);
}
}}),
"[project]/packages/monitoring/baselime/src/components/provider.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "BaselimeProvider": (()=>BaselimeProvider)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$lib$2f$dev$2d$mock$2d$modules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/lib/dev-mock-modules.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$core$2f$src$2f$monitoring$2e$context$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/monitoring/core/src/monitoring.context.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$baselime$2f$src$2f$hooks$2f$use$2d$baselime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/monitoring/baselime/src/hooks/use-baselime.ts [app-ssr] (ecmascript)");
;
;
;
;
;
function BaselimeProvider({ children, apiKey, enableWebVitals, ErrorPage }) {
    const key = apiKey ?? process.env.NEXT_PUBLIC_BASELIME_KEY ?? '';
    if (!key) {
        console.warn('You configured Baselime as monitoring provider but did not provide a key. ' + 'Please provide a key to enable monitoring with Baselime using the variable NEXT_PUBLIC_BASELIME_KEY.');
        return children;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$lib$2f$dev$2d$mock$2d$modules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaselimeRum"], {
        apiKey: key,
        enableWebVitals: enableWebVitals,
        fallback: ErrorPage ?? null,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MonitoringProvider, {
            children: children
        }, void 0, false, {
            fileName: "[project]/packages/monitoring/baselime/src/components/provider.tsx",
            lineNumber: 36,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/monitoring/baselime/src/components/provider.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
function MonitoringProvider(props) {
    const service = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$baselime$2f$src$2f$hooks$2f$use$2d$baselime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaselime"])();
    const provider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(service);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$core$2f$src$2f$monitoring$2e$context$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MonitoringContext"].Provider, {
        value: provider.current,
        children: props.children
    }, void 0, false, {
        fileName: "[project]/packages/monitoring/baselime/src/components/provider.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=packages_monitoring_baselime_src_fe492fd4._.js.map