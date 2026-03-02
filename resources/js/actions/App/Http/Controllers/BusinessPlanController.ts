import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\BusinessPlanController::index
* @see app/Http/Controllers/BusinessPlanController.php:12
* @route '/businessplans'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/businessplans',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BusinessPlanController::index
* @see app/Http/Controllers/BusinessPlanController.php:12
* @route '/businessplans'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusinessPlanController::index
* @see app/Http/Controllers/BusinessPlanController.php:12
* @route '/businessplans'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BusinessPlanController::index
* @see app/Http/Controllers/BusinessPlanController.php:12
* @route '/businessplans'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\BusinessPlanController::index
* @see app/Http/Controllers/BusinessPlanController.php:12
* @route '/businessplans'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BusinessPlanController::index
* @see app/Http/Controllers/BusinessPlanController.php:12
* @route '/businessplans'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BusinessPlanController::index
* @see app/Http/Controllers/BusinessPlanController.php:12
* @route '/businessplans'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\BusinessPlanController::create
* @see app/Http/Controllers/BusinessPlanController.php:20
* @route '/businessplans/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/businessplans/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BusinessPlanController::create
* @see app/Http/Controllers/BusinessPlanController.php:20
* @route '/businessplans/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusinessPlanController::create
* @see app/Http/Controllers/BusinessPlanController.php:20
* @route '/businessplans/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BusinessPlanController::create
* @see app/Http/Controllers/BusinessPlanController.php:20
* @route '/businessplans/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\BusinessPlanController::create
* @see app/Http/Controllers/BusinessPlanController.php:20
* @route '/businessplans/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BusinessPlanController::create
* @see app/Http/Controllers/BusinessPlanController.php:20
* @route '/businessplans/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BusinessPlanController::create
* @see app/Http/Controllers/BusinessPlanController.php:20
* @route '/businessplans/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\BusinessPlanController::store
* @see app/Http/Controllers/BusinessPlanController.php:28
* @route '/businessplans'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/businessplans',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BusinessPlanController::store
* @see app/Http/Controllers/BusinessPlanController.php:28
* @route '/businessplans'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusinessPlanController::store
* @see app/Http/Controllers/BusinessPlanController.php:28
* @route '/businessplans'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BusinessPlanController::store
* @see app/Http/Controllers/BusinessPlanController.php:28
* @route '/businessplans'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BusinessPlanController::store
* @see app/Http/Controllers/BusinessPlanController.php:28
* @route '/businessplans'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\BusinessPlanController::show
* @see app/Http/Controllers/BusinessPlanController.php:36
* @route '/businessplans/{businessplan}'
*/
export const show = (args: { businessplan: string | number } | [businessplan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/businessplans/{businessplan}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BusinessPlanController::show
* @see app/Http/Controllers/BusinessPlanController.php:36
* @route '/businessplans/{businessplan}'
*/
show.url = (args: { businessplan: string | number } | [businessplan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { businessplan: args }
    }

    if (Array.isArray(args)) {
        args = {
            businessplan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        businessplan: args.businessplan,
    }

    return show.definition.url
            .replace('{businessplan}', parsedArgs.businessplan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusinessPlanController::show
* @see app/Http/Controllers/BusinessPlanController.php:36
* @route '/businessplans/{businessplan}'
*/
show.get = (args: { businessplan: string | number } | [businessplan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BusinessPlanController::show
* @see app/Http/Controllers/BusinessPlanController.php:36
* @route '/businessplans/{businessplan}'
*/
show.head = (args: { businessplan: string | number } | [businessplan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\BusinessPlanController::show
* @see app/Http/Controllers/BusinessPlanController.php:36
* @route '/businessplans/{businessplan}'
*/
const showForm = (args: { businessplan: string | number } | [businessplan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BusinessPlanController::show
* @see app/Http/Controllers/BusinessPlanController.php:36
* @route '/businessplans/{businessplan}'
*/
showForm.get = (args: { businessplan: string | number } | [businessplan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BusinessPlanController::show
* @see app/Http/Controllers/BusinessPlanController.php:36
* @route '/businessplans/{businessplan}'
*/
showForm.head = (args: { businessplan: string | number } | [businessplan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\BusinessPlanController::edit
* @see app/Http/Controllers/BusinessPlanController.php:44
* @route '/businessplans/{businessplan}/edit'
*/
export const edit = (args: { businessplan: string | number } | [businessplan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/businessplans/{businessplan}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BusinessPlanController::edit
* @see app/Http/Controllers/BusinessPlanController.php:44
* @route '/businessplans/{businessplan}/edit'
*/
edit.url = (args: { businessplan: string | number } | [businessplan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { businessplan: args }
    }

    if (Array.isArray(args)) {
        args = {
            businessplan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        businessplan: args.businessplan,
    }

    return edit.definition.url
            .replace('{businessplan}', parsedArgs.businessplan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusinessPlanController::edit
* @see app/Http/Controllers/BusinessPlanController.php:44
* @route '/businessplans/{businessplan}/edit'
*/
edit.get = (args: { businessplan: string | number } | [businessplan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BusinessPlanController::edit
* @see app/Http/Controllers/BusinessPlanController.php:44
* @route '/businessplans/{businessplan}/edit'
*/
edit.head = (args: { businessplan: string | number } | [businessplan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\BusinessPlanController::edit
* @see app/Http/Controllers/BusinessPlanController.php:44
* @route '/businessplans/{businessplan}/edit'
*/
const editForm = (args: { businessplan: string | number } | [businessplan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BusinessPlanController::edit
* @see app/Http/Controllers/BusinessPlanController.php:44
* @route '/businessplans/{businessplan}/edit'
*/
editForm.get = (args: { businessplan: string | number } | [businessplan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BusinessPlanController::edit
* @see app/Http/Controllers/BusinessPlanController.php:44
* @route '/businessplans/{businessplan}/edit'
*/
editForm.head = (args: { businessplan: string | number } | [businessplan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\BusinessPlanController::update
* @see app/Http/Controllers/BusinessPlanController.php:52
* @route '/businessplans/{businessplan}'
*/
export const update = (args: { businessplan: string | number } | [businessplan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/businessplans/{businessplan}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\BusinessPlanController::update
* @see app/Http/Controllers/BusinessPlanController.php:52
* @route '/businessplans/{businessplan}'
*/
update.url = (args: { businessplan: string | number } | [businessplan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { businessplan: args }
    }

    if (Array.isArray(args)) {
        args = {
            businessplan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        businessplan: args.businessplan,
    }

    return update.definition.url
            .replace('{businessplan}', parsedArgs.businessplan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusinessPlanController::update
* @see app/Http/Controllers/BusinessPlanController.php:52
* @route '/businessplans/{businessplan}'
*/
update.put = (args: { businessplan: string | number } | [businessplan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\BusinessPlanController::update
* @see app/Http/Controllers/BusinessPlanController.php:52
* @route '/businessplans/{businessplan}'
*/
update.patch = (args: { businessplan: string | number } | [businessplan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\BusinessPlanController::update
* @see app/Http/Controllers/BusinessPlanController.php:52
* @route '/businessplans/{businessplan}'
*/
const updateForm = (args: { businessplan: string | number } | [businessplan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BusinessPlanController::update
* @see app/Http/Controllers/BusinessPlanController.php:52
* @route '/businessplans/{businessplan}'
*/
updateForm.put = (args: { businessplan: string | number } | [businessplan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BusinessPlanController::update
* @see app/Http/Controllers/BusinessPlanController.php:52
* @route '/businessplans/{businessplan}'
*/
updateForm.patch = (args: { businessplan: string | number } | [businessplan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\BusinessPlanController::destroy
* @see app/Http/Controllers/BusinessPlanController.php:60
* @route '/businessplans/{businessplan}'
*/
export const destroy = (args: { businessplan: string | number } | [businessplan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/businessplans/{businessplan}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\BusinessPlanController::destroy
* @see app/Http/Controllers/BusinessPlanController.php:60
* @route '/businessplans/{businessplan}'
*/
destroy.url = (args: { businessplan: string | number } | [businessplan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { businessplan: args }
    }

    if (Array.isArray(args)) {
        args = {
            businessplan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        businessplan: args.businessplan,
    }

    return destroy.definition.url
            .replace('{businessplan}', parsedArgs.businessplan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusinessPlanController::destroy
* @see app/Http/Controllers/BusinessPlanController.php:60
* @route '/businessplans/{businessplan}'
*/
destroy.delete = (args: { businessplan: string | number } | [businessplan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\BusinessPlanController::destroy
* @see app/Http/Controllers/BusinessPlanController.php:60
* @route '/businessplans/{businessplan}'
*/
const destroyForm = (args: { businessplan: string | number } | [businessplan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BusinessPlanController::destroy
* @see app/Http/Controllers/BusinessPlanController.php:60
* @route '/businessplans/{businessplan}'
*/
destroyForm.delete = (args: { businessplan: string | number } | [businessplan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const BusinessPlanController = { index, create, store, show, edit, update, destroy }

export default BusinessPlanController