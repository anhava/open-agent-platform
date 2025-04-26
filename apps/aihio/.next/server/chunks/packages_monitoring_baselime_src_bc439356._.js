module.exports = {

"[project]/packages/monitoring/baselime/src/services/baselime-server-monitoring.service.ts [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "BaselimeServerMonitoringService": (()=>BaselimeServerMonitoringService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/lib/index.mjs [instrumentation] (ecmascript)");
;
const apiKey = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$instrumentation$5d$__$28$ecmascript$29$__["z"].string({
    required_error: 'NEXT_PUBLIC_BASELIME_KEY is required',
    description: 'The Baseline API key'
}).parse(process.env.NEXT_PUBLIC_BASELIME_KEY);
class BaselimeServerMonitoringService {
    userId = null;
    async captureException(error, extra) {
        const formattedError = error ? getFormattedError(error) : {};
        const event = {
            level: 'error',
            data: {
                error
            },
            error: {
                ...formattedError
            },
            message: error ? `${error.name}: ${error.message}` : `Unknown error`
        };
        const response = await fetch(`https://events.baselime.io/v1/logs`, {
            method: 'POST',
            headers: {
                contentType: 'application/json',
                'x-api-key': apiKey,
                'x-service': extra?.service ?? '',
                'x-namespace': extra?.namespace ?? ''
            },
            body: JSON.stringify([
                {
                    userId: this.userId,
                    sessionId: extra?.sessionId,
                    namespace: extra?.namespace,
                    ...event
                }
            ])
        });
        if (!response.ok) {
            console.error({
                response,
                event
            }, 'Failed to send event to Baselime');
        }
    }
    async captureEvent(event, extra) {
        const response = await fetch(`https://events.baselime.io/v1/logs`, {
            method: 'POST',
            headers: {
                contentType: 'application/json',
                'x-api-key': apiKey,
                'x-service': extra?.service ?? '',
                'x-namespace': extra?.namespace ?? ''
            },
            body: JSON.stringify([
                {
                    userId: this.userId,
                    sessionId: extra?.sessionId,
                    namespace: extra?.namespace,
                    message: event
                }
            ])
        });
        if (!response.ok) {
            console.error({
                response,
                event
            }, 'Failed to send event to Baselime');
        }
    }
    identifyUser(info) {
        this.userId = info.id;
    }
    ready() {
        return Promise.resolve();
    }
}
function getFormattedError(error) {
    return {
        name: error.name,
        message: error.message,
        stack: error.stack
    };
}
}}),
"[project]/packages/monitoring/baselime/src/server.ts [instrumentation] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$baselime$2f$src$2f$services$2f$baselime$2d$server$2d$monitoring$2e$service$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/monitoring/baselime/src/services/baselime-server-monitoring.service.ts [instrumentation] (ecmascript)");
;
}}),
"[project]/packages/monitoring/baselime/src/server.ts [instrumentation] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$baselime$2f$src$2f$services$2f$baselime$2d$server$2d$monitoring$2e$service$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/monitoring/baselime/src/services/baselime-server-monitoring.service.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$baselime$2f$src$2f$server$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/monitoring/baselime/src/server.ts [instrumentation] (ecmascript) <locals>");
}}),
"[project]/packages/monitoring/baselime/src/server.ts [instrumentation] (ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "BaselimeServerMonitoringService": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$baselime$2f$src$2f$services$2f$baselime$2d$server$2d$monitoring$2e$service$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["BaselimeServerMonitoringService"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$baselime$2f$src$2f$services$2f$baselime$2d$server$2d$monitoring$2e$service$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/monitoring/baselime/src/services/baselime-server-monitoring.service.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$baselime$2f$src$2f$server$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/monitoring/baselime/src/server.ts [instrumentation] (ecmascript) <locals>");
}}),
"[project]/packages/monitoring/baselime/src/server.ts [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "BaselimeServerMonitoringService": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$baselime$2f$src$2f$server$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$exports$3e$__["BaselimeServerMonitoringService"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$baselime$2f$src$2f$server$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/monitoring/baselime/src/server.ts [instrumentation] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$baselime$2f$src$2f$server$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$exports$3e$__ = __turbopack_context__.i("[project]/packages/monitoring/baselime/src/server.ts [instrumentation] (ecmascript) <exports>");
}}),

};

//# sourceMappingURL=packages_monitoring_baselime_src_bc439356._.js.map