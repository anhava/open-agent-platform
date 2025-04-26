(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/packages/billing/core/src/create-billing-schema.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "BillingProviderSchema": (()=>BillingProviderSchema),
    "LineItemSchema": (()=>LineItemSchema),
    "LineItemType": (()=>LineItemType),
    "PaymentTypeSchema": (()=>PaymentTypeSchema),
    "PlanSchema": (()=>PlanSchema),
    "createBillingSchema": (()=>createBillingSchema),
    "getLineItemTypeById": (()=>getLineItemTypeById),
    "getPlanIntervals": (()=>getPlanIntervals),
    "getPrimaryLineItem": (()=>getPrimaryLineItem),
    "getProductPlanPair": (()=>getProductPlanPair),
    "getProductPlanPairByVariantId": (()=>getProductPlanPairByVariantId)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/lib/index.mjs [app-client] (ecmascript)");
;
var LineItemType = /*#__PURE__*/ function(LineItemType) {
    LineItemType["Flat"] = "flat";
    LineItemType["PerSeat"] = "per_seat";
    LineItemType["Metered"] = "metered";
    return LineItemType;
}({});
const BillingIntervalSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].enum([
    'month',
    'year'
]);
const LineItemTypeSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].enum([
    'flat',
    'per_seat',
    'metered'
]);
const BillingProviderSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].enum([
    'stripe',
    'paddle',
    'lemon-squeezy'
]);
const PaymentTypeSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].enum([
    'one-time',
    'recurring'
]);
const LineItemSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string({
        description: 'Unique identifier for the line item. Defined by the Provider.'
    }).min(1),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string({
        description: 'Name of the line item. Displayed to the user.'
    }).min(1),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string({
        description: 'Description of the line item. Displayed to the user and will replace the auto-generated description inferred' + ' from the line item. This is useful if you want to provide a more detailed description to the user.'
    }).optional(),
    cost: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].number({
        description: 'Cost of the line item. Displayed to the user.'
    }).min(0),
    type: LineItemTypeSchema,
    unit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string({
        description: 'Unit of the line item. Displayed to the user. Example "seat" or "GB"'
    }).optional(),
    setupFee: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].number({
        description: `Lemon Squeezy only: If true, in addition to the cost, a setup fee will be charged.`
    }).positive().optional(),
    tiers: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
        cost: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].number().min(0),
        upTo: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].union([
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].number().min(0),
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('unlimited')
        ])
    })).optional()
}).refine((data)=>data.type !== "metered" || data.unit && data.tiers !== undefined, {
    message: 'Metered line items must have a unit and tiers',
    path: [
        'type',
        'unit',
        'tiers'
    ]
}).refine(_c = (data)=>{
    if (data.type === "metered") {
        return data.cost === 0;
    }
    return true;
}, {
    message: 'Metered line items must have a cost of 0. Please add a different line item type for a flat fee (Stripe)',
    path: [
        'type',
        'cost'
    ]
});
_c1 = LineItemSchema;
const PlanSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string({
        description: 'Unique identifier for the plan. Defined by yourself.'
    }).min(1),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string({
        description: 'Name of the plan. Displayed to the user.'
    }).min(1),
    interval: BillingIntervalSchema.optional(),
    custom: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].boolean().default(false).optional(),
    label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().min(1).optional(),
    buttonLabel: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().min(1).optional(),
    href: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().min(1).optional(),
    lineItems: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(LineItemSchema).refine((schema)=>{
        const types = schema.map((item)=>item.type);
        const perSeat = types.filter((type)=>type === "per_seat").length;
        const flat = types.filter((type)=>type === "flat").length;
        return perSeat <= 1 && flat <= 1;
    }, {
        message: 'Plans can only have one per-seat and one flat line item',
        path: [
            'lineItems'
        ]
    }),
    trialDays: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].number({
        description: 'Number of days for the trial period. Leave empty for no trial.'
    }).positive().optional(),
    paymentType: PaymentTypeSchema
}).refine((data)=>{
    if (data.custom) {
        return data.lineItems.length === 0;
    }
    return data.lineItems.length > 0;
}, {
    message: 'Non-Custom Plans must have at least one line item',
    path: [
        'lineItems'
    ]
}).refine((data)=>{
    if (data.custom) {
        return data.lineItems.length === 0;
    }
    return data.lineItems.length > 0;
}, {
    message: 'Custom Plans must have 0 line items',
    path: [
        'lineItems'
    ]
}).refine((data)=>data.paymentType !== 'one-time' || data.interval === undefined, {
    message: 'One-time plans must not have an interval',
    path: [
        'paymentType',
        'interval'
    ]
}).refine((data)=>data.paymentType !== 'recurring' || data.interval !== undefined, {
    message: 'Recurring plans must have an interval',
    path: [
        'paymentType',
        'interval'
    ]
}).refine((item)=>{
    // metered line items can be shared across plans
    const lineItems = item.lineItems.filter((item)=>item.type !== "metered");
    const ids = lineItems.map((item)=>item.id);
    return ids.length === new Set(ids).size;
}, {
    message: 'Line item IDs must be unique',
    path: [
        'lineItems'
    ]
}).refine(_c2 = (data)=>{
    if (data.paymentType === 'one-time') {
        const nonFlatLineItems = data.lineItems.filter((item)=>item.type !== "flat");
        return nonFlatLineItems.length === 0;
    }
    return true;
}, {
    message: 'One-time plans must not have non-flat line items',
    path: [
        'paymentType',
        'lineItems'
    ]
});
_c3 = PlanSchema;
const ProductSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string({
        description: 'Unique identifier for the product. Defined by th Provider.'
    }).min(1),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string({
        description: 'Name of the product. Displayed to the user.'
    }).min(1),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string({
        description: 'Description of the product. Displayed to the user.'
    }).min(1),
    currency: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string({
        description: 'Currency code for the product. Displayed to the user.'
    }).min(3).max(3),
    badge: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string({
        description: 'Badge for the product. Displayed to the user. Example: "Popular"'
    }).optional(),
    features: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string({
        description: 'Features of the product. Displayed to the user.'
    })).nonempty(),
    enableDiscountField: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].boolean({
        description: 'Enable discount field for the product in the checkout.'
    }).optional(),
    highlighted: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].boolean({
        description: 'Highlight this product. Displayed to the user.'
    }).optional(),
    hidden: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].boolean({
        description: 'Hide this product from being displayed to users.'
    }).optional(),
    plans: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(PlanSchema)
}).refine((data)=>data.plans.length > 0, {
    message: 'Products must have at least one plan',
    path: [
        'plans'
    ]
}).refine(_c4 = (item)=>{
    const planIds = item.plans.map((plan)=>plan.id);
    return planIds.length === new Set(planIds).size;
}, {
    message: 'Plan IDs must be unique',
    path: [
        'plans'
    ]
});
_c5 = ProductSchema;
const BillingSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    provider: BillingProviderSchema,
    products: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(ProductSchema).nonempty()
}).refine((data)=>{
    const ids = data.products.flatMap((product)=>product.plans.flatMap((plan)=>plan.lineItems.map((item)=>item.id)));
    return ids.length === new Set(ids).size;
}, {
    message: 'Line item IDs must be unique',
    path: [
        'products'
    ]
}).refine((schema)=>{
    if (schema.provider === 'lemon-squeezy') {
        for (const product of schema.products){
            for (const plan of product.plans){
                if (plan.lineItems.length > 1) {
                    return false;
                }
            }
        }
    }
    return true;
}, {
    message: 'Lemon Squeezy only supports one line item per plan',
    path: [
        'provider',
        'products'
    ]
}).refine(_c6 = (schema)=>{
    if (schema.provider !== 'lemon-squeezy') {
        // Check if there are any flat fee metered items
        const setupFeeItems = schema.products.flatMap((product)=>product.plans.flatMap((plan)=>plan.lineItems.filter((item)=>item.setupFee)));
        // If there are any flat fee metered items, return an error
        if (setupFeeItems.length > 0) {
            return false;
        }
    }
    return true;
}, {
    message: 'Setup fee metered items are only supported by Lemon Squeezy. For Stripe and Paddle, please use a separate line item for the setup fee.',
    path: [
        'products',
        'plans',
        'lineItems'
    ]
});
_c7 = BillingSchema;
function createBillingSchema(config) {
    return BillingSchema.parse(config);
}
function getPlanIntervals(config) {
    const intervals = config.products.flatMap((product)=>product.plans.map((plan)=>plan.interval)).filter(Boolean);
    return Array.from(new Set(intervals));
}
function getPrimaryLineItem(config, planId) {
    for (const product of config.products){
        for (const plan of product.plans){
            if (plan.id === planId) {
                // Lemon Squeezy only supports one line item per plan
                if (config.provider === 'lemon-squeezy') {
                    return plan.lineItems[0];
                }
                const flatLineItem = plan.lineItems.find((item)=>item.type === "flat");
                if (flatLineItem) {
                    return flatLineItem;
                }
                return plan.lineItems[0];
            }
        }
    }
    throw new Error('Base line item not found');
}
function getProductPlanPair(config, planId) {
    for (const product of config.products){
        for (const plan of product.plans){
            if (plan.id === planId) {
                return {
                    product,
                    plan
                };
            }
        }
    }
    throw new Error('Plan not found');
}
function getProductPlanPairByVariantId(config, planId) {
    for (const product of config.products){
        for (const plan of product.plans){
            for (const lineItem of plan.lineItems){
                if (lineItem.id === planId) {
                    return {
                        product,
                        plan
                    };
                }
            }
        }
    }
    throw new Error('Plan not found');
}
function getLineItemTypeById(config, id) {
    for (const product of config.products){
        for (const plan of product.plans){
            for (const lineItem of plan.lineItems){
                if (lineItem.id === id) {
                    return lineItem.type;
                }
            }
        }
    }
    throw new Error(`Line Item with ID ${id} not found`);
}
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "LineItemSchema$z\r\n  .object({\r\n    id: z\r\n      .string({\r\n        description:\r\n          'Unique identifier for the line item. Defined by the Provider.',\r\n      })\r\n      .min(1),\r\n    name: z\r\n      .string({\r\n        description: 'Name of the line item. Displayed to the user.',\r\n      })\r\n      .min(1),\r\n    description: z\r\n      .string({\r\n        description:\r\n          'Description of the line item. Displayed to the user and will replace the auto-generated description inferred' +\r\n          ' from the line item. This is useful if you want to provide a more detailed description to the user.',\r\n      })\r\n      .optional(),\r\n    cost: z\r\n      .number({\r\n        description: 'Cost of the line item. Displayed to the user.',\r\n      })\r\n      .min(0),\r\n    type: LineItemTypeSchema,\r\n    unit: z\r\n      .string({\r\n        description:\r\n          'Unit of the line item. Displayed to the user. Example \"seat\" or \"GB\"',\r\n      })\r\n      .optional(),\r\n    setupFee: z\r\n      .number({\r\n        description: `Lemon Squeezy only: If true, in addition to the cost, a setup fee will be charged.`,\r\n      })\r\n      .positive()\r\n      .optional(),\r\n    tiers: z\r\n      .array(\r\n        z.object({\r\n          cost: z.number().min(0),\r\n          upTo: z.union([z.number().min(0), z.literal('unlimited')]),\r\n        }),\r\n      )\r\n      .optional(),\r\n  })\r\n  .refine(\r\n    (data) =>\r\n      data.type !== LineItemType.Metered ||\r\n      (data.unit && data.tiers !== undefined),\r\n    {\r\n      message: 'Metered line items must have a unit and tiers',\r\n      path: ['type', 'unit', 'tiers'],\r\n    },\r\n  )\r\n  .refine");
__turbopack_context__.k.register(_c1, "LineItemSchema");
__turbopack_context__.k.register(_c2, "PlanSchema$z\r\n  .object({\r\n    id: z\r\n      .string({\r\n        description: 'Unique identifier for the plan. Defined by yourself.',\r\n      })\r\n      .min(1),\r\n    name: z\r\n      .string({\r\n        description: 'Name of the plan. Displayed to the user.',\r\n      })\r\n      .min(1),\r\n    interval: BillingIntervalSchema.optional(),\r\n    custom: z.boolean().default(false).optional(),\r\n    label: z.string().min(1).optional(),\r\n    buttonLabel: z.string().min(1).optional(),\r\n    href: z.string().min(1).optional(),\r\n    lineItems: z.array(LineItemSchema).refine(\r\n      (schema) => {\r\n        const types = schema.map((item) => item.type);\r\n\r\n        const perSeat = types.filter(\r\n          (type) => type === LineItemType.PerSeat,\r\n        ).length;\r\n\r\n        const flat = types.filter((type) => type === LineItemType.Flat).length;\r\n\r\n        return perSeat <= 1 && flat <= 1;\r\n      },\r\n      {\r\n        message: 'Plans can only have one per-seat and one flat line item',\r\n        path: ['lineItems'],\r\n      },\r\n    ),\r\n    trialDays: z\r\n      .number({\r\n        description:\r\n          'Number of days for the trial period. Leave empty for no trial.',\r\n      })\r\n      .positive()\r\n      .optional(),\r\n    paymentType: PaymentTypeSchema,\r\n  })\r\n  .refine(\r\n    (data) => {\r\n      if (data.custom) {\r\n        return data.lineItems.length === 0;\r\n      }\r\n\r\n      return data.lineItems.length > 0;\r\n    },\r\n    {\r\n      message: 'Non-Custom Plans must have at least one line item',\r\n      path: ['lineItems'],\r\n    },\r\n  )\r\n  .refine(\r\n    (data) => {\r\n      if (data.custom) {\r\n        return data.lineItems.length === 0;\r\n      }\r\n\r\n      return data.lineItems.length > 0;\r\n    },\r\n    {\r\n      message: 'Custom Plans must have 0 line items',\r\n      path: ['lineItems'],\r\n    },\r\n  )\r\n  .refine(\r\n    (data) => data.paymentType !== 'one-time' || data.interval === undefined,\r\n    {\r\n      message: 'One-time plans must not have an interval',\r\n      path: ['paymentType', 'interval'],\r\n    },\r\n  )\r\n  .refine(\r\n    (data) => data.paymentType !== 'recurring' || data.interval !== undefined,\r\n    {\r\n      message: 'Recurring plans must have an interval',\r\n      path: ['paymentType', 'interval'],\r\n    },\r\n  )\r\n  .refine(\r\n    (item) => {\r\n      // metered line items can be shared across plans\r\n      const lineItems = item.lineItems.filter(\r\n        (item) => item.type !== LineItemType.Metered,\r\n      );\r\n\r\n      const ids = lineItems.map((item) => item.id);\r\n\r\n      return ids.length === new Set(ids).size;\r\n    },\r\n    {\r\n      message: 'Line item IDs must be unique',\r\n      path: ['lineItems'],\r\n    },\r\n  )\r\n  .refine");
__turbopack_context__.k.register(_c3, "PlanSchema");
__turbopack_context__.k.register(_c4, "ProductSchema$z\r\n  .object({\r\n    id: z\r\n      .string({\r\n        description:\r\n          'Unique identifier for the product. Defined by th Provider.',\r\n      })\r\n      .min(1),\r\n    name: z\r\n      .string({\r\n        description: 'Name of the product. Displayed to the user.',\r\n      })\r\n      .min(1),\r\n    description: z\r\n      .string({\r\n        description: 'Description of the product. Displayed to the user.',\r\n      })\r\n      .min(1),\r\n    currency: z\r\n      .string({\r\n        description: 'Currency code for the product. Displayed to the user.',\r\n      })\r\n      .min(3)\r\n      .max(3),\r\n    badge: z\r\n      .string({\r\n        description:\r\n          'Badge for the product. Displayed to the user. Example: \"Popular\"',\r\n      })\r\n      .optional(),\r\n    features: z\r\n      .array(\r\n        z.string({\r\n          description: 'Features of the product. Displayed to the user.',\r\n        }),\r\n      )\r\n      .nonempty(),\r\n    enableDiscountField: z\r\n      .boolean({\r\n        description: 'Enable discount field for the product in the checkout.',\r\n      })\r\n      .optional(),\r\n    highlighted: z\r\n      .boolean({\r\n        description: 'Highlight this product. Displayed to the user.',\r\n      })\r\n      .optional(),\r\n    hidden: z\r\n      .boolean({\r\n        description: 'Hide this product from being displayed to users.',\r\n      })\r\n      .optional(),\r\n    plans: z.array(PlanSchema),\r\n  })\r\n  .refine((data) => data.plans.length > 0, {\r\n    message: 'Products must have at least one plan',\r\n    path: ['plans'],\r\n  })\r\n  .refine");
__turbopack_context__.k.register(_c5, "ProductSchema");
__turbopack_context__.k.register(_c6, "BillingSchema$z\r\n  .object({\r\n    provider: BillingProviderSchema,\r\n    products: z.array(ProductSchema).nonempty(),\r\n  })\r\n  .refine(\r\n    (data) => {\r\n      const ids = data.products.flatMap((product) =>\r\n        product.plans.flatMap((plan) => plan.lineItems.map((item) => item.id)),\r\n      );\r\n\r\n      return ids.length === new Set(ids).size;\r\n    },\r\n    {\r\n      message: 'Line item IDs must be unique',\r\n      path: ['products'],\r\n    },\r\n  )\r\n  .refine(\r\n    (schema) => {\r\n      if (schema.provider === 'lemon-squeezy') {\r\n        for (const product of schema.products) {\r\n          for (const plan of product.plans) {\r\n            if (plan.lineItems.length > 1) {\r\n              return false;\r\n            }\r\n          }\r\n        }\r\n      }\r\n\r\n      return true;\r\n    },\r\n    {\r\n      message: 'Lemon Squeezy only supports one line item per plan',\r\n      path: ['provider', 'products'],\r\n    },\r\n  )\r\n  .refine");
__turbopack_context__.k.register(_c7, "BillingSchema");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/packages/billing/core/src/services/billing-strategy-provider.service.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "BillingStrategyProviderService": (()=>BillingStrategyProviderService)
});
class BillingStrategyProviderService {
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/packages/billing/core/src/services/billing-webhook-handler.service.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "BillingWebhookHandlerService": (()=>BillingWebhookHandlerService)
});
class BillingWebhookHandlerService {
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/packages/billing/core/src/index.ts [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$billing$2f$core$2f$src$2f$create$2d$billing$2d$schema$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/billing/core/src/create-billing-schema.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$billing$2f$core$2f$src$2f$services$2f$billing$2d$strategy$2d$provider$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/billing/core/src/services/billing-strategy-provider.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$billing$2f$core$2f$src$2f$services$2f$billing$2d$webhook$2d$handler$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/billing/core/src/services/billing-webhook-handler.service.ts [app-client] (ecmascript)");
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/packages/billing/core/src/index.ts [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$billing$2f$core$2f$src$2f$create$2d$billing$2d$schema$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/billing/core/src/create-billing-schema.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$billing$2f$core$2f$src$2f$services$2f$billing$2d$strategy$2d$provider$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/billing/core/src/services/billing-strategy-provider.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$billing$2f$core$2f$src$2f$services$2f$billing$2d$webhook$2d$handler$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/billing/core/src/services/billing-webhook-handler.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$billing$2f$core$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/billing/core/src/index.ts [app-client] (ecmascript) <locals>");
}}),
"[project]/packages/ui/src/components/badge.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Badge": (()=>Badge),
    "badgeVariants": (()=>badgeVariants)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/lib/utils/index.ts [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/lib/utils/cn.ts [app-client] (ecmascript)");
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])('focus:ring-ring inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-hidden', {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/80 border-transparent shadow-xs',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent',
            destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80 border-transparent shadow-xs',
            outline: 'text-foreground',
            success: 'border-transparent bg-green-50 text-green-500 hover:bg-green-50 dark:bg-green-500/20 dark:hover:bg-green-500/20',
            warning: 'border-transparent bg-orange-50 text-orange-500 hover:bg-orange-50 dark:bg-orange-500/20 dark:hover:bg-orange-500/20',
            info: 'border-transparent bg-blue-50 text-blue-500 hover:bg-blue-50 dark:bg-blue-500/20 dark:hover:bg-blue-500/20'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
function Badge({ className, variant, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/packages/ui/src/components/badge.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c = Badge;
;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/packages/billing/gateway/src/components/line-item-details.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "LineItemDetails": (()=>LineItemDetails)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-plus.js [app-client] (ecmascript) <export default as PlusSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$if$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/aihio/if.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$trans$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/aihio/trans.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/lib/utils/index.ts [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/lib/utils/cn.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const className = 'flex text-secondary-foreground items-center text-sm';
function LineItemDetails(props) {
    _s();
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])().i18n.language;
    const currencyCode = props?.currency.toLowerCase();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: 'flex flex-col space-y-1',
        children: props.lineItems.map((item, index)=>{
            // If the item has a description, we render it as a simple text
            // and pass the item as values to the translation so we can use
            // the item properties in the translation.
            if (item.description) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: className,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: 'flex items-center space-x-1.5',
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusSquare$3e$__["PlusSquare"], {
                                className: 'w-4'
                            }, void 0, false, {
                                fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                lineNumber: 35,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$trans$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trans"], {
                                i18nKey: item.description,
                                values: item,
                                defaults: item.description
                            }, void 0, false, {
                                fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                lineNumber: 37,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                        lineNumber: 34,
                        columnNumber: 15
                    }, this)
                }, index, false, {
                    fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                    lineNumber: 33,
                    columnNumber: 13
                }, this);
            }
            const SetupFee = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$if$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["If"], {
                    condition: item.setupFee,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: className,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: 'flex items-center space-x-1',
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusSquare$3e$__["PlusSquare"], {
                                    className: 'w-3'
                                }, void 0, false, {
                                    fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                    lineNumber: 51,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$trans$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trans"], {
                                        i18nKey: 'billing:setupFee',
                                        values: {
                                            setupFee: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])({
                                                currencyCode,
                                                value: item.setupFee,
                                                locale
                                            })
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                        lineNumber: 54,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                    lineNumber: 53,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                            lineNumber: 50,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                        lineNumber: 49,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                    lineNumber: 48,
                    columnNumber: 11
                }, this);
            const FlatFee = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: 'flex flex-col',
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(className, 'space-x-1'),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: 'flex items-center space-x-1',
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: 'flex items-center space-x-1.5',
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusSquare$3e$__["PlusSquare"], {
                                                    className: 'w-3'
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                                    lineNumber: 75,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$trans$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trans"], {
                                                        i18nKey: 'billing:basePlan'
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                                        lineNumber: 78,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                                    lineNumber: 77,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                            lineNumber: 74,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$if$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["If"], {
                                                condition: props.selectedInterval,
                                                fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$trans$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trans"], {
                                                    i18nKey: 'billing:lifetime'
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                                    lineNumber: 85,
                                                    columnNumber: 31
                                                }, void 0),
                                                children: [
                                                    "(",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$trans$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trans"], {
                                                        i18nKey: `billing:billingInterval.${props.selectedInterval}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                                        lineNumber: 88,
                                                        columnNumber: 21
                                                    }, this),
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                                lineNumber: 83,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                            lineNumber: 82,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                    lineNumber: 73,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "-"
                                }, void 0, false, {
                                    fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                    lineNumber: 96,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: 'text-xs font-semibold',
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])({
                                        currencyCode,
                                        value: item.cost,
                                        locale
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                    lineNumber: 98,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                            lineNumber: 72,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SetupFee, {}, void 0, false, {
                            fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                            lineNumber: 107,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$if$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["If"], {
                            condition: item.tiers?.length,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: 'flex items-center space-x-1.5',
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusSquare$3e$__["PlusSquare"], {
                                            className: 'w-3'
                                        }, void 0, false, {
                                            fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                            lineNumber: 111,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: 'flex gap-x-2 text-sm',
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$trans$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trans"], {
                                                    i18nKey: 'billing:perUnit',
                                                    values: {
                                                        unit: item.unit
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                                    lineNumber: 115,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                                lineNumber: 114,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                            lineNumber: 113,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                    lineNumber: 110,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tiers, {
                                    item: item,
                                    currency: props.currency
                                }, void 0, false, {
                                    fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                    lineNumber: 125,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                            lineNumber: 109,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                    lineNumber: 71,
                    columnNumber: 11
                }, this);
            const PerSeat = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: 'flex flex-col',
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: className,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: 'flex items-center space-x-1.5',
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusSquare$3e$__["PlusSquare"], {
                                        className: 'w-3'
                                    }, void 0, false, {
                                        fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                        lineNumber: 134,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$trans$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trans"], {
                                            i18nKey: 'billing:perTeamMember'
                                        }, void 0, false, {
                                            fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                            lineNumber: 137,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                        lineNumber: 136,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "-"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                        lineNumber: 140,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$if$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["If"], {
                                        condition: !item.tiers?.length,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: 'font-semibold',
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])({
                                                currencyCode,
                                                value: item.cost,
                                                locale
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                            lineNumber: 143,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                        lineNumber: 142,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                lineNumber: 133,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                            lineNumber: 132,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SetupFee, {}, void 0, false, {
                            fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                            lineNumber: 154,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$if$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["If"], {
                            condition: item.tiers?.length,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tiers, {
                                item: item,
                                currency: props.currency
                            }, void 0, false, {
                                fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                lineNumber: 157,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                            lineNumber: 156,
                            columnNumber: 13
                        }, this)
                    ]
                }, index, true, {
                    fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                    lineNumber: 131,
                    columnNumber: 11
                }, this);
            const Metered = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: 'flex flex-col',
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: className,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: 'flex items-center space-x-1',
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: 'flex items-center space-x-1.5',
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusSquare$3e$__["PlusSquare"], {
                                                className: 'w-3'
                                            }, void 0, false, {
                                                fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                                lineNumber: 167,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: 'flex space-x-1',
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$trans$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trans"], {
                                                        i18nKey: 'billing:perUnit',
                                                        values: {
                                                            unit: item.unit
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                                        lineNumber: 171,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                                    lineNumber: 170,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                                lineNumber: 169,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                        lineNumber: 166,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                    lineNumber: 165,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$if$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["If"], {
                                    condition: !item.tiers?.length,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: 'font-semibold',
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])({
                                            currencyCode,
                                            value: item.cost,
                                            locale
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                        lineNumber: 184,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                    lineNumber: 183,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                            lineNumber: 164,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SetupFee, {}, void 0, false, {
                            fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                            lineNumber: 194,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$if$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["If"], {
                            condition: item.tiers?.length,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tiers, {
                                item: item,
                                currency: props.currency
                            }, void 0, false, {
                                fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                lineNumber: 198,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                            lineNumber: 197,
                            columnNumber: 13
                        }, this)
                    ]
                }, index, true, {
                    fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                    lineNumber: 163,
                    columnNumber: 11
                }, this);
            switch(item.type){
                case 'flat':
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlatFee, {}, item.id, false, {
                        fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                        lineNumber: 205,
                        columnNumber: 20
                    }, this);
                case 'per_seat':
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PerSeat, {}, item.id, false, {
                        fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                        lineNumber: 208,
                        columnNumber: 20
                    }, this);
                case 'metered':
                    {
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Metered, {}, item.id, false, {
                            fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                            lineNumber: 211,
                            columnNumber: 20
                        }, this);
                    }
            }
        })
    }, void 0, false, {
        fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(LineItemDetails, "h6J0Q3nxDyaAQ99JMz6OOoWbcwM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c = LineItemDetails;
function Tiers({ currency, item }) {
    _s1();
    const unit = item.unit;
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])().i18n.language;
    const tiers = item.tiers?.map((tier, index)=>{
        const tiersLength = item.tiers?.length ?? 0;
        const previousTier = item.tiers?.[index - 1];
        const isLastTier = tier.upTo === 'unlimited';
        const previousTierFrom = previousTier?.upTo === 'unlimited' ? 'unlimited' : previousTier === undefined ? 0 : previousTier.upTo + 1 || 0;
        const upTo = tier.upTo;
        const isIncluded = tier.cost === 0;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: 'text-secondary-foreground text-xs',
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "-"
                }, void 0, false, {
                    fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                    lineNumber: 246,
                    columnNumber: 9
                }, this),
                ' ',
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$if$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["If"], {
                    condition: isLastTier,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: 'font-bold',
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])({
                                currencyCode: currency.toLowerCase(),
                                value: tier.cost,
                                locale
                            })
                        }, void 0, false, {
                            fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                            lineNumber: 248,
                            columnNumber: 11
                        }, this),
                        ' ',
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$if$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["If"], {
                            condition: tiersLength > 1,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$trans$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trans"], {
                                    i18nKey: 'billing:andAbove',
                                    values: {
                                        unit,
                                        previousTier: previousTierFrom - 1
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                    lineNumber: 257,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                lineNumber: 256,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                            lineNumber: 255,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$if$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["If"], {
                            condition: tiersLength === 1,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$trans$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trans"], {
                                    i18nKey: 'billing:forEveryUnit',
                                    values: {
                                        unit
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                    lineNumber: 268,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                lineNumber: 267,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                            lineNumber: 266,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                    lineNumber: 247,
                    columnNumber: 9
                }, this),
                ' ',
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$if$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["If"], {
                    condition: !isLastTier,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$if$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["If"], {
                            condition: isIncluded,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$trans$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trans"], {
                                    i18nKey: 'billing:includedUpTo',
                                    values: {
                                        unit,
                                        upTo
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                    lineNumber: 280,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                lineNumber: 279,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                            lineNumber: 278,
                            columnNumber: 11
                        }, this),
                        ' ',
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$if$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["If"], {
                            condition: !isIncluded,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: 'font-bold',
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])({
                                        currencyCode: currency.toLowerCase(),
                                        value: tier.cost,
                                        locale
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                    lineNumber: 284,
                                    columnNumber: 13
                                }, this),
                                ' ',
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$trans$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trans"], {
                                        i18nKey: 'billing:fromPreviousTierUpTo',
                                        values: {
                                            previousTierFrom,
                                            unit,
                                            upTo
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                        lineNumber: 292,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                                    lineNumber: 291,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                            lineNumber: 283,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
                    lineNumber: 277,
                    columnNumber: 9
                }, this)
            ]
        }, index, true, {
            fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
            lineNumber: 245,
            columnNumber: 7
        }, this);
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: 'my-1 flex flex-col space-y-1.5',
        children: tiers
    }, void 0, false, {
        fileName: "[project]/packages/billing/gateway/src/components/line-item-details.tsx",
        lineNumber: 303,
        columnNumber: 10
    }, this);
}
_s1(Tiers, "h6J0Q3nxDyaAQ99JMz6OOoWbcwM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c1 = Tiers;
var _c, _c1;
__turbopack_context__.k.register(_c, "LineItemDetails");
__turbopack_context__.k.register(_c1, "Tiers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/packages/billing/gateway/src/components/plan-cost-display.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "PlanCostDisplay": (()=>PlanCostDisplay)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$trans$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/aihio/trans.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function PlanCostDisplay({ primaryLineItem, currencyCode, interval, alwaysDisplayMonthlyPrice = true, className }) {
    _s();
    const { i18n } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const { shouldDisplayTier, lowestTier, tierTranslationKey, displayCost } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PlanCostDisplay.useMemo": ()=>{
            const shouldDisplayTier = primaryLineItem.type === 'metered' && Array.isArray(primaryLineItem.tiers) && primaryLineItem.tiers.length > 0;
            const isMultiTier = Array.isArray(primaryLineItem.tiers) && primaryLineItem.tiers.length > 1;
            const lowestTier = primaryLineItem.tiers?.reduce({
                "PlanCostDisplay.useMemo": (acc, curr)=>{
                    if (acc && acc.cost < curr.cost) {
                        return acc;
                    }
                    return curr;
                }
            }["PlanCostDisplay.useMemo"], primaryLineItem.tiers?.[0]);
            const isYearlyPricing = interval === 'year';
            const cost = isYearlyPricing && alwaysDisplayMonthlyPrice ? Number(primaryLineItem.cost / 12) : primaryLineItem.cost;
            return {
                shouldDisplayTier,
                isMultiTier,
                lowestTier,
                tierTranslationKey: isMultiTier ? 'billing:startingAtPriceUnit' : 'billing:priceUnit',
                displayCost: cost
            };
        }
    }["PlanCostDisplay.useMemo"], [
        primaryLineItem,
        interval,
        alwaysDisplayMonthlyPrice
    ]);
    if (shouldDisplayTier) {
        const formattedCost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])({
            currencyCode: currencyCode.toLowerCase(),
            value: lowestTier?.cost ?? 0,
            locale: i18n.language
        });
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: 'text-lg',
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$trans$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trans"], {
                i18nKey: tierTranslationKey,
                values: {
                    price: formattedCost,
                    unit: primaryLineItem.unit
                }
            }, void 0, false, {
                fileName: "[project]/packages/billing/gateway/src/components/plan-cost-display.tsx",
                lineNumber: 80,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/billing/gateway/src/components/plan-cost-display.tsx",
            lineNumber: 79,
            columnNumber: 7
        }, this);
    }
    const formattedCost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])({
        currencyCode: currencyCode.toLowerCase(),
        value: displayCost,
        locale: i18n.language
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: className,
        children: formattedCost
    }, void 0, false, {
        fileName: "[project]/packages/billing/gateway/src/components/plan-cost-display.tsx",
        lineNumber: 97,
        columnNumber: 10
    }, this);
}
_s(PlanCostDisplay, "way2DFgAbR8o1xD0AeQ8BYqmfic=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c = PlanCostDisplay;
var _c;
__turbopack_context__.k.register(_c, "PlanCostDisplay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/packages/billing/gateway/src/components/pricing-table.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "PricingTable": (()=>PricingTable)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/aihio/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$billing$2f$core$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/billing/core/src/index.ts [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$billing$2f$core$2f$src$2f$create$2d$billing$2d$schema$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/billing/core/src/create-billing-schema.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$if$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/aihio/if.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$trans$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/aihio/trans.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/lib/utils/index.ts [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/lib/utils/cn.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$billing$2f$gateway$2f$src$2f$components$2f$line$2d$item$2d$details$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/billing/gateway/src/components/line-item-details.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$billing$2f$gateway$2f$src$2f$components$2f$plan$2d$cost$2d$display$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/billing/gateway/src/components/plan-cost-display.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
function PricingTable({ config, paths, CheckoutButtonRenderer, redirectToCheckout = true, displayPlanDetails = true, alwaysDisplayMonthlyPrice = true }) {
    _s();
    const intervals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$billing$2f$core$2f$src$2f$create$2d$billing$2d$schema$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPlanIntervals"])(config).filter(Boolean);
    const [interval, setInterval] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(intervals[0]);
    // Always filter out hidden products
    const visibleProducts = config.products.filter((product)=>!product.hidden);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: 'flex flex-col space-y-8 xl:space-y-12',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: 'flex justify-center',
                children: intervals.length > 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlanIntervalSwitcher, {
                    intervals: intervals,
                    interval: interval,
                    setInterval: setInterval
                }, void 0, false, {
                    fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                    lineNumber: 63,
                    columnNumber: 11
                }, this) : null
            }, void 0, false, {
                fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: 'flex flex-col items-start space-y-6 lg:space-y-0' + ' justify-center lg:flex-row lg:space-x-4',
                children: visibleProducts.map((product)=>{
                    const plan = product.plans.find((plan)=>{
                        if (plan.paymentType === 'recurring') {
                            return plan.interval === interval;
                        }
                        return plan;
                    });
                    if (!plan) {
                        return null;
                    }
                    const primaryLineItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$billing$2f$core$2f$src$2f$create$2d$billing$2d$schema$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPrimaryLineItem"])(config, plan.id);
                    if (!plan.custom && !primaryLineItem) {
                        throw new Error(`Primary line item not found for plan ${plan.id}`);
                    }
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PricingItem, {
                        selectable: true,
                        plan: plan,
                        redirectToCheckout: redirectToCheckout,
                        primaryLineItem: primaryLineItem,
                        product: product,
                        paths: paths,
                        displayPlanDetails: displayPlanDetails,
                        alwaysDisplayMonthlyPrice: alwaysDisplayMonthlyPrice,
                        CheckoutButton: CheckoutButtonRenderer
                    }, plan.id, false, {
                        fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                        lineNumber: 97,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_s(PricingTable, "MECpVZFFU+LCmclEpSryIx78w2M=");
_c = PricingTable;
function PricingItem(props) {
    const highlighted = props.product.highlighted ?? false;
    const lineItem = props.primaryLineItem;
    const isCustom = props.plan.custom ?? false;
    // we exclude flat line items from the details since
    // it doesn't need further explanation
    const lineItemsToDisplay = props.plan.lineItems.filter((item)=>{
        return item.type !== 'flat';
    });
    const interval = props.plan.interval;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-cy": 'subscription-plan',
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(props.className, `s-full relative flex flex-1 grow flex-col items-stretch justify-between self-stretch rounded-lg border px-6 py-5 lg:w-4/12 xl:max-w-[20rem]`, {
            ['border-primary']: highlighted,
            ['border-border']: !highlighted
        }),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$if$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["If"], {
                condition: props.product.badge,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: 'absolute -top-2.5 left-0 flex w-full justify-center',
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                        className: highlighted ? '' : 'bg-background',
                        variant: highlighted ? 'default' : 'outline',
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$trans$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trans"], {
                                i18nKey: props.product.badge,
                                defaults: props.product.badge
                            }, void 0, false, {
                                fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                                lineNumber: 188,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                            lineNumber: 187,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                        lineNumber: 183,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                    lineNumber: 182,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                lineNumber: 181,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: 'flex flex-col gap-y-5',
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: 'flex flex-col gap-y-1',
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: 'flex items-center space-x-6',
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                className: 'text-secondary-foreground font-heading text-xl font-medium tracking-tight',
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$trans$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trans"], {
                                    i18nKey: props.product.name,
                                    defaults: props.product.name
                                }, void 0, false, {
                                    fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                                    lineNumber: 205,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                                lineNumber: 200,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                            lineNumber: 199,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                        lineNumber: 198,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: 'mt-6 flex flex-col gap-y-1',
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Price, {
                                isMonthlyPrice: props.alwaysDisplayMonthlyPrice,
                                displayBillingPeriod: !props.plan.label,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$if$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["If"], {
                                    condition: !isCustom,
                                    fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$trans$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trans"], {
                                        i18nKey: props.plan.label,
                                        defaults: props.plan.label
                                    }, void 0, false, {
                                        fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                                        lineNumber: 221,
                                        columnNumber: 17
                                    }, void 0),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$billing$2f$gateway$2f$src$2f$components$2f$plan$2d$cost$2d$display$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlanCostDisplay"], {
                                        primaryLineItem: lineItem,
                                        currencyCode: props.product.currency,
                                        interval: interval,
                                        alwaysDisplayMonthlyPrice: props.alwaysDisplayMonthlyPrice
                                    }, void 0, false, {
                                        fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                                        lineNumber: 224,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                                    lineNumber: 218,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                                lineNumber: 214,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$if$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["If"], {
                                condition: props.plan.name,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(`animate-in slide-in-from-left-4 fade-in text-muted-foreground flex items-center gap-x-1 text-xs capitalize`),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$if$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["If"], {
                                                condition: props.plan.interval,
                                                fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$trans$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trans"], {
                                                    i18nKey: 'billing:lifetime'
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                                                    lineNumber: 242,
                                                    columnNumber: 29
                                                }, void 0),
                                                children: (interval)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$trans$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trans"], {
                                                        i18nKey: `billing:billingInterval.${interval}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                                                        lineNumber: 245,
                                                        columnNumber: 21
                                                    }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                                                lineNumber: 240,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                                            lineNumber: 239,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$if$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["If"], {
                                            condition: lineItem && lineItem?.type !== 'flat',
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "/"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                                                    lineNumber: 251,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(`animate-in slide-in-from-left-4 fade-in text-sm capitalize`),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$if$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["If"], {
                                                            condition: lineItem?.type === 'per_seat',
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$trans$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trans"], {
                                                                i18nKey: 'billing:perTeamMember'
                                                            }, void 0, false, {
                                                                fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                                                                lineNumber: 259,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                                                            lineNumber: 258,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$if$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["If"], {
                                                            condition: lineItem?.unit,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$trans$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trans"], {
                                                                i18nKey: 'billing:perUnit',
                                                                values: {
                                                                    unit: lineItem?.unit
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                                                                lineNumber: 263,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                                                            lineNumber: 262,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                                                    lineNumber: 253,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                                            lineNumber: 250,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                                    lineNumber: 234,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                                lineNumber: 233,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                        lineNumber: 213,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$if$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["If"], {
                        condition: props.selectable,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$if$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["If"], {
                            condition: props.plan.id && props.CheckoutButton,
                            fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DefaultCheckoutButton, {
                                paths: props.paths,
                                product: props.product,
                                highlighted: highlighted,
                                plan: props.plan,
                                redirectToCheckout: props.redirectToCheckout
                            }, void 0, false, {
                                fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                                lineNumber: 280,
                                columnNumber: 15
                            }, void 0),
                            children: (CheckoutButton)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckoutButton, {
                                    highlighted: highlighted,
                                    planId: props.plan.id,
                                    productId: props.product.id
                                }, void 0, false, {
                                    fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                                    lineNumber: 290,
                                    columnNumber: 15
                                }, this)
                        }, void 0, false, {
                            fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                            lineNumber: 277,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                        lineNumber: 276,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(`text-muted-foreground text-base tracking-tight`),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$trans$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trans"], {
                            i18nKey: props.product.description,
                            defaults: props.product.description
                        }, void 0, false, {
                            fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                            lineNumber: 300,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                        lineNumber: 299,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: 'h-px w-full border border-dashed'
                    }, void 0, false, {
                        fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                        lineNumber: 306,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: 'flex flex-col',
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FeaturesList, {
                            highlighted: highlighted,
                            features: props.product.features
                        }, void 0, false, {
                            fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                            lineNumber: 309,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                        lineNumber: 308,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$if$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["If"], {
                        condition: props.displayPlanDetails && lineItemsToDisplay.length,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: 'h-px w-full border border-dashed'
                            }, void 0, false, {
                                fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                                lineNumber: 316,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: 'flex flex-col space-y-2',
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h6", {
                                        className: 'text-sm font-semibold',
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$trans$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trans"], {
                                            i18nKey: 'billing:detailsLabel'
                                        }, void 0, false, {
                                            fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                                            lineNumber: 320,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                                        lineNumber: 319,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$billing$2f$gateway$2f$src$2f$components$2f$line$2d$item$2d$details$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineItemDetails"], {
                                        selectedInterval: props.plan.interval,
                                        currency: props.product.currency,
                                        lineItems: lineItemsToDisplay
                                    }, void 0, false, {
                                        fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                                        lineNumber: 323,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                                lineNumber: 318,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                        lineNumber: 315,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                lineNumber: 197,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
        lineNumber: 170,
        columnNumber: 5
    }, this);
}
_c1 = PricingItem;
function FeaturesList(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
        className: 'flex flex-col gap-1',
        children: props.features.map((feature)=>{
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ListItem, {
                highlighted: props.highlighted,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$trans$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trans"], {
                    i18nKey: feature,
                    defaults: feature
                }, void 0, false, {
                    fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                    lineNumber: 346,
                    columnNumber: 13
                }, this)
            }, feature, false, {
                fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                lineNumber: 345,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
        lineNumber: 342,
        columnNumber: 5
    }, this);
}
_c2 = FeaturesList;
function Price({ children, isMonthlyPrice = true, displayBillingPeriod = true }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `animate-in slide-in-from-left-4 fade-in flex items-end gap-1 duration-500`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: 'font-heading flex items-center text-4xl font-medium tracking-tighter',
                children: children
            }, void 0, false, {
                fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                lineNumber: 366,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$if$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["If"], {
                condition: isMonthlyPrice && displayBillingPeriod,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: 'text-muted-foreground text-sm leading-loose',
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "/"
                        }, void 0, false, {
                            fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                            lineNumber: 376,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$trans$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trans"], {
                            i18nKey: 'billing:perMonth'
                        }, void 0, false, {
                            fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                            lineNumber: 378,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                    lineNumber: 375,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                lineNumber: 374,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
        lineNumber: 363,
        columnNumber: 5
    }, this);
}
_c3 = Price;
function ListItem({ children, highlighted }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        className: 'flex items-center gap-x-2.5',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('h-4 min-h-4 w-4 min-w-4', {
                    'text-secondary-foreground': highlighted,
                    'text-muted-foreground': !highlighted
                })
            }, void 0, false, {
                fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                lineNumber: 393,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-sm', {
                    'text-muted-foreground': !highlighted,
                    'text-secondary-foreground': highlighted
                }),
                children: children
            }, void 0, false, {
                fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                lineNumber: 400,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
        lineNumber: 392,
        columnNumber: 5
    }, this);
}
_c4 = ListItem;
function PlanIntervalSwitcher(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: 'flex gap-x-1 rounded-full border p-1.5',
        children: props.intervals.map((plan, index)=>{
            const selected = plan === props.interval;
            const className = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('animate-in fade-in !outline-hidden rounded-full transition-all focus:!ring-0', {
                'border-r-transparent': index === 0,
                ['hover:text-primary text-muted-foreground']: !selected,
                ['cursor-default font-semibold']: selected,
                ['hover:bg-initial']: !selected
            });
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                size: 'sm',
                variant: selected ? 'default' : 'ghost',
                className: className,
                onClick: ()=>props.setInterval(plan),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: 'flex items-center',
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('animate-in fade-in zoom-in-95 h-3.5', {
                                hidden: !selected,
                                'slide-in-from-left-4': index === 0,
                                'slide-in-from-right-4': index === props.intervals.length - 1
                            })
                        }, void 0, false, {
                            fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                            lineNumber: 443,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: 'capitalize',
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$trans$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trans"], {
                                i18nKey: `common:billingInterval.${plan}`
                            }, void 0, false, {
                                fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                                lineNumber: 452,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                            lineNumber: 451,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                    lineNumber: 442,
                    columnNumber: 13
                }, this)
            }, plan, false, {
                fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                lineNumber: 435,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
        lineNumber: 420,
        columnNumber: 5
    }, this);
}
_c5 = PlanIntervalSwitcher;
function DefaultCheckoutButton(props) {
    _s1();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])('billing');
    const signUpPath = props.paths.signUp;
    const searchParams = new URLSearchParams({
        next: props.paths.return,
        plan: props.plan.id,
        redirectToCheckout: props.redirectToCheckout ? 'true' : 'false'
    });
    const linkHref = props.plan.href ?? `${signUpPath}?${searchParams.toString()}`;
    const label = props.plan.buttonLabel ?? 'common:getStartedWithPlan';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        className: 'w-full',
        href: linkHref,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            size: 'lg',
            className: 'h-12 w-full rounded-lg',
            variant: props.highlighted ? 'default' : 'secondary',
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: 'text-base font-medium tracking-tight',
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$aihio$2f$trans$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trans"], {
                        i18nKey: label,
                        defaults: label,
                        values: {
                            plan: t(props.product.name, {
                                defaultValue: props.product.name
                            })
                        }
                    }, void 0, false, {
                        fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                        lineNumber: 504,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                    lineNumber: 503,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$aihio$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                    className: 'ml-2 h-4'
                }, void 0, false, {
                    fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
                    lineNumber: 515,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
            lineNumber: 498,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/billing/gateway/src/components/pricing-table.tsx",
        lineNumber: 497,
        columnNumber: 5
    }, this);
}
_s1(DefaultCheckoutButton, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c6 = DefaultCheckoutButton;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "PricingTable");
__turbopack_context__.k.register(_c1, "PricingItem");
__turbopack_context__.k.register(_c2, "FeaturesList");
__turbopack_context__.k.register(_c3, "Price");
__turbopack_context__.k.register(_c4, "ListItem");
__turbopack_context__.k.register(_c5, "PlanIntervalSwitcher");
__turbopack_context__.k.register(_c6, "DefaultCheckoutButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=packages_8aded9b4._.js.map