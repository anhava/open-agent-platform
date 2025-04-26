(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root-of-the-server]__134e7544._.js", {

"[externals]/node:buffer [external] (node:buffer, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}}),
"[project]/packages/features/admin/src/lib/server/utils/is-super-admin.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "isSuperAdmin": (()=>isSuperAdmin)
});
async function isSuperAdmin(client) {
    try {
        const { data, error } = await client.rpc('is_super_admin');
        if (error) {
            throw error;
        }
        return data;
    } catch  {
        return false;
    }
}
}}),
"[project]/packages/features/admin/src/index.ts [middleware-edge] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2f$admin$2f$src$2f$lib$2f$server$2f$utils$2f$is$2d$super$2d$admin$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/features/admin/src/lib/server/utils/is-super-admin.ts [middleware-edge] (ecmascript)");
;
}}),
"[project]/packages/features/admin/src/index.ts [middleware-edge] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2f$admin$2f$src$2f$lib$2f$server$2f$utils$2f$is$2d$super$2d$admin$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/features/admin/src/lib/server/utils/is-super-admin.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2f$admin$2f$src$2f$index$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/features/admin/src/index.ts [middleware-edge] (ecmascript) <locals>");
}}),
"[project]/packages/supabase/src/check-requires-mfa.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "checkRequiresMultiFactorAuthentication": (()=>checkRequiresMultiFactorAuthentication)
});
const ASSURANCE_LEVEL_2 = 'aal2';
async function checkRequiresMultiFactorAuthentication(client) {
    // Suppress the getSession warning. Remove when the issue is fixed.
    // https://github.com/supabase/auth-js/issues/873
    // @ts-expect-error: suppressGetSessionWarning is not part of the public API
    client.auth.suppressGetSessionWarning = true;
    const assuranceLevel = await client.auth.mfa.getAuthenticatorAssuranceLevel();
    // @ts-expect-error: suppressGetSessionWarning is not part of the public API
    client.auth.suppressGetSessionWarning = false;
    if (assuranceLevel.error) {
        throw new Error(assuranceLevel.error.message);
    }
    const { nextLevel, currentLevel } = assuranceLevel.data;
    return nextLevel === ASSURANCE_LEVEL_2 && nextLevel !== currentLevel;
}
}}),
"[project]/packages/supabase/src/get-supabase-client-keys.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getSupabaseClientKeys": (()=>getSupabaseClientKeys)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/lib/index.mjs [middleware-edge] (ecmascript)");
;
function getSupabaseClientKeys() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].object({
        url: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].string({
            description: `This is the URL of your hosted Supabase instance. Please provide the variable NEXT_PUBLIC_SUPABASE_URL.`,
            required_error: `Please provide the variable NEXT_PUBLIC_SUPABASE_URL`
        }),
        anonKey: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].string({
            description: `This is the anon key provided by Supabase. It is a public key used client-side. Please provide the variable NEXT_PUBLIC_SUPABASE_ANON_KEY.`,
            required_error: `Please provide the variable NEXT_PUBLIC_SUPABASE_ANON_KEY`
        }).min(1)
    }).parse({
        url: ("TURBOPACK compile-time value", "http://127.0.0.1:54321"),
        anonKey: ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0")
    });
}
}}),
"[project]/packages/supabase/src/clients/middleware-client.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "createMiddlewareClient": (()=>createMiddlewareClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$server$2d$only$2f$empty$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/next/dist/compiled/server-only/empty.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$supabase$2f$src$2f$get$2d$supabase$2d$client$2d$keys$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/supabase/src/get-supabase-client-keys.ts [middleware-edge] (ecmascript)");
;
;
;
function createMiddlewareClient(request, response) {
    const keys = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$supabase$2f$src$2f$get$2d$supabase$2d$client$2d$keys$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getSupabaseClientKeys"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createServerClient"])(keys.url, keys.anonKey, {
        cookies: {
            getAll () {
                return request.cookies.getAll();
            },
            setAll (cookiesToSet) {
                cookiesToSet.forEach(({ name, value })=>request.cookies.set(name, value));
                cookiesToSet.forEach(({ name, value, options })=>response.cookies.set(name, value, options));
            }
        }
    });
}
}}),
"[project]/apps/aihio/config/app.config.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/lib/index.mjs [middleware-edge] (ecmascript)");
;
const production = ("TURBOPACK compile-time value", "development") === 'production';
const AppConfigSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].string({
        description: `This is the name of your SaaS. Ex. "Makerkit"`,
        required_error: `Please provide the variable NEXT_PUBLIC_PRODUCT_NAME`
    }).min(1),
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].string({
        description: `This is the default title tag of your SaaS.`,
        required_error: `Please provide the variable NEXT_PUBLIC_SITE_TITLE`
    }).min(1),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].string({
        description: `This is the default description of your SaaS.`,
        required_error: `Please provide the variable NEXT_PUBLIC_SITE_DESCRIPTION`
    }),
    url: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].string({
        required_error: `Please provide the variable NEXT_PUBLIC_SITE_URL`
    }).url({
        message: `You are deploying a production build but have entered a NEXT_PUBLIC_SITE_URL variable using http instead of https. It is very likely that you have set the incorrect URL. The build will now fail to prevent you from from deploying a faulty configuration. Please provide the variable NEXT_PUBLIC_SITE_URL with a valid URL, such as: 'https://example.com'`
    }),
    locale: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].string({
        description: `This is the default locale of your SaaS.`,
        required_error: `Please provide the variable NEXT_PUBLIC_DEFAULT_LOCALE`
    }).default('en'),
    theme: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].enum([
        'light',
        'dark',
        'system'
    ]),
    production: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].boolean(),
    themeColor: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].string(),
    themeColorDark: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].string()
}).refine((schema)=>{
    const isCI = process.env.NEXT_PUBLIC_CI;
    if (isCI ?? !schema.production) {
        return true;
    }
    return !schema.url.startsWith('http:');
}, {
    message: `Please provide a valid HTTPS URL. Set the variable NEXT_PUBLIC_SITE_URL with a valid URL, such as: 'https://example.com'`,
    path: [
        'url'
    ]
}).refine((schema)=>{
    return schema.themeColor !== schema.themeColorDark;
}, {
    message: `Please provide different theme colors for light and dark themes.`,
    path: [
        'themeColor'
    ]
});
const appConfig = AppConfigSchema.parse({
    name: ("TURBOPACK compile-time value", "Makerkit"),
    title: ("TURBOPACK compile-time value", "Makerkit - The easiest way to build and manage your SaaS"),
    description: ("TURBOPACK compile-time value", "Makerkit is the easiest way to build and manage your SaaS. It provides you with the tools you need to build your SaaS, without the hassle of building it from scratch."),
    url: ("TURBOPACK compile-time value", "http://localhost:3000"),
    locale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
    theme: ("TURBOPACK compile-time value", "light"),
    themeColor: ("TURBOPACK compile-time value", "#ffffff"),
    themeColorDark: ("TURBOPACK compile-time value", "#0a0a0a"),
    production
});
const __TURBOPACK__default__export__ = appConfig;
}}),
"[project]/apps/aihio/config/paths.config.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/lib/index.mjs [middleware-edge] (ecmascript)");
;
const PathsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].object({
    auth: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].object({
        signIn: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].string().min(1),
        signUp: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].string().min(1),
        verifyMfa: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].string().min(1),
        callback: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].string().min(1),
        passwordReset: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].string().min(1),
        passwordUpdate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].string().min(1)
    }),
    app: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].object({
        home: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].string().min(1),
        personalAccountSettings: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].string().min(1),
        personalAccountBilling: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].string().min(1),
        personalAccountBillingReturn: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].string().min(1),
        accountHome: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].string().min(1),
        accountSettings: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].string().min(1),
        accountBilling: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].string().min(1),
        accountMembers: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].string().min(1),
        accountBillingReturn: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].string().min(1),
        joinTeam: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["z"].string().min(1)
    })
});
const pathsConfig = PathsSchema.parse({
    auth: {
        signIn: '/auth/sign-in',
        signUp: '/auth/sign-up',
        verifyMfa: '/auth/verify',
        callback: '/auth/callback',
        passwordReset: '/auth/password-reset',
        passwordUpdate: '/update-password'
    },
    app: {
        home: '/home',
        personalAccountSettings: '/home/settings',
        personalAccountBilling: '/home/billing',
        personalAccountBillingReturn: '/home/billing/return',
        accountHome: '/home/[account]',
        accountSettings: `/home/[account]/settings`,
        accountBilling: `/home/[account]/billing`,
        accountMembers: `/home/[account]/members`,
        accountBillingReturn: `/home/[account]/billing/return`,
        joinTeam: '/join'
    }
});
const __TURBOPACK__default__export__ = pathsConfig;
}}),
"[project]/apps/aihio/lib/create-csp-response.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "createCspResponse": (()=>createCspResponse)
});
// we need to allow connecting to the Supabase API from the client
const SUPABASE_URL = ("TURBOPACK compile-time value", "http://127.0.0.1:54321");
// the URL used for Supabase Realtime
const WEBSOCKET_URL = SUPABASE_URL.replace('https://', 'ws://').replace('http://', 'ws://');
// disabled to allow loading images from Supabase Storage
const CROSS_ORIGIN_EMBEDDER_POLICY = false;
/**
 * @name ALLOWED_ORIGINS
 * @description List of allowed origins for the "connectSrc" directive in the Content Security Policy.
 */ const ALLOWED_ORIGINS = [
    SUPABASE_URL,
    WEBSOCKET_URL
];
/**
 * @name IMG_SRC_ORIGINS
 */ const IMG_SRC_ORIGINS = [
    SUPABASE_URL
];
/**
 * @name UPGRADE_INSECURE_REQUESTS
 * @description Upgrade insecure requests to HTTPS when in production
 */ const UPGRADE_INSECURE_REQUESTS = ("TURBOPACK compile-time value", "development") === 'production';
