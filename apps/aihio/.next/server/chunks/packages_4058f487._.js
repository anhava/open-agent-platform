module.exports = {

"[project]/packages/monitoring/api/src/server.ts [instrumentation] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
;
}}),
"[project]/packages/monitoring/api/src/server.ts [instrumentation] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$api$2f$src$2f$server$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/monitoring/api/src/server.ts [instrumentation] (ecmascript) <locals>");
}}),
"[project]/packages/monitoring/core/src/console-monitoring.service.ts [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ConsoleMonitoringService": (()=>ConsoleMonitoringService)
});
class ConsoleMonitoringService {
    identifyUser(data) {
        console.log(`[Console Monitoring] Identified user`, data);
    }
    captureException(error) {
        console.error(`[Console Monitoring] Caught exception: ${JSON.stringify(error)}`);
    }
    captureEvent(event) {
        console.log(`[Console Monitoring] Captured event: ${event}`);
    }
    ready() {
        return Promise.resolve();
    }
}
}}),
"[project]/packages/shared/src/registry/index.ts [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Implementation factory type
 */ __turbopack_context__.s({
    "createRegistry": (()=>createRegistry)
});
function createRegistry() {
    const implementations = new Map();
    const setupCallbacks = new Map();
    const setupPromises = new Map();
    const registry = {
        register (name, factory) {
            implementations.set(name, factory);
            return registry;
        },
        // Updated get method overload that supports tuple inference
        get: async (...names)=>{
            await registry.setup();
            if (names.length === 1) {
                return await getImplementation(names[0]);
            }
            return await Promise.all(names.map((name)=>getImplementation(name)));
        },
        async setup (group) {
            if (group) {
                if (!setupPromises.has(group)) {
                    const callbacks = setupCallbacks.get(group) ?? [];
                    setupPromises.set(group, Promise.all(callbacks.map((cb)=>cb())).then(()=>void 0));
                }
                return setupPromises.get(group);
            }
            const groups = Array.from(setupCallbacks.keys());
            await Promise.all(groups.map((group)=>registry.setup(group)));
        },
        addSetup (group, callback) {
            if (!setupCallbacks.has(group)) {
                setupCallbacks.set(group, []);
            }
            setupCallbacks.get(group).push(callback);
            return registry;
        }
    };
    async function getImplementation(name) {
        const factory = implementations.get(name);
        if (!factory) {
            throw new Error(`Implementation "${name}" not found`);
        }
        const implementation = await factory();
        if (!implementation) {
            throw new Error(`Implementation "${name}" is not available`);
        }
        return implementation;
    }
    return registry;
}
}}),
"[project]/packages/monitoring/api/src/get-monitoring-provider.ts [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "MONITORING_PROVIDER": (()=>MONITORING_PROVIDER),
    "getMonitoringProvider": (()=>getMonitoringProvider)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/lib/index.mjs [instrumentation] (ecmascript)");
;
const MONITORING_PROVIDER = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$instrumentation$5d$__$28$ecmascript$29$__["z"].enum([
    'baselime',
    'sentry',
    ''
]).optional().transform((value)=>value || undefined);
function getMonitoringProvider() {
    return MONITORING_PROVIDER.parse(process.env.NEXT_PUBLIC_MONITORING_PROVIDER);
}
}}),
"[project]/packages/monitoring/api/src/services/get-server-monitoring-service.ts [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getServerMonitoringService": (()=>getServerMonitoringService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$core$2f$src$2f$console$2d$monitoring$2e$service$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/monitoring/core/src/console-monitoring.service.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$registry$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/registry/index.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$api$2f$src$2f$get$2d$monitoring$2d$provider$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/monitoring/api/src/get-monitoring-provider.ts [instrumentation] (ecmascript)");
;
;
;
// create a registry for the server monitoring services
const serverMonitoringRegistry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$registry$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["createRegistry"])();
// Register the 'baselime' monitoring service
serverMonitoringRegistry.register('baselime', async ()=>{
    const { BaselimeServerMonitoringService } = await __turbopack_context__.r("[project]/packages/monitoring/baselime/src/server.ts [instrumentation] (ecmascript, async loader)")(__turbopack_context__.i);
    return new BaselimeServerMonitoringService();
});
// Register the 'sentry' monitoring service
serverMonitoringRegistry.register('sentry', async ()=>{
    const { SentryMonitoringService } = await __turbopack_context__.r("[project]/packages/monitoring/sentry/src/index.ts [instrumentation] (ecmascript, async loader)")(__turbopack_context__.i);
    return new SentryMonitoringService();
});
async function getServerMonitoringService() {
    const provider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$api$2f$src$2f$get$2d$monitoring$2d$provider$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["getMonitoringProvider"])();
    if (!provider) {
        console.info(`No instrumentation provider specified. Returning console service...`);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$core$2f$src$2f$console$2d$monitoring$2e$service$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["ConsoleMonitoringService"]();
    }
    return serverMonitoringRegistry.get(provider);
}
}}),
"[project]/packages/monitoring/api/src/server.ts [instrumentation] (ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getServerMonitoringService": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$api$2f$src$2f$services$2f$get$2d$server$2d$monitoring$2d$service$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["getServerMonitoringService"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$api$2f$src$2f$services$2f$get$2d$server$2d$monitoring$2d$service$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/monitoring/api/src/services/get-server-monitoring-service.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$api$2f$src$2f$server$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/monitoring/api/src/server.ts [instrumentation] (ecmascript) <locals>");
}}),
"[project]/packages/monitoring/api/src/server.ts [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getServerMonitoringService": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$api$2f$src$2f$server$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$exports$3e$__["getServerMonitoringService"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$api$2f$src$2f$server$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/monitoring/api/src/server.ts [instrumentation] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$api$2f$src$2f$server$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$exports$3e$__ = __turbopack_context__.i("[project]/packages/monitoring/api/src/server.ts [instrumentation] (ecmascript) <exports>");
}}),

};

//# sourceMappingURL=packages_4058f487._.js.map