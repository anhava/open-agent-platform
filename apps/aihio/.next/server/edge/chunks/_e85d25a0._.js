(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/_e85d25a0._.js", {

"[project]/packages/monitoring/api/src/server.ts [instrumentation-edge] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
;
}}),
"[project]/packages/monitoring/api/src/server.ts [instrumentation-edge] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$api$2f$src$2f$server$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/monitoring/api/src/server.ts [instrumentation-edge] (ecmascript) <locals>");
}}),
"[project]/packages/monitoring/core/src/console-monitoring.service.ts [instrumentation-edge] (ecmascript)": ((__turbopack_context__) => {
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
"[project]/packages/shared/src/registry/index.ts [instrumentation-edge] (ecmascript)": ((__turbopack_context__) => {
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
"[project]/packages/monitoring/api/src/get-monitoring-provider.ts [instrumentation-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "MONITORING_PROVIDER": (()=>MONITORING_PROVIDER),
    "getMonitoringProvider": (()=>getMonitoringProvider)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/lib/index.mjs [instrumentation-edge] (ecmascript)");
;
const MONITORING_PROVIDER = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["z"].enum([
    'baselime',
    'sentry',
    ''
]).optional().transform((value)=>value || undefined);
function getMonitoringProvider() {
    return MONITORING_PROVIDER.parse(process.env.NEXT_PUBLIC_MONITORING_PROVIDER);
}
}}),
"[project]/packages/monitoring/baselime/src/services/baselime-server-monitoring.service.ts [instrumentation-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "BaselimeServerMonitoringService": (()=>BaselimeServerMonitoringService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/lib/index.mjs [instrumentation-edge] (ecmascript)");
;
const apiKey = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["z"].string({
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
"[project]/packages/monitoring/baselime/src/server.ts [instrumentation-edge] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$baselime$2f$src$2f$services$2f$baselime$2d$server$2d$monitoring$2e$service$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/monitoring/baselime/src/services/baselime-server-monitoring.service.ts [instrumentation-edge] (ecmascript)");
;
}}),
"[project]/packages/monitoring/baselime/src/server.ts [instrumentation-edge] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$baselime$2f$src$2f$services$2f$baselime$2d$server$2d$monitoring$2e$service$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/monitoring/baselime/src/services/baselime-server-monitoring.service.ts [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$baselime$2f$src$2f$server$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/monitoring/baselime/src/server.ts [instrumentation-edge] (ecmascript) <locals>");
}}),
"[project]/packages/monitoring/baselime/src/server.ts [instrumentation-edge] (ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "BaselimeServerMonitoringService": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$baselime$2f$src$2f$services$2f$baselime$2d$server$2d$monitoring$2e$service$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["BaselimeServerMonitoringService"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$baselime$2f$src$2f$services$2f$baselime$2d$server$2d$monitoring$2e$service$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/monitoring/baselime/src/services/baselime-server-monitoring.service.ts [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$baselime$2f$src$2f$server$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/monitoring/baselime/src/server.ts [instrumentation-edge] (ecmascript) <locals>");
}}),
"[project]/packages/monitoring/baselime/src/server.ts [instrumentation-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "BaselimeServerMonitoringService": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$baselime$2f$src$2f$server$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$exports$3e$__["BaselimeServerMonitoringService"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$baselime$2f$src$2f$server$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/monitoring/baselime/src/server.ts [instrumentation-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$baselime$2f$src$2f$server$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$exports$3e$__ = __turbopack_context__.i("[project]/packages/monitoring/baselime/src/server.ts [instrumentation-edge] (ecmascript) <exports>");
}}),
"[project]/apps/aihio/lib/dev-mock-modules.ts [instrumentation-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/*
* Mock modules for development.

This file is used to mock the modules that are not needed during development (unless they are used).
It allows the development server to load faster by not loading the modules that are not needed.
 */ __turbopack_context__.s({
    "BaselimeRum": (()=>BaselimeRum),
    "Turnstile": (()=>Turnstile),
    "TurnstileProps": (()=>TurnstileProps),
    "captureEvent": (()=>captureEvent),
    "captureException": (()=>captureException),
    "createTransport": (()=>createTransport),
    "init": (()=>init),
    "loadStripe": (()=>loadStripe),
    "setUser": (()=>setUser),
    "useBaselimeRum": (()=>useBaselimeRum)
});
const noop = (name)=>{
    return ()=>{
        console.debug(`The function "${name}" is mocked for development because your environment variables indicate that it is not needed. 
    If you think this is a mistake, please open a support ticket.`);
    };
};
const Turnstile = undefined;
const TurnstileProps = {};
const useBaselimeRum = noop('useBaselimeRum');
const BaselimeRum = undefined;
const captureException = noop('Sentry.captureException');
const captureEvent = noop('Sentry.captureEvent');
const init = noop('Sentry.init');
const setUser = noop('Sentry.setUser');
const loadStripe = noop('Stripe.loadStripe');
const createTransport = noop('Nodemailer.createTransport');
}}),
"[project]/packages/monitoring/sentry/src/sentry.server.config.ts [instrumentation-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "initializeSentryServerClient": (()=>initializeSentryServerClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$lib$2f$dev$2d$mock$2d$modules$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/lib/dev-mock-modules.ts [instrumentation-edge] (ecmascript)");
;
function initializeSentryServerClient(props = {}) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$lib$2f$dev$2d$mock$2d$modules$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["init"])({
        dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
        // ...
        // Note: if you want to override the automatic release value, do not set a
        // `release` value here - use the environment variable `SENTRY_RELEASE`, so
        // that it will also get attached to your source maps,
        ...props
    });
}
}}),
"[project]/packages/monitoring/sentry/src/sentry.client.config.ts [instrumentation-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "initializeSentryBrowserClient": (()=>initializeSentryBrowserClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$lib$2f$dev$2d$mock$2d$modules$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/lib/dev-mock-modules.ts [instrumentation-edge] (ecmascript)");
;
function initializeSentryBrowserClient(props = {}) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$lib$2f$dev$2d$mock$2d$modules$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["init"])({
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
"[project]/packages/monitoring/sentry/src/services/sentry-monitoring.service.ts [instrumentation-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "SentryMonitoringService": (()=>SentryMonitoringService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$lib$2f$dev$2d$mock$2d$modules$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/lib/dev-mock-modules.ts [instrumentation-edge] (ecmascript)");
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
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$lib$2f$dev$2d$mock$2d$modules$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureException"])(error);
    }
    captureEvent(event, extra) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$lib$2f$dev$2d$mock$2d$modules$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["captureEvent"])({
            message: event,
            ...extra ?? {}
        });
    }
    identifyUser(user) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$lib$2f$dev$2d$mock$2d$modules$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["setUser"])(user);
    }
    async initialize() {
        const environment = process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT ?? process.env.VERCEL_ENV;
        if (typeof document !== 'undefined') {
            const { initializeSentryBrowserClient } = await Promise.resolve().then(()=>__turbopack_context__.i("[project]/packages/monitoring/sentry/src/sentry.client.config.ts [instrumentation-edge] (ecmascript)"));
            initializeSentryBrowserClient({
                environment
            });
        } else {
            const { initializeSentryServerClient } = await Promise.resolve().then(()=>__turbopack_context__.i("[project]/packages/monitoring/sentry/src/sentry.server.config.ts [instrumentation-edge] (ecmascript)"));
            initializeSentryServerClient({
                environment
            });
        }
        this.readyResolver?.();
    }
}
}}),
"[project]/packages/monitoring/sentry/src/index.ts [instrumentation-edge] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$sentry$2f$src$2f$services$2f$sentry$2d$monitoring$2e$service$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/monitoring/sentry/src/services/sentry-monitoring.service.ts [instrumentation-edge] (ecmascript)");
;
}}),
"[project]/packages/monitoring/sentry/src/index.ts [instrumentation-edge] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$sentry$2f$src$2f$services$2f$sentry$2d$monitoring$2e$service$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/monitoring/sentry/src/services/sentry-monitoring.service.ts [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$sentry$2f$src$2f$index$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/monitoring/sentry/src/index.ts [instrumentation-edge] (ecmascript) <locals>");
}}),
"[project]/packages/monitoring/sentry/src/index.ts [instrumentation-edge] (ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "SentryMonitoringService": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$sentry$2f$src$2f$services$2f$sentry$2d$monitoring$2e$service$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["SentryMonitoringService"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$sentry$2f$src$2f$services$2f$sentry$2d$monitoring$2e$service$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/monitoring/sentry/src/services/sentry-monitoring.service.ts [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$sentry$2f$src$2f$index$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/monitoring/sentry/src/index.ts [instrumentation-edge] (ecmascript) <locals>");
}}),
"[project]/packages/monitoring/sentry/src/index.ts [instrumentation-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "SentryMonitoringService": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$sentry$2f$src$2f$index$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$exports$3e$__["SentryMonitoringService"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$sentry$2f$src$2f$index$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/monitoring/sentry/src/index.ts [instrumentation-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$sentry$2f$src$2f$index$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$exports$3e$__ = __turbopack_context__.i("[project]/packages/monitoring/sentry/src/index.ts [instrumentation-edge] (ecmascript) <exports>");
}}),
"[project]/packages/monitoring/api/src/services/get-server-monitoring-service.ts [instrumentation-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getServerMonitoringService": (()=>getServerMonitoringService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$core$2f$src$2f$console$2d$monitoring$2e$service$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/monitoring/core/src/console-monitoring.service.ts [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$registry$2f$index$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/registry/index.ts [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$api$2f$src$2f$get$2d$monitoring$2d$provider$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/monitoring/api/src/get-monitoring-provider.ts [instrumentation-edge] (ecmascript)");
;
;
;
// create a registry for the server monitoring services
const serverMonitoringRegistry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$registry$2f$index$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["createRegistry"])();
// Register the 'baselime' monitoring service
serverMonitoringRegistry.register('baselime', async ()=>{
    const { BaselimeServerMonitoringService } = await Promise.resolve().then(()=>__turbopack_context__.i("[project]/packages/monitoring/baselime/src/server.ts [instrumentation-edge] (ecmascript)"));
    return new BaselimeServerMonitoringService();
});
// Register the 'sentry' monitoring service
serverMonitoringRegistry.register('sentry', async ()=>{
    const { SentryMonitoringService } = await Promise.resolve().then(()=>__turbopack_context__.i("[project]/packages/monitoring/sentry/src/index.ts [instrumentation-edge] (ecmascript)"));
    return new SentryMonitoringService();
});
async function getServerMonitoringService() {
    const provider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$api$2f$src$2f$get$2d$monitoring$2d$provider$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getMonitoringProvider"])();
    if (!provider) {
        console.info(`No instrumentation provider specified. Returning console service...`);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$core$2f$src$2f$console$2d$monitoring$2e$service$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["ConsoleMonitoringService"]();
    }
    return serverMonitoringRegistry.get(provider);
}
}}),
"[project]/packages/monitoring/api/src/server.ts [instrumentation-edge] (ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getServerMonitoringService": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$api$2f$src$2f$services$2f$get$2d$server$2d$monitoring$2d$service$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getServerMonitoringService"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$api$2f$src$2f$services$2f$get$2d$server$2d$monitoring$2d$service$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/monitoring/api/src/services/get-server-monitoring-service.ts [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$api$2f$src$2f$server$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/monitoring/api/src/server.ts [instrumentation-edge] (ecmascript) <locals>");
}}),
"[project]/packages/monitoring/api/src/server.ts [instrumentation-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getServerMonitoringService": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$api$2f$src$2f$server$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$exports$3e$__["getServerMonitoringService"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$api$2f$src$2f$server$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/monitoring/api/src/server.ts [instrumentation-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$api$2f$src$2f$server$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__$3c$exports$3e$__ = __turbopack_context__.i("[project]/packages/monitoring/api/src/server.ts [instrumentation-edge] (ecmascript) <exports>");
}}),
"[project]/packages/monitoring/baselime/src/instrumentation.ts [instrumentation-edge] (ecmascript)": ((__turbopack_context__) => {
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
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
}
}}),
"[project]/packages/monitoring/api/src/instrumentation.ts [instrumentation-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "registerMonitoringInstrumentation": (()=>registerMonitoringInstrumentation)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$registry$2f$index$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/registry/index.ts [instrumentation-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$api$2f$src$2f$get$2d$monitoring$2d$provider$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/monitoring/api/src/get-monitoring-provider.ts [instrumentation-edge] (ecmascript)");
;
;
// Create a registry for instrumentation providers, using literal strings 'baselime' and 'sentry'
const instrumentationRegistry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$registry$2f$index$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["createRegistry"])();
// Register the 'baselime' instrumentation provider
instrumentationRegistry.register('baselime', async ()=>{
    const { registerInstrumentation } = await Promise.resolve().then(()=>__turbopack_context__.i("[project]/packages/monitoring/baselime/src/instrumentation.ts [instrumentation-edge] (ecmascript)"));
    return {
        register: registerInstrumentation
    };
});
// Register the 'sentry' instrumentation provider with a no-op registration, since Sentry v8 sets up automatically
instrumentationRegistry.register('sentry', ()=>{
    return {
        register: ()=>{
            return;
        }
    };
});
async function registerMonitoringInstrumentation() {
    const provider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$api$2f$src$2f$get$2d$monitoring$2d$provider$2e$ts__$5b$instrumentation$2d$edge$5d$__$28$ecmascript$29$__["getMonitoringProvider"])();
    if (!provider) {
        return;
    }
    const instrumentation = await instrumentationRegistry.get(provider);
    return instrumentation.register();
}
}}),
"[project]/apps/aihio/instrumentation.ts [instrumentation-edge] (ecmascript)": ((__turbopack_context__) => {
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
    const { registerMonitoringInstrumentation } = await Promise.resolve().then(()=>__turbopack_context__.i("[project]/packages/monitoring/api/src/instrumentation.ts [instrumentation-edge] (ecmascript)"));
    // Register monitoring instrumentation
    // based on the MONITORING_PROVIDER environment variable.
    await registerMonitoringInstrumentation();
}
const onRequestError = async (err)=>{
    const { getServerMonitoringService } = await Promise.resolve().then(()=>__turbopack_context__.i("[project]/packages/monitoring/api/src/server.ts [instrumentation-edge] (ecmascript)"));
    const service = await getServerMonitoringService();
    await service.ready();
    await service.captureException(err);
};
}}),
"[project]/apps/aihio/edge-wrapper.js { MODULE => \"[project]/apps/aihio/instrumentation.ts [instrumentation-edge] (ecmascript)\" } [instrumentation-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
self._ENTRIES ||= {};
const modProm = Promise.resolve().then(()=>__turbopack_context__.i("[project]/apps/aihio/instrumentation.ts [instrumentation-edge] (ecmascript)"));
modProm.catch(()=>{});
self._ENTRIES["middleware_instrumentation"] = new Proxy(modProm, {
    get (modProm, name) {
        if (name === "then") {
            return (res, rej)=>modProm.then(res, rej);
        }
        let result = (...args)=>modProm.then((mod)=>(0, mod[name])(...args));
        result.then = (res, rej)=>modProm.then((mod)=>mod[name]).then(res, rej);
        return result;
    }
});
}}),
}]);

//# sourceMappingURL=_e85d25a0._.js.map