async function createCspResponse() {
    const { createMiddleware, withVercelToolbar, defaults: noseconeConfig } = await Promise.resolve().then(()=>__turbopack_context__.i("[project]/node_modules/@nosecone/next/index.js [middleware-edge] (ecmascript)"));
    /*
   * @name allowedOrigins
   * @description List of allowed origins for the "connectSrc" directive in the Content Security Policy.
   */ const config = {
        ...noseconeConfig,
        contentSecurityPolicy: {
            directives: {
                ...noseconeConfig.contentSecurityPolicy.directives,
                connectSrc: [
                    ...noseconeConfig.contentSecurityPolicy.directives.connectSrc,
                    ...ALLOWED_ORIGINS
                ],
                imgSrc: [
                    ...noseconeConfig.contentSecurityPolicy.directives.imgSrc,
                    ...IMG_SRC_ORIGINS
                ],
                upgradeInsecureRequests: UPGRADE_INSECURE_REQUESTS
            }
        },
        crossOriginEmbedderPolicy: CROSS_ORIGIN_EMBEDDER_POLICY
    };
    const middleware = createMiddleware(process.env.VERCEL_ENV === 'preview' ? withVercelToolbar(config) : config);
    // create response
    const response = await middleware();
    if (response) {
        const contentSecurityPolicy = response.headers.get('Content-Security-Policy');
        const matches = contentSecurityPolicy?.match(/nonce-([\w-]+)/) || [];
        const nonce = matches[1];
        // set x-nonce header if nonce is found
        // so we can pass it to client-side scripts
        if (nonce) {
            response.headers.set('x-nonce', nonce);
        }
    }
    return response;
}
}}),
"[project]/apps/aihio/middleware.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "config": (()=>config),
    "middleware": (()=>middleware)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$url$2d$pattern$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/next/dist/esm/server/web/spec-extension/url-pattern.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$edge$2d$csrf$2f$nextjs$2f$dist$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@edge-csrf/nextjs/dist/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2f$admin$2f$src$2f$index$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/features/admin/src/index.ts [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2f$admin$2f$src$2f$lib$2f$server$2f$utils$2f$is$2d$super$2d$admin$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/features/admin/src/lib/server/utils/is-super-admin.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$supabase$2f$src$2f$check$2d$requires$2d$mfa$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/supabase/src/check-requires-mfa.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$supabase$2f$src$2f$clients$2f$middleware$2d$client$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/supabase/src/clients/middleware-client.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$config$2f$app$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/config/app.config.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$config$2f$paths$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/config/paths.config.ts [middleware-edge] (ecmascript)");
;
;
;
;
;
;
;
const CSRF_SECRET_COOKIE = 'csrfSecret';
const NEXT_ACTION_HEADER = 'next-action';
const config = {
    matcher: [
        '/((?!_next/static|_next/image|images|locales|assets|api/*).*)'
    ]
};
const getUser = (request, response)=>{
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$supabase$2f$src$2f$clients$2f$middleware$2d$client$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createMiddlewareClient"])(request, response);
    return supabase.auth.getUser();
};
async function middleware(request) {
    const secureHeaders = await createResponseWithSecureHeaders();
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next(secureHeaders);
    // set a unique request ID for each request
    // this helps us log and trace requests
    setRequestId(request);
    // apply CSRF protection for mutating requests
    const csrfResponse = await withCsrfMiddleware(request, response);
    // handle patterns for specific routes
    const handlePattern = matchUrlPattern(request.url);
    // if a pattern handler exists, call it
    if (handlePattern) {
        const patternHandlerResponse = await handlePattern(request, csrfResponse);
        // if a pattern handler returns a response, return it
        if (patternHandlerResponse) {
            return patternHandlerResponse;
        }
    }
    // append the action path to the request headers
    // which is useful for knowing the action path in server actions
    if (isServerAction(request)) {
        csrfResponse.headers.set('x-action-path', request.nextUrl.pathname);
    }
    // if no pattern handler returned a response,
    // return the session response
    return csrfResponse;
}
async function withCsrfMiddleware(request, response) {
    // set up CSRF protection
    const csrfProtect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$edge$2d$csrf$2f$nextjs$2f$dist$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createCsrfProtect"])({
        cookie: {
            secure: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$config$2f$app$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].production,
            name: CSRF_SECRET_COOKIE
        },
        // ignore CSRF errors for server actions since protection is built-in
        ignoreMethods: isServerAction(request) ? [
            'POST'
        ] : [
            'GET',
            'HEAD',
            'OPTIONS'
        ]
    });
    try {
        await csrfProtect(request, response);
        return response;
    } catch (error) {
        // if there is a CSRF error, return a 403 response
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$edge$2d$csrf$2f$nextjs$2f$dist$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["CsrfError"]) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json('Invalid CSRF token', {
                status: 401
            });
        }
        throw error;
    }
}
function isServerAction(request) {
    const headers = new Headers(request.headers);
    return headers.has(NEXT_ACTION_HEADER);
}
async function adminMiddleware(request, response) {
    const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
    if (!isAdminPath) {
        return;
    }
    const { data: { user }, error } = await getUser(request, response);
    // If user is not logged in, redirect to sign in page.
    // This should never happen, but just in case.
    if (!user || error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$config$2f$paths$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].auth.signIn, request.nextUrl.origin).href);
    }
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$supabase$2f$src$2f$clients$2f$middleware$2d$client$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createMiddlewareClient"])(request, response);
    const userIsSuperAdmin = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$features$2f$admin$2f$src$2f$lib$2f$server$2f$utils$2f$is$2d$super$2d$admin$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isSuperAdmin"])(client);
    // If user is not an admin, redirect to 404 page.
    if (!userIsSuperAdmin) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/404', request.nextUrl.origin).href);
    }
    // in all other cases, return the response
    return response;
}
/**
 * Define URL patterns and their corresponding handlers.
 */ function getPatterns() {
    return [
        {
            pattern: new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$url$2d$pattern$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["URLPattern"]({
                pathname: '/admin/*?'
            }),
            handler: adminMiddleware
        },
        {
            pattern: new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$url$2d$pattern$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["URLPattern"]({
                pathname: '/auth/*?'
            }),
            handler: async (req, res)=>{
                const { data: { user } } = await getUser(req, res);
                // the user is logged out, so we don't need to do anything
                if (!user) {
                    return;
                }
                // check if we need to verify MFA (user is authenticated but needs to verify MFA)
                const isVerifyMfa = req.nextUrl.pathname === __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$config$2f$paths$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].auth.verifyMfa;
                // If user is logged in and does not need to verify MFA,
                // redirect to home page.
                if (!isVerifyMfa) {
                    const nextPath = req.nextUrl.searchParams.get('next') ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$config$2f$paths$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].app.home;
                    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(nextPath, req.nextUrl.origin).href);
                }
            }
        },
        {
            pattern: new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$url$2d$pattern$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["URLPattern"]({
                pathname: '/home/*?'
            }),
            handler: async (req, res)=>{
                const { data: { user } } = await getUser(req, res);
                const origin = req.nextUrl.origin;
                const next = req.nextUrl.pathname;
                // If user is not logged in, redirect to sign in page.
                if (!user) {
                    const signIn = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$config$2f$paths$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].auth.signIn;
                    const redirectPath = `${signIn}?next=${next}`;
                    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(redirectPath, origin).href);
                }
                const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$supabase$2f$src$2f$clients$2f$middleware$2d$client$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createMiddlewareClient"])(req, res);
                const requiresMultiFactorAuthentication = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$supabase$2f$src$2f$check$2d$requires$2d$mfa$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["checkRequiresMultiFactorAuthentication"])(supabase);
                // If user requires multi-factor authentication, redirect to MFA page.
                if (requiresMultiFactorAuthentication) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$config$2f$paths$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].auth.verifyMfa, origin).href);
                }
            }
        }
    ];
}
/**
 * Match URL patterns to specific handlers.
 * @param url
 */ function matchUrlPattern(url) {
    const patterns = getPatterns();
    const input = url.split('?')[0];
    for (const pattern of patterns){
        const patternResult = pattern.pattern.exec(input);
        if (patternResult !== null && 'pathname' in patternResult) {
            return pattern.handler;
        }
    }
}
/**
 * Set a unique request ID for each request.
 * @param request
 */ function setRequestId(request) {
    request.headers.set('x-correlation-id', crypto.randomUUID());
}
/**
 * @name createResponseWithSecureHeaders
 * @description Create a middleware with enhanced headers applied (if applied).
 * This is disabled by default. To enable set ENABLE_STRICT_CSP=true
 */ async function createResponseWithSecureHeaders() {
    const enableStrictCsp = process.env.ENABLE_STRICT_CSP ?? 'false';
    // we disable ENABLE_STRICT_CSP by default
    if (enableStrictCsp === 'false') {
        return {};
    }
    const { createCspResponse } = await Promise.resolve().then(()=>__turbopack_context__.i("[project]/apps/aihio/lib/create-csp-response.ts [middleware-edge] (ecmascript)"));
    return createCspResponse();
}
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__134e7544._.js.map