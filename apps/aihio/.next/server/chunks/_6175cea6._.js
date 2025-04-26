module.exports = {

"[project]/apps/aihio/lib/dev-mock-modules.ts [instrumentation] (ecmascript)": ((__turbopack_context__) => {
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
"[project]/packages/monitoring/sentry/src/services/sentry-monitoring.service.ts [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "SentryMonitoringService": (()=>SentryMonitoringService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$lib$2f$dev$2d$mock$2d$modules$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/lib/dev-mock-modules.ts [instrumentation] (ecmascript)");
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
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$lib$2f$dev$2d$mock$2d$modules$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["captureException"])(error);
    }
    captureEvent(event, extra) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$lib$2f$dev$2d$mock$2d$modules$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["captureEvent"])({
            message: event,
            ...extra ?? {}
        });
    }
    identifyUser(user) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$lib$2f$dev$2d$mock$2d$modules$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["setUser"])(user);
    }
    async initialize() {
        const environment = process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT ?? process.env.VERCEL_ENV;
        if (typeof document !== 'undefined') {
            const { initializeSentryBrowserClient } = await __turbopack_context__.r("[project]/packages/monitoring/sentry/src/sentry.client.config.ts [instrumentation] (ecmascript, async loader)")(__turbopack_context__.i);
            initializeSentryBrowserClient({
                environment
            });
        } else {
            const { initializeSentryServerClient } = await __turbopack_context__.r("[project]/packages/monitoring/sentry/src/sentry.server.config.ts [instrumentation] (ecmascript, async loader)")(__turbopack_context__.i);
            initializeSentryServerClient({
                environment
            });
        }
        this.readyResolver?.();
    }
}
}}),
"[project]/packages/monitoring/sentry/src/index.ts [instrumentation] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$sentry$2f$src$2f$services$2f$sentry$2d$monitoring$2e$service$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/monitoring/sentry/src/services/sentry-monitoring.service.ts [instrumentation] (ecmascript)");
;
}}),
"[project]/packages/monitoring/sentry/src/index.ts [instrumentation] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$sentry$2f$src$2f$services$2f$sentry$2d$monitoring$2e$service$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/monitoring/sentry/src/services/sentry-monitoring.service.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$sentry$2f$src$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/monitoring/sentry/src/index.ts [instrumentation] (ecmascript) <locals>");
}}),
"[project]/packages/monitoring/sentry/src/index.ts [instrumentation] (ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "SentryMonitoringService": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$sentry$2f$src$2f$services$2f$sentry$2d$monitoring$2e$service$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["SentryMonitoringService"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$sentry$2f$src$2f$services$2f$sentry$2d$monitoring$2e$service$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/monitoring/sentry/src/services/sentry-monitoring.service.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$sentry$2f$src$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/monitoring/sentry/src/index.ts [instrumentation] (ecmascript) <locals>");
}}),
"[project]/packages/monitoring/sentry/src/index.ts [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "SentryMonitoringService": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$sentry$2f$src$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$exports$3e$__["SentryMonitoringService"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$sentry$2f$src$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/monitoring/sentry/src/index.ts [instrumentation] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$monitoring$2f$sentry$2f$src$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$exports$3e$__ = __turbopack_context__.i("[project]/packages/monitoring/sentry/src/index.ts [instrumentation] (ecmascript) <exports>");
}}),

};

//# sourceMappingURL=_6175cea6._.js.